let coins = 0;

// upgrades
let clickPower = 1;
let cps = 0;

// prices
let clickPrice = 10;
let cpsPrice = 25;

// load save
const save = JSON.parse(localStorage.getItem("idle_universe")) || {};

coins = save.coins || 0;
clickPower = save.clickPower || 1;
cps = save.cps || 0;
clickPrice = save.clickPrice || 10;
cpsPrice = save.cpsPrice || 25;

const core = document.getElementById("core");

// FORMAT
function update(){
  document.getElementById("coins").innerText = Math.floor(coins);
  document.getElementById("cps").innerText = cps.toFixed(1);

  renderShop();

  localStorage.setItem("idle_universe", JSON.stringify({
    coins,
    clickPower,
    cps,
    clickPrice,
    cpsPrice
  }));
}

// CLICK
core.onclick = (e) => {
  coins += clickPower;
  update();
};

// AUTO CPS
setInterval(() => {
  coins += cps / 10;
  update();
}, 100);

// SHOP
function renderShop(){
  const shop = document.getElementById("shop");

  shop.innerHTML = `
  
    <div class="card">
      <div>
        👆 Click Power (+1)<br>
        💰 ${clickPrice}
      </div>
      <button onclick="buyClick()">BUY</button>
    </div>

    <div class="card">
      <div>
        ⚡ Auto CPS (+1)<br>
        💰 ${cpsPrice}
      </div>
      <button onclick="buyCPS()">BUY</button>
    </div>

  `;
}

// BUY CLICK
window.buyClick = () => {
  if (coins >= clickPrice) {
    coins -= clickPrice;
    clickPower += 1;
    clickPrice = Math.floor(clickPrice * 1.25);
    update();
  }
};

// BUY CPS
window.buyCPS = () => {
  if (coins >= cpsPrice) {
    coins -= cpsPrice;
    cps += 1;
    cpsPrice = Math.floor(cpsPrice * 1.3);
    update();
  }
};

update();
