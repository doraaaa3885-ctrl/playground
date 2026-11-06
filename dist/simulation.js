import {neighbors as count,evolve as advance,stamp as place} from './life.js';
// One shared finite lattice covers the entire reachable scenery, not just the central plaza.
// Its outer boundary remains far outside camera limits. Zooming never creates cells.
export const COLS=384,ROWS=384,ORIGIN_X=180,ORIGIN_Y=180;
export {PATTERNS} from './life.js';
export const neighbors=(b,x,y)=>count(b,x,y,COLS,ROWS);
export const evolve=b=>advance(b,COLS,ROWS);
export const stamp=(b,x,y,p)=>place(b,x,y,p,COLS,ROWS);
export function initialBoard(){const b=new Uint8Array(COLS*ROWS);let seed=73129;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};for(let y=4;y<ROWS-5;y+=7)for(let x=4;x<COLS-5;x+=7){const px=x+Math.floor(random()*3),py=y+Math.floor(random()*3),r=random();stamp(b,px,py,r<.28?'block':r<.6?'blinker':'glider');}return b}
