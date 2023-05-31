import { rand } from './rand';

export function getRandomHSL(): string {
  const h = rand(0, 360);
  const s = rand(0, 100);
  const l = rand(0, 100);

  return `hsl(${h}, ${s}%, ${l}%)`;
}
