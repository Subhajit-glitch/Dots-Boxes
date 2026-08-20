export type Player = 0 | 1;
export type Edge = { id: string; r: number; c: number; dir: 'h' | 'v' };
export type MoveRecord = { edge: Edge; player: Player; captured: number[]; at: number };
export type GameState = { size: number; edges: Set<string>; boxes: (Player | null)[]; scores: [number, number]; current: Player; moves: MoveRecord[]; status: 'playing' | 'over'; startedAt: number };

export const edgeId = (r:number,c:number,dir:'h'|'v') => `${dir}${r}:${c}`;
export function edgesFor(size:number): Edge[] { const out:Edge[]=[]; for(let r=0;r<size;r++) for(let c=0;c<size-1;c++) out.push({id:edgeId(r,c,'h'),r,c,dir:'h'}); for(let r=0;r<size-1;r++) for(let c=0;c<size;c++) out.push({id:edgeId(r,c,'v'),r,c,dir:'v'}); return out; }
export function initGame(size:number):GameState { return {size,edges:new Set(),boxes:Array((size-1)**2).fill(null),scores:[0,0],current:0,moves:[],status:'playing',startedAt:Date.now()}; }
export function validMoves(s:GameState):Edge[] { return edgesFor(s.size).filter(e=>!s.edges.has(e.id)); }
export function boxEdges(size:number, index:number):string[] { const n=size-1,r=Math.floor(index/n),c=index%n; return [edgeId(r,c,'h'),edgeId(r+1,c,'h'),edgeId(r,c,'v'),edgeId(r,c+1,'v')]; }
export function completedBy(s:GameState, edge:Edge):number[] { const trial=new Set(s.edges); trial.add(edge.id); const n=s.size-1, candidates:number[]=[]; if(edge.dir==='h'){if(edge.r>0)candidates.push((edge.r-1)*n+edge.c);if(edge.r<n)candidates.push(edge.r*n+edge.c)}else{if(edge.c>0)candidates.push(edge.r*n+edge.c-1);if(edge.c<n)candidates.push(edge.r*n+edge.c)} return candidates.filter(i=>s.boxes[i]===null && boxEdges(s.size,i).every(id=>trial.has(id))); }
/** The only mutator: validates, claims each newly completed box once, and switches turn only on non-captures. */
export function makeMove(s:GameState, edge:Edge):{state:GameState; captured:number[]}|null { if(s.status!=='playing'||s.edges.has(edge.id)||!validMoves(s).some(e=>e.id===edge.id))return null; const captured=completedBy(s,edge); const boxes=s.boxes.slice(); captured.forEach(i=>boxes[i]=s.current); const scores:[number,number]=[...s.scores] as [number,number]; scores[s.current]+=captured.length; const edges=new Set(s.edges);edges.add(edge.id); const over=edges.size===edgesFor(s.size).length; const record={edge,player:s.current,captured,at:Date.now()}; return {captured,state:{...s,edges,boxes,scores,current:captured.length?s.current:(s.current===0?1:0),moves:[...s.moves,record],status:over?'over':'playing'}}; }
export function winner(s:GameState):Player|null { return s.scores[0]===s.scores[1]?null:(s.scores[0]>s.scores[1]?0:1); }
export function clone(s:GameState):GameState { return {...s,edges:new Set(s.edges),boxes:s.boxes.slice(),scores:[...s.scores] as [number,number],moves:s.moves.slice()}; }
