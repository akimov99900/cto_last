export function fnv1aHash(str: string): number {
  let hash = 2166136261;
  
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  
  return hash >>> 0;
}

export function getDeterministicWishIndex(fid: number, date: Date, wishesCount: number): number {
  const dateStr = date.toISOString().split('T')[0];
  const input = `${fid}-${dateStr}`;
  const hash = fnv1aHash(input);
  return hash % wishesCount;
}
