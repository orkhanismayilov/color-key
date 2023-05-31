import { getRandomHSL, rand } from './utils';

export interface Position {
  x: number;
  y: number;
}

export class ColorKey {
  private width: number = 0;
  private height: number = 0;
  private tpl: HTMLTemplateElement | null = document.getElementById('circle-tpl') as HTMLTemplateElement;
  private removeTimeout: number = 0;
  private excludedKeys = ['Escape', 'F5', 'F11', 'F12'];

  constructor() {
    this.init();
  }

  private init(): void {
    const { width, height } = document.body.getBoundingClientRect();
    this.width = width;
    this.height = height;

    this.calcRemoveTimeout();
    this.addListener();
  }

  getRandomPosition(): Position {
    return {
      x: rand(0, this.width),
      y: rand(0, this.height),
    };
  }

  private calcRemoveTimeout(): void {
    const animationSpeed = parseInt(getComputedStyle(document.body).getPropertyValue('--animation-speed'));
    const animationDelay = parseInt(getComputedStyle(document.body).getPropertyValue('--animation-delay'));
    this.removeTimeout = animationSpeed + animationDelay;
  }

  private addListener(): void {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.excludedKeys.includes(e.key)) return;

      e.preventDefault();
      e.stopPropagation();

      this.drawCircle(getRandomHSL());
    });
  }

  drawCircle(color: string, position: Position = this.getRandomPosition()): void {
    if (!this.tpl) return;

    const { x, y } = position;
    const circle: HTMLElement | null = (this.tpl.content.cloneNode(true) as HTMLElement)?.querySelector('.circle');
    circle!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    circle!.style.backgroundColor = color;

    document.body.append(circle!);
    setTimeout(() => {
      circle!.remove();
    }, this.removeTimeout);
  }
}
