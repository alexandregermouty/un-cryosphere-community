import {readFileSync,existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const project=process.argv[2];
if(!project||! /^[a-z][a-z0-9-]{4,28}[a-z0-9]$/.test(project)){console.error('Usage: npm run deploy -- YOUR_PROJECT_ID');process.exit(1)}
const path=existsSync('.env.local')?'.env.local':'.env';
if(!existsSync(path)){console.error('Copy .env.example to .env.local and add your Firebase web configuration first.');process.exit(1)}
const raw=readFileSync(path,'utf8');const values=Object.fromEntries(raw.split(/\r?\n/).map(l=>l.trim()).filter(l=>l&&!l.startsWith('#')).map(l=>{const i=l.indexOf('=');return [l.slice(0,i),l.slice(i+1).replace(/^['"]|['"]$/g,'')]}));
if(['VITE_FIREBASE_API_KEY','VITE_FIREBASE_AUTH_DOMAIN','VITE_FIREBASE_PROJECT_ID','VITE_FIREBASE_APP_ID'].some(k=>!values[k]?.trim())){console.error('Complete all four Firebase web configuration values.');process.exit(1)}
if(values.VITE_FIREBASE_PROJECT_ID!==project){console.error('The deployment project must match VITE_FIREBASE_PROJECT_ID.');process.exit(1)}
if(values.VITE_USE_EMULATORS==='true'){console.error('Set VITE_USE_EMULATORS=false for deployment.');process.exit(1)}
const configuration=JSON.parse(readFileSync('firebase.json','utf8'));if(configuration.functions||configuration.apphosting||configuration.storage){console.error('This package supports Hosting and Firestore only.');process.exit(1)}
for(const [command,args] of [['npm',['run','build']],['npx',['-y','firebase-tools@latest','deploy','--project',project,'--only','hosting,firestore']]]){const r=spawnSync(command,args,{stdio:'inherit',shell:process.platform==='win32'});if(r.status!==0)process.exit(r.status||1)}
