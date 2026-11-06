export const COLS=24,ROWS=20;
export const PATTERNS={block:[[0,0],[1,0],[0,1],[1,1]],blinker:[[-1,0],[0,0],[1,0]],glider:[[0,-1],[1,0],[-1,1],[0,1],[1,1]]};
export function neighbors(board,x,y,w=COLS,h=ROWS){let n=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){if(!dx&&!dy)continue;const a=x+dx,b=y+dy;if(a>=0&&a<w&&b>=0&&b<h)n+=board[b*w+a]?1:0}return n}
export function evolve(board,w=COLS,h=ROWS){const out=new Uint8Array(w*h);for(let y=0;y<h;y++)for(let x=0;x<w;x++){const k=y*w+x,n=neighbors(board,x,y,w,h);out[k]=n===3||(board[k]&&n===2)?1:0}return out}
export function stamp(board,x,y,type,w=COLS,h=ROWS){const shape=PATTERNS[type];if(!shape||shape.some(([dx,dy])=>x+dx<0||x+dx>=w||y+dy<0||y+dy>=h))return false;for(const[dx,dy]of shape)board[(y+dy)*w+x+dx]=1;return true}
