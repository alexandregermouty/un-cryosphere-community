// Header images of news and events. The Spark plan has no Cloud Storage, so an uploaded
// image is resized, compressed to JPEG and kept as one Firestore document (contentImages/{id}).
import { collection, deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const MAX_IMAGE_CHARS = 700_000;
const cache = new Map<string, Promise<string>>();

/** Crops the image to the given proportions and compresses it below the Firestore document limit. */
export async function resizeHeaderImage(file: File, width: number, height: number): Promise<string> {
  if (!['image/jpeg', 'image/png'].includes(file.type)) throw Error('Choose a JPG or PNG image.');
  if (file.size > 20 * 1024 * 1024) throw Error('Choose an image smaller than 20 MB.');
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const ratio = width / height;
    let sw = img.naturalWidth, sh = sw / ratio;
    if (sh > img.naturalHeight) { sh = img.naturalHeight; sw = sh * ratio; }
    // Recommended size, or smaller when the source image is smaller (never enlarged).
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(Math.min(width, sw)); canvas.height = Math.round(canvas.width / ratio);
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, (img.naturalWidth - sw) / 2, (img.naturalHeight - sh) / 2, sw, sh, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.85, 0.75, 0.62, 0.5, 0.38]) {
      const data = canvas.toDataURL('image/jpeg', quality);
      if (data.length <= MAX_IMAGE_CHARS) return data;
    }
    throw Error('This image cannot be compressed enough. Choose a simpler image.');
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function uploadHeaderImage(file: File, width: number, height: number): Promise<string> {
  if (!db || !auth?.currentUser) throw Error('Sign in to upload an image.');
  const data = await resizeHeaderImage(file, width, height);
  const ref = doc(collection(db, 'contentImages'));
  await setDoc(ref, { owner: auth.currentUser.uid, data, createdAt: serverTimestamp() });
  cache.set(ref.id, Promise.resolve(data));
  return ref.id;
}

export function getHeaderImage(id: string): Promise<string> {
  if (!db) return Promise.resolve('');
  if (!cache.has(id)) cache.set(id, getDoc(doc(db, 'contentImages', id)).then(s => (s.exists() ? String(s.data().data || '') : '')).catch(() => ''));
  return cache.get(id)!;
}

export async function deleteHeaderImage(id: string) {
  if (!db || !id) return;
  cache.delete(id);
  await deleteDoc(doc(db, 'contentImages', id)).catch(() => {});
}
