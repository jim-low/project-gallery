const canvas = document.getElementById('chloe-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Heart {
    constructor(x, y, height, radius, color, velocity) {
        this.x = x;
        this.y = y;

        this.height = height;
        this.radius = radius;
        this.velocity = velocity;

        this.color = color;
        this.opacity = 1;
    }

    draw() {
        let startX = this.x;
        let startY = this.y - this.height;
        let xCtrlPtRaito = 1.75;
        let yCtrlPtRaito = this.height/2;

        ctx.fillStyle = `rgba(255, 0, 0, ${this.opacity})`;
        ctx.strokeStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.lineWidth = .5;

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        // right side of the heart
        ctx.arc(startX+this.radius, startY, this.radius, Math.PI, Math.PI*2);
        ctx.quadraticCurveTo(
            startX + (this.radius*xCtrlPtRaito), startY + yCtrlPtRaito,
            this.x, this.y
        );

        ctx.moveTo(startX, startY);

        // left side of the heart
        ctx.arc(startX-this.radius, startY, this.radius, 0, Math.PI, true);
        ctx.quadraticCurveTo(
            startX - (this.radius*xCtrlPtRaito), startY + yCtrlPtRaito,
            this.x, this.y
        );

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.opacity -= 0.02;

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

