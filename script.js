let coins = 0;
let cps = 0;

const core = document.getElementById("core");

function update(){
  document.getElementById("coins").innerText = Math.floor(coins);
  document.getElementById("cps").innerText = cps.toFixed(1);
}

core.onclick = () => {
  coins += 1;
  update();
};

// auto income base
setInterval(() => {
  coins += cps / 10;
  update();
}, 100);

// upgrade de prueba (para empezar)
setTimeout(() => {
  cps = 1;
}, 3000);

update();
