const canvas = document.getElementById('oscillation')
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const MIN_FORCE = 100;
const MAX_FORCE = 40;

const mouse = {
    x: undefined,
    y: undefined
}

const moveEvents = ['mousemove', 'touchmove']
const clickEvents = ['click', 'touchstart']

moveEvents.forEach(event => {
    console.log(event);
    addEventListener(event, (e) => {
        mouse.x = e.clientX ? e.clientX : e.touches[0].pageX;
        mouse.y = e.clientY ? e.clientY : e.touches[0].pageY;
    });
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomColor(colorArr) {
    return colorArr[getRandomInt(0, colorArr.length - 1)];
}

class Particle {
    constructor(props) {
        this.pos = props.pos;
        this.axis = this.pos;

        this.radius = props.radius;

        this.velocity = Math.random() * 0.1;
        this.velocity *= getRandomInt(0, 2) % 2 == 0 ? 1 : -1;

        this.radian = Math.random() * 360;
        this.force = getRandomInt(MIN_FORCE, MAX_FORCE);

        this.color = props.color;
    }

    draw() {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI*2);
        ctx.closePath();

        ctx.fill();
    }

    update() {
        this.radian += this.velocity;

        this.pos.x = mouse.x + Math.cos(this.radian) * this.force;
        this.pos.y = mouse.y + Math.sin(this.radian) * this.force;
    }
}

let particles = [];

function refresh() {
    requestAnimationFrame(refresh);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.draw();
        particle.update();
    });
}

clickEvents.forEach(event => {
    addEventListener(event, () => {
        particles.push(new Particle({
            pos: {
                x: -10,
                y: -10,
            },
            radius: 5,
            color: 'red'
        }));
    });
});

refresh();

