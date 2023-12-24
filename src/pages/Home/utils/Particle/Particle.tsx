export class Particle {
    canvasHeight = 200;
    canvasWidth = 200;
    speed = 10;
    size = 10;
    color = "";
    protected x = 0;
    protected y = 0;
    protected dx = 0;
    protected dy = 0;
    private readonly context: any;

    constructor(size: number, color: string, canvasWidth: number, canvasHeight: number, context: any) {
        this.size = size;
        this.color = color;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.context = context;
        const extra = size / 2;
        this.x = Math.random() * (canvasWidth - extra);
        this.y = Math.random() * (canvasHeight - extra);
        this.dx = Math.random();
        this.dy = Math.random();
    }

    animate = () => {
        const { dx, dy, size, canvasWidth, canvasHeight, color } = { ...this };
        this.x += dx;
        this.y += dy;
        const { x, y } = { ...this };
        if (x >= canvasWidth - size / 2) this.dx = -dx;
        if (x <= 0 + size / 2) this.dx = -dx;
        if (y >= canvasHeight - size / 2) this.dy = -dy;
        if (y <= 0 + size / 2) this.dy = -dy;
        this.context?.beginPath();
        this.context.rect(x, y, size, size);
        this.context.fillStyle = color;
        this.context.fill();
    }
}