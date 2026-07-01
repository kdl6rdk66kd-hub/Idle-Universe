const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

const consoleBox = document.getElementById("console");
const consoleInput = document.getElementById("consoleInput");
const consoleLog = document.getElementById("consoleLog");

const settings = document.getElementById("settings");

// toggle menu
menuBtn.onclick = () => {
  menu.classList.toggle("hidden");
};

// console toggle
function toggleConsole(){
  consoleBox.classList.toggle("hidden");
}

// settings toggle
function toggleSettings(){
  settings.classList.toggle("hidden");
}

// log console
function log(msg){
  consoleLog.innerHTML += "<div>> " + msg + "</div>";
}

// COMMANDS
consoleInput.addEventListener("keydown",(e)=>{
  if(e.key === "Enter"){
    let cmd = consoleInput.value.trim();
    runCommand(cmd);
    consoleInput.value = "";
  }
});

function runCommand(cmd){

  log(cmd);

  let args = cmd.split(" ");

  switch(args[0]){

    case "money":
      coins += Number(args[1] || 0);
      break;

    case "cps":
      cps += Number(args[1] || 0);
      break;

    case "click":
      clickPower += Number(args[1] || 0);
      break;

    case "reset":
      coins = 0;
      cps = 0;
      clickPower = 1;
      break;

    case "devmode":
      log("devmode activado 😈");
      coins += 999999;
      break;

    default:
      log("comando no existe");
  }

  update();
}

// RESET GAME
window.resetGame = () => {
  localStorage.clear();
  location.reload();
};
