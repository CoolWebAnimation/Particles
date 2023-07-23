var canvas = document.querySelector("#scene"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = { x: 0, y: 0 },
  radius = 1;

var colors = [
  "white",
  "#e38bed",
  "#b28bed",
  "#ed8bc6"
]

const title = "Thỏ Yêu"

const text = [
  String.raw` _.-.       `,
  String.raw`    -'    '      .-'-.`,
  String.raw`  .',      '    '     '`,
  String.raw`  ', ',     .  '.-.   '`,
  String.raw`  '  \    '."   ".'`,
  String.raw`    '.' \   ;.",    "-._`,
  String.raw`     '   '. ,"  "-."     '.`,
  String.raw`      _.--'.    ." ,.--.  .`,
  String.raw`   , '     "-..".-'     \ '`,
  String.raw`  \`     _.''".    ' .    '`,
  String.raw`'     -'  "   '-     '.`,
  String.raw`'    '    "     '      '`,
  String.raw` '.'      "      '    .'`,
  String.raw`   ',    "        ' .'`,
  String.raw`         "        ,'`,
]

// const text = [
//   String.raw`.-== -.`,
//   String.raw`         /{.=-.}\\`,
//   String.raw`        | / .   \\|`,
//   String.raw`        |;   :   :|`,
//   String.raw`        \\(   :  )/`,
//   String.raw`           \`._'__.'   `,
//   String.raw`            ||`,
//   String.raw`            ||`,
//   String.raw`            ||`,
// ]

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

function Particle(x, y) {
  this.x = Math.random() * ww;
  this.y = Math.random() * wh;
  this.dest = {
    x: x,
    y: y
  };
  this.r = Math.random() * 4 + 2;
  // this.r = 3;
  this.vx = (Math.random() - 0.5) * 20;
  this.vy = (Math.random() - 0.5) * 20;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random() * 0.05 + 0.94;

  this.color = colors[Math.floor(Math.random() * 4)];
}

Particle.prototype.render = function () {

  this.accX = (this.dest.x - this.x) / 1000;
  this.accY = (this.dest.y - this.y) / 1000;
  this.vx += this.accX;
  this.vy += this.accY;
  this.vx *= this.friction;
  this.vy *= this.friction;

  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();

  var a = this.x - mouse.x;
  var b = this.y - mouse.y;

  var distance = Math.sqrt(a * a + b * b);
  if (distance < (radius * 70)) {
    this.accX = (this.x - mouse.x) / 100;
    this.accY = (this.y - mouse.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
  }

}

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e) {
  if (e.touches.length > 0) {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e) {
  mouse.x = -9999;
  mouse.y = -9999;
}

function onMouseClick() {
  radius++;
  if (radius === 5) {
    radius = 0;
  }
}

function initScene() {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  // Generate the title
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 200px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(title, ww / 2, wh / 5);

  var data = ctx.getImageData(0, 0, ww, wh).data;

  for (var i = 0; i < ww; i += Math.round(ww / 150)) {
    for (var j = 0; j < wh; j += Math.round(ww / 150)) {
      if (data[((i + j * ww) * 4) + 3] > 150) {
        particles.push(new Particle(i, j));
      }
    }
  }

  // Generate the flower
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = "bold 40px Monospace";
  ctx.fillStyle = "white"
  for (let i = 0; i < text.length; i++) {
    ctx.fillText(text[i], ww / 2, 0 + wh / 4 + (50 * i))
    console.log(text[i]);
  }

  var data = ctx.getImageData(0, 0, ww, wh).data;

  for (var i = 0; i < ww; i += Math.round(ww / 300)) {
    for (var j = 0; j < wh; j += Math.round(ww / 300)) {
      if (data[((i + j * ww) * 4) + 3] > 100) {
        particles.push(new Particle(i, j));
      }
    }
  }

  amount = particles.length;
  console.log(amount);
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
};

window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend", onTouchEnd);

initScene();
requestAnimationFrame(render);

