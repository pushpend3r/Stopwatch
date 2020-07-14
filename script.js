// Timers
let tMin = document.getElementById("tmin");
let tSec = document.getElementById("tsec");
let tMSec = document.getElementById("tmillisec");
let lMin = document.getElementById("lmin");
let lSec = document.getElementById("lsec");
let lMSec = document.getElementById("lmillisec");

// Buttons
let bstart = document.getElementById("start");
let bstop = document.getElementById("stop");
let blap = document.getElementById("lap");
let bresume = document.getElementById("resume");
let breset = document.getElementById("reset");

let tickTock = 0;
let int_id;
let tickTock2 = 0;
let int_id2;

function updateT() {
  if (tickTock != 10) tMSec.innerHTML = String(tickTock);

  if (tickTock === 10) {
    tickTock = 0;
    tMSec.innerHTML = "0";
    tSec_Data = +tSec.innerHTML;
    tSec_Data++;

    if (tSec_Data < 10) tSec.innerHTML = "0" + tSec_Data;
    else if (tSec_Data === 60) {
      tSec.innerHTML = "00";
      tMin_Data = +tMin.innerHTML;
      tMin_Data++;

      if (tMin_Data < 10) tMin.innerHTML = "0" + tMin_Data;
      else tMin.innerHTML = String(tMin_Data);
    } else tSec.innerHTML = String(tSec_Data);
  } else {
    tickTock++;
  }
}

function updateL() {
  if (tickTock2 != 10) lMSec.innerHTML = String(tickTock2);

  if (tickTock2 === 10) {
    tickTock2 = 0;
    lMSec.innerHTML = "0";
    lSec_Data = +lSec.innerHTML;
    lSec_Data++;

    if (lSec_Data < 10) lSec.innerHTML = "0" + lSec_Data;
    else if (lSec_Data === 60) {
      lSec.innerHTML = "00";
      lMin_Data = +lMin.innerHTML;
      lMin_Data++;

      if (lMin_Data < 10) lMin.innerHTML = "0" + lMin_Data;
      else lMin.innerHTML = String(lMin_Data);
    } else lSec.innerHTML = String(lSec_Data);
  } else {
    tickTock2++;
  }
}

bstart.addEventListener("click", () => {
  int_id = setInterval(updateT, 100);
  bstop.style.display = "inherit";
  blap.style.display = "inherit";
  bstart.style.display = "none";
});

breset.addEventListener("click", () => {
  lmin.innerHTML = lsec.innerHTML = tMin.innerHTML = tSec.innerHTML = "00";
  lMSec.innerHTML = tMSec.innerHTML = "0";
  breset.style.display = "none";
  bresume.style.display = "none";
  bstart.style.display = "inherit";
  document.querySelector(".lap-heading").className = "hidden";
  document.querySelector(".laps").innerHTML = "";
  document.querySelector(".timers-lap").style.display = "none";
});

bresume.addEventListener("click", () => {
  int_id = setInterval(updateT, 100);
  int_id2 = setInterval(updateL, 100);
  bresume.style.display = "none";
  breset.style.display = "none";
  bstop.style.display = "inherit";
  blap.style.display = "inherit";
});

bstop.addEventListener("click", () => {
  clearInterval(int_id);
  clearInterval(int_id2);
  bstop.style.display = "none";
  blap.style.display = "none";
  bresume.style.display = "inherit";
  breset.style.display = "inherit";
});

blap.addEventListener("click", () => {
  // When user click first time lap button
  if (document.querySelector(".lap-heading").classList.contains("hidden")) {
    document.querySelector(".lap-heading").classList.replace("hidden", "show");
  }

  let laps = document.querySelector(".laps");
  let newElement = document.createElement("div");

  clearInterval(int_id2);

  if (!laps.hasChildNodes()) {
    newElement.innerHTML = `<p>1</p><p>${tMin.innerHTML}:${tSec.innerHTML}.${tMSec.innerHTML}</p><p>${tMin.innerHTML}:${tSec.innerHTML}.${tMSec.innerHTML}</p>`;
    newElement.className = "lap";
    laps.appendChild(newElement);
    document.querySelector(".timers-lap").style.display = "block";
  } else {
    newElement.innerHTML = `<p>${laps.childElementCount + 1}</p><p>${
      lMin.innerHTML
    }:${lSec.innerHTML}.${lMSec.innerHTML}</p><p>${tMin.innerHTML}:${
      tSec.innerHTML
    }.${tMSec.innerHTML}</p>`;
    newElement.className = "lap";
    laps.insertBefore(newElement, laps.childNodes[0]);
  }

  int_id2 = setInterval(updateL, 100);

  lMin.innerHTML = "00";
  lSec.innerHTML = "00";
  lMSec.innerHTML = "0";
});
