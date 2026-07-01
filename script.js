let coins = 0;

let clickPower = 1;
let cps = 0;

let clickPrice = 10;
let cpsPrice = 25;

// save
const save = JSON.parse(localStorage.getItem("idle_universe")) || {};

coins = save.coins || 0;
clickPower = save.clickPower || 1;
cps = save.cps || 0;
clickPrice = save.clickPrice || 10;
cpsPrice = save.cpsPrice || 25;

// canvas FX
const canvas = document.getElementById("fx");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let particles = [];
let floaters = [];

// utils
function rand(min,max){
  return Math.random()*(max-min)+min;
}

// PARTICLE SYSTEM
function spawnParticles(x,y,color){
  for(let i=0;i<8;i++){
    particles.push({
      x,
      y,
      vx:rand(-2,2),
      vy:rand(-2,2),
      life:1,
      color
    });
  }
}

// FLOATING TEXT
function floatText(x,y,text,color){
  floaters.push({
    x,y,text,alpha:1,color
  });
}

// DRAW FX
function loop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // particles
  for(let p of particles){
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.02;

    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x,p.y,3,3);
  }

  particles = particles.filter(p => p.life > 0);

  // floaters
  for(let f of floaters){
    f.y -= 1;
    f.alpha -= 0.02;

    ctx.globalAlpha = f.alpha;
    ctx.fillStyle = f.color;
    ctx.font = "16px Arial";
    ctx.fillText(f.text,f.x,f.y);
  }

  floaters = floaters.filter(f => f.alpha > 0);

  requestAnimationFrame(loop);
}
loop();

// core click
const core = document.getElementById("core");

core.onclick = (e) => {

  let isCrit = Math.random() < 0.1;
  let gain = clickPower * (isCrit ? 3 : 1);

  coins += gain;

  // vibration
  if(navigator.vibrate){
    navigator.vibrate(10);
  }

  // fx
  spawnParticles(e.clientX,e.clientY,isCrit ? "#ffcc00" : "#00d9ff");

  floatText(
    e.clientX,
    e.clientY,
    isCrit ? "CRIT +" + gain : "+" + gain,
    isCrit ? "#ffcc00" : "white"
  );

  update();
};

// auto CPS
setInterval(() => {
  coins += cps / 10;
  update();
}, 100);

// shop render
function renderShop(){
  document.getElementById("shop").innerHTML = `
  
  <div class="card">
    <div>👆 Click Power +1<br>💰 ${clickPrice}</div>
    <button onclick="buyClick()">BUY</button>
  </div>

  <div class="card">
    <div>⚡ CPS +1<br>💰 ${cpsPrice}</div>
    <button onclick="buyCPS()">BUY</button>
  </div>

  `;
}

// buy
window.buyClick = () => {
  if(coins >= clickPrice){
    coins -= clickPrice;
    clickPower++;
    clickPrice = Math.floor(clickPrice * 1.3);
    update();
  }
};

window.buyCPS = () => {
  if(coins >= cpsPrice){
    coins -= cpsPrice;
    cps++;
    cpsPrice = Math.floor(cpsPrice * 1.35);
    update();
  }
};

// update + save
function update(){
  document.getElementById("coins").innerText = Math.floor(coins);
  document.getElementById("cps").innerText = cps.toFixed(1);
  document.getElementById("cpc").innerText = clickPower;

  renderShop();

  localStorage.setItem("idle_universe", JSON.stringify({
    coins,
    clickPower,
    cps,
    clickPrice,
    cpsPrice
  }));
}

update();
