
const login = document.querySelector(".btn");
const container = document.querySelector(".container");


const canvas = document.getElementById('svgBlob');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let numParticles = 30;
let particles = [];

const colors = ["#1d1e22", "#7d8087", "#5f6988"];

const mouse = {
  x: null
}

let user= {
  login: false
}

class Particle {
    constructor(){
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + (Math.random() * 200);
      this.radius = (Math.random() * 2) + 2;
      this.speedX = (Math.random() * 2);
      this.moveRight = this.x + this.speedX;
      this.moveLeft = this.x - this.speedX;
      this.speedY =  Math.random() * 0.5;
      this.color = colors[Math.floor(Math.random() * 3)];
    }
    draw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    update(){
      this.draw();
      if(!user.login){
        this.y -= this.speedY; 
      }else {
        this.y -= 10;
      }
      if(this.y <= canvas.height){
          if(mouse.x > canvas.width/2){
              this.x = this.moveRight;
          }else {
              this.x = this.moveLeft; 
          }
      }
    }
}

function setup(){
    for (let i = 0; i < numParticles; i++){
        particles.push(new Particle());
    }
}

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
})

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    particle.update();
    if(particle.y + particle.radius < 0){
      setTimeout(() => {
        particles.splice(index, 1);
      },0)
      if(!user.login){
       particles.push(new Particle()); 
      }
    }
  })
}
setup();
animate();

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})