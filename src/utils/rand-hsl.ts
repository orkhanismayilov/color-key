import { rand } from './rand';

export function getRandomHSL(): string {
  const h = rand(0, 360);
  const s = rand(50, 100);
  const l = rand(50, 75);

  return `hsl(${h}, ${s}%, ${l}%)`;
}
