import assert from 'node:assert/strict';
import {evolve,neighbors,stamp} from './dist/life.js';
const w=24,h=20,empty=()=>new Uint8Array(w*h);
let board=empty();stamp(board,10,8,'block');assert.deepEqual(evolve(board),board,'block must remain unchanged');
board=empty();stamp(board,10,8,'blinker');const initial=board.slice();const first=evolve(board);assert.notDeepEqual(first,initial);assert.deepEqual(evolve(first),initial,'blinker returns after two generations');assert.deepEqual(board,initial,'evolution must not mutate input');
board=empty();stamp(board,10,8,'glider');let next=board;for(let i=0;i<4;i++)next=evolve(next);const shifted=empty();stamp(shifted,11,9,'glider');assert.deepEqual(next,shifted,'glider translates by one after four generations');
board=empty();board[0]=board[w-1]=board[(h-1)*w]=1;assert.equal(neighbors(board,0,0),0,'edges must not wrap');assert.equal(evolve(board)[0],0);
board=empty();assert.equal(stamp(board,0,0,'glider'),false);assert.equal(board.reduce((n,x)=>n+x,0),0,'out of bounds placement must be atomic');
// All 512 neighborhoods check exact B3/S23, covering empty and occupied center.
for(let mask=0;mask<512;mask++){const b=new Uint8Array(9);for(let i=0;i<9;i++)b[i]=mask>>i&1;const n=b.reduce((s,x,i)=>s+(i===4?0:x),0);assert.equal(evolve(b,3,3)[4],+(n===3||b[4]&&n===2));}
console.log('PASS: still life, period-2 oscillator, glider translation, finite boundary, atomic placement, immutable generations, all 512 neighborhoods.');
