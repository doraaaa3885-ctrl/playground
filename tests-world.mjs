import './tests.mjs';
import assert from 'node:assert/strict';
import {COLS,ROWS,ORIGIN_X,ORIGIN_Y,initialBoard,evolve,stamp,neighbors} from './dist/simulation.js';
let b=initialBoard();const count=b.reduce((n,v)=>n+v,0);assert.ok(count>10000,'initial world must have many children');
function inRegion(x,y,r=12){let n=0;for(let j=y-r;j<=y+r;j++)for(let i=x-r;i<=x+r;i++)n+=b[j*COLS+i];return n}
for(const[x,y]of[[ORIGIN_X+12,ORIGIN_Y+10],[ORIGIN_X+70,ORIGIN_Y+20],[ORIGIN_X-70,ORIGIN_Y-20],[ORIGIN_X+20,ORIGIN_Y+70]])assert.ok(inRegion(x,y)>20,'children must exist outside central plaza');
assert.deepEqual(initialBoard(),b,'camera movement must not be needed to populate world');
b=new Uint8Array(COLS*ROWS);stamp(b,ORIGIN_X+75,ORIGIN_Y+48,'glider');let out=b;for(let i=0;i<4;i++)out=evolve(out);const expected=new Uint8Array(COLS*ROWS);stamp(expected,ORIGIN_X+76,ORIGIN_Y+49,'glider');assert.deepEqual(out,expected,'same Conway rules apply outside old plaza');
b=new Uint8Array(COLS*ROWS);const x=ORIGIN_X+12,y=ORIGIN_Y+10;b[y*COLS+x-1]=b[y*COLS+x]=b[y*COLS+x+1]=1;const before=b.slice();out=evolve(b);assert.equal(neighbors(before,x,y-1),3);assert.equal(out[(y-1)*COLS+x],1);assert.equal(neighbors(before,x-1,y),1);assert.equal(out[y*COLS+x-1],0);assert.deepEqual(b,before);
console.log(`PASS: ${count} initial children, remote populations, remote glider, simultaneous birth/death from previous generation.`);
