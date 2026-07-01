
// =====================
// CORE DATA
// =====================
let coins = 0;
let clickPower = 1;
let cps = 0;

let clickPrice = 10;
let cpsPrice = 25;

let prestige = 0;
let globalMult = 1;

// =====================
// LOAD SAVE
// =====================
const save = JSON.parse(localStorage.getItem("idle_universe")) || {};

coins = save.coins || 0;
clickPower = save.clickPower || 1;
cps = save.cps || 0;
clickPrice = save.clickPrice || 10;
cpsPrice = save.cpsPrice || 25;
prestige = save.prestige || 0;

// =====================
// ACHIEVEMENTS
// =====================
const achievements = [
  {id:"c1", name:"Primer click", done:false, check:()=>coins>=1},
  {id:"c100", name:"100 monedas", done:false, check:()=>coins>=100},
  {id:"c1k", name:"1K monedas", done:false, check:()=>coins>=1000},
  {id:"c10k", name:"10K monedas", done:false, check:()=>coins>=10000},
  {id:"click10", name:"Clicker", done:false, check:()=>clickPower>=10},
  {id:"cps10", name:"Automatizador", done:false, check:()=>cps>=10},
  {id:"prestige1", name:"Renacer", done:false, check:()=>prestige>=1}
];

// =====================
// DAILY QUEST
// =====================
let daily = {
  target: 500,
  progress: 0,
  reward: 200
};

// =====================
// EVENT SYSTEM
// =====================
let eventActive = null;
let eventTimer = 0;

function triggerEvent(){
  const events = [
    {name:"💰 lluvia de monedas", mult:2, time:10},
    {name:"⚡ overclock", mult:3, time:8},
    {name:"🍀 suerte extrema", mult:5, time:5}
  ];

  eventActive = events[Math.floor(Math.random()*events.length)];
  eventTimer = eventActive.time;

  log("EVENTO: " + eventActive.name);
}

// random event
setInterval(()=>{
  if(Math.random()<0.05){
    triggerEvent();
  }
},10000);

// =====================
// CORE CLICK
// =====================
const core = document.getElementById("core");

core.onclick = (e)=>{

  let crit = Math.random()<0.1;
  let eventMult = eventActive ? eventActive.mult : 1;

  let gain = clickPower * globalMult * eventMult * (crit ? 3 : 1);

  coins += gain;

  daily.progress += gain;

  if(navigator.vibrate){
    navigator.vibrate(10);
  }

  spawnParticles(e.clientX,e.clientY, crit ? "#ffd700" : "#00d9ff");
  floatText(e.clientX,e.clientY,(crit?"CRIT ":"+")+Math.floor(gain),"white");

  update();
};

// =====================
// AUTO CPS
// =====================
setInterval(()=>{
  let eventMult = eventActive ? eventActive.mult : 1;
  coins += (cps * globalMult * eventMult) / 10;

  update();
},100);

// =====================
// EVENTS TIMER
// =====================
setInterval(()=>{
  if(eventActive){
    eventTimer--;
    if(eventTimer<=0){
      eventActive = null;
    }
  }
},1000);

// =====================
// ACHIEVEMENTS CHECK
// =====================
function checkAchievements(){
  achievements.forEach(a=>{
    if(!a.done && a.check()){
      a.done = true;
      log("🏆 LOGRO: " + a.name);
    }
  });
}

// =====================
// DAILY REWARD
// =====================
function checkDaily(){
  if(daily.progress >= daily.target){
    coins += daily.reward;
    log("🎯 misión diaria completada!");
    daily.progress = 0;
  }
}

// =====================
// PRESTIGE
// =====================
function doPrestige(){
  if(coins >= 10000){
    prestige++;
    globalMult += 0.25;

    coins = 0;
    clickPower = 1;
    cps = 0;

    log("⭐ PRESTIGIO ACTIVO!");
  }
}

// =====================
// SHOP
// =====================
function renderShop(){
  document.getElementById("shop").innerHTML = `
  
  <div class="card">
    👆 Click +1<br>
    💰 ${clickPrice}
    <button onclick="buyClick()">BUY</button>
  </div>

  <div class="card">
    ⚡ CPS +1<br>
    💰 ${cpsPrice}
    <button onclick="buyCPS()">BUY</button>
  </div>

  <div class="card">
    ⭐ Prestigio
    <button onclick="doPrestige()">RESET</button>
  </div>

  `;
}

// =====================
// BUY
// =====================
window.buyClick = ()=>{
  if(coins>=clickPrice){
    coins-=clickPrice;
    clickPower++;
    clickPrice=Math.floor(clickPrice*1.3);
    update();
  }
};

window.buyCPS = ()=>{
  if(coins>=cpsPrice){
    coins-=cpsPrice;
    cps++;
    cpsPrice=Math.floor(cpsPrice*1.35);
    update();
  }
};

// =====================
// UPDATE LOOP
// =====================
function update(){

  document.getElementById("coins").innerText = Math.floor(coins);
  document.getElementById("cps").innerText = cps.toFixed(1);
 
