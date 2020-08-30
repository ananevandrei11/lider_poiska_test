let materialBlcok = document.querySelector('.material');
let materialSelect = document.querySelector('#material');
let options = materialBlcok.querySelector('.material-options');
let size = document.forms.size;
let width = size.elements.width;
let height = size.elements.height;
let mounting = size.elements.mounting;
let sum = document.querySelector('#sum');
let btnSubmit = document.querySelector('.form-btn');
let totalSum;
let regexNumber = /[^0-9, ^.,]/;

function mutationCost(num) {
  num += "";
  num = new Array(4 - num.length % 3).join("U") + num;
  return num.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}

function showSum() {
  let m = materialSelect.getAttribute('value');
  (m === null) ? m = 0 : m = m.replace(/[^0-9\.-]+/g, "");
  let w = width.value.replace(",", ".");
  let h = height.value.replace(",", ".");
  let mount = mounting.checked;
  m = Number(m);
  w = Number(w);
  h = Number(h);
  let square = w * h;
  let cost;
  (!mount) ? cost = (square * m) : cost = ((square * m) + (square * 200));
  cost = cost.toFixed(0);

  totalSum = mutationCost(cost);
  (!isNaN(cost)) ? sum.innerText = totalSum : sum.innerText = 0;
  (sum.innerText != 0) ? btnSubmit.removeAttribute('disabled') : btnSubmit.setAttribute('disabled', 'disabled');
  return totalSum;
}

function checkInput(elem, target, reg) {
  let warn = target.parentElement.querySelector('.warning');
  let succes = target.parentElement.querySelector('.succes');
  let checkReg = reg;
  if ((elem.value == 0 && elem.value.length !== 0) || elem.value.match(checkReg)) {
    warn.style.visibility = 'visible';
    target.style.borderColor = '#C98E99';
    succes.style.visibility = 'hidden';
  } else if (elem.value.length == 0) {
    warn.style.visibility = 'hidden';
    target.style.borderColor = '';
    succes.style.visibility = 'hidden';
  } else {
    warn.style.visibility = 'hidden';
    target.style.borderColor = '';
    succes.style.visibility = 'visible';
  }
}

// show Select Options
materialBlcok.onclick = (event) => {
  let target = event.target;
  if (!target.classList.contains('material-btn')) return;
  if (!options.classList.contains("open")) {
    options.classList.add('open');
    options.classList.remove('close');
  } else {
    options.classList.add('close');
    options.classList.remove('open');
  }
};

// set Value Options
options.onclick = (event) => {
  let target = event.target;
  if (target.tagName != 'SPAN') return;
  materialSelect.setAttribute('value', target.innerText);
  showSum();
  let succes = materialBlcok.querySelector('.succes');
  succes.style.visibility = 'visible';
};

// checkInput WIDTH
width.oninput = (event) => {
  let target = event.target;
  checkInput(width, target, regexNumber);
}

// checkInput HEIGHT
height.oninput = (event) => {
  let target = event.target;
  checkInput(height, target, regexNumber);
}

// showTotalSum
size.oninput = () => {
  showSum();
}

// redirect to Next page
btnSubmit.onclick = () => {
  let numOrder = Math.floor(Math.random() * 3000) + 1;
  localStorage.setItem('data', JSON.stringify({
    resWidth: width.value,
    resHeight: height.value,
    resMat: materialSelect.value,
    resMount: mounting.checked,
    resSum: totalSum,
    resNum: numOrder,
  }));
  window.location.href = 'order.html';
  return false;
}