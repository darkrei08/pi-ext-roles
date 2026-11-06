import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export function put(path, text) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
  return path;
}
