// Form sections and fields shared by the news and event forms. Their names, order and
// options follow the IHP-WINS "Share News" and "Share New Event" forms.
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ImagePlus, Link2, Loader2, X, Globe2 } from 'lucide-react';
import { toast } from 'sonner';
import { ALL_MEMBER_STATES, memberStates, stateName, winsVisibilities, detailLines, type WinsVisibility } from '@/lib/wins';
import { getHeaderImage, uploadHeaderImage } from '@/lib/content-images';
import { friendlyError } from '@/lib/store';

/** A numbered form section, as in the IHP-WINS forms. Optional sections start folded. */
export function FormSection({ n, title, hint, required, open, children }: { n: number; title: string; hint?: string; required?: boolean; open?: boolean; children: React.ReactNode }) {
  return (
    <details className="form-section" open={open}>
      <summary><span className="form-section-n">{n}</span><span className="form-section-title">{title}{required && <em> *</em>}</span>{hint && <small>{hint}</small>}</summary>
      <div className="form-section-body">{children}</div>
    </details>
  );
}

export function WinsVisibilityField({ value, onChange, note }: { value: WinsVisibility; onChange: (v: WinsVisibility) => void; note: string }) {
  return (
    <fieldset className="wins-visibility">
      <legend>Visibility on IHP-WINS</legend>
      {winsVisibilities.map(([id, label]) => (
        <label key={id} className="radio-line"><input type="radio" name="wins-visibility" value={id} checked={value === id} onChange={() => onChange(id)} /> {label}</label>
      ))}
      <small className="micro">{note}</small>
    </fieldset>
  );
}

export function MemberStatePicker({ value, onChange, what }: { value: string[]; onChange: (v: string[]) => void; what: string }) {
  const all = value.includes(ALL_MEMBER_STATES);
  return (
    <div className="field member-states">
      <label htmlFor={`states-${what}`}>Member States</label>
      <select id={`states-${what}`} value="" onChange={e => {
        const v = e.target.value;
        if (!v) return;
        onChange(v === ALL_MEMBER_STATES ? [ALL_MEMBER_STATES] : [...value.filter(x => x !== ALL_MEMBER_STATES && x !== v), v]);
      }}>
        <option value="">Select a member state...</option>
        <option value={ALL_MEMBER_STATES}>All member states</option>
        {memberStates.filter(s => !value.includes(s)).map(s => <option key={s} value={s}>{stateName(s)}</option>)}
      </select>
      <small>Optional. Select the member states associated with this {what}, or use All member states to link every country.</small>
      {value.length > 0 && (
        <ul className="state-chips" aria-label="Selected Member States">
          {value.map(s => <li key={s}><span>{all ? 'All member states' : stateName(s)}</span><button type="button" aria-label={`Remove ${stateName(s)}`} onClick={() => onChange(value.filter(x => x !== s))}><X size={12} /></button></li>)}
        </ul>
      )}
    </div>
  );
}

/** Header image: upload (resized and stored in DACS Community) or paste a link. */
export function HeaderImageField({ url, id, onChange, width, height, label = 'Header Image' }: { url: string; id: string; onChange: (v: { url: string; id: string }) => void; width: number; height: number; label?: string }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <div className="field header-image-field">
      <span className="field-label-text">{label}</span>
      <small>Recommended size {width}x{height}px. Accepted formats: JPG, PNG. The image is cropped to these proportions.</small>
      {(url || id) ? (
        <div className="header-image-preview">
          <HeaderImage url={url} id={id} alt="" />
          <button type="button" className="btn small" onClick={() => onChange({ url: '', id: '' })}><X size={13} /> Remove image</button>
        </div>
      ) : (
        <div className="header-image-actions">
          <button type="button" className="btn small" disabled={busy} onClick={() => input.current?.click()}>{busy ? <Loader2 size={14} className="spin" /> : <ImagePlus size={14} />} {busy ? 'Uploading…' : 'Upload image'}</button>
          <span className="micro">No header image uploaded yet.</span>
        </div>
      )}
      <input ref={input} type="file" accept="image/jpeg,image/png" hidden onChange={async e => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        setBusy(true);
        try { onChange({ url: '', id: await uploadHeaderImage(file, width, height) }); } catch (err) { toast.error(friendlyError(err)); } finally { setBusy(false); }
      }} />
      {!id && <label>Header Image URL<input type="url" maxLength={1000} placeholder="https://" value={url} onChange={e => onChange({ url: e.target.value, id: '' })} /></label>}
    </div>
  );
}

export function HeaderImage({ url, id, alt, className = 'header-image' }: { url?: string; id?: string; alt: string; className?: string }) {
  const [src, setSrc] = useState(url || '');
  useEffect(() => {
    let live = true;
    if (url) setSrc(url);
    else if (id) { setSrc(''); void getHeaderImage(id).then(v => live && setSrc(v)); }
    else setSrc('');
    return () => { live = false; };
  }, [url, id]);
  if (!src) return null;
  return <img className={className} src={src} alt={alt} loading="lazy" referrerPolicy="no-referrer" />;
}

export function LinkList({ title, links }: { title: string; links?: string[] }) {
  if (!links?.length) return null;
  return (
    <div className="link-list"><span className="micro">{title}</span>
      <ul>{links.map(l => <li key={l}><a href={l} target="_blank" rel="noopener noreferrer"><Link2 size={13} /> {l.replace(/^https?:\/\//, '').slice(0, 80)} <ArrowUpRight size={12} /></a></li>)}</ul>
    </div>
  );
}

export function ImageStrip({ urls }: { urls?: string[] }) {
  if (!urls?.length) return null;
  return <div className="image-strip">{urls.map(u => <a key={u} href={u} target="_blank" rel="noopener noreferrer"><img src={u} alt="" loading="lazy" referrerPolicy="no-referrer" /></a>)}</div>;
}

export function MemberStateList({ value }: { value?: string[] }) {
  if (!value?.length) return null;
  return <p className="state-list"><Globe2 size={13} /> {value.includes(ALL_MEMBER_STATES) ? 'All member states' : value.map(stateName).join(', ')}</p>;
}

export function DetailList({ text }: { text?: string }) {
  const lines = detailLines(text || '');
  if (!lines.length) return null;
  return <dl className="detail-list">{lines.map((l, i) => <div key={i}>{l.label && <dt>{l.label}</dt>}<dd>{l.value}</dd></div>)}</dl>;
}

export function Counter({ value, max }: { value: string; max: number }) {
  return <small className="micro counter">{value.length}/ {max} characters</small>;
}
