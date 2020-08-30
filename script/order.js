let totalWidth = document.querySelector('#total-width');
let totalHeight = document.querySelector('#total-height');
let totalMat = document.querySelector('#total-material');
let totalSum = document.querySelector('#total-sum');
let customer = document.forms.customer;
let name = customer.elements.name;
let mail = customer.elements.mail;
let phone = customer.elements.phone;
let num = customer.elements.numorder;
let regexMail = /[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-z0-9](?:[A-z0-9-]*[A-z0-9])?\.)+[A-z0-9](?:[A-z0-9-]*[A-z0-9])?/;
let regexName = /^[A-zА-яЁё, \n]+$/;
let regexPhone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
let btnSend = document.querySelector('.form-btn');
let sizeData = document.querySelector('.order');
let endWidth;
let endHeight;

// declension of the case
function caseWord(elem) {
    let wordArr = ['метров', 'метр', 'метра'];
    let elemArr = elem.split('');
    let itemSwitch;
    let word;
    (elemArr.length > 1) ? itemSwitch = Number(elemArr[elemArr.length - 1]) : itemSwitch = Number(elemArr[0]);
    switch(true) {
        case (itemSwitch == 0 || (itemSwitch > 5 && itemSwitch < 10)):
            word = wordArr[0];
            break;
        case (itemSwitch == 1):
            word = wordArr[1];
            break;
        case (itemSwitch > 1 && itemSwitch < 5):
            word = wordArr[2];
            break;
        default:
            word = wordArr[0];
    }
    return word;
}

// Get data for order
function getData() {
    try {
        let dataOrder = JSON.parse(localStorage.data);
        totalWidth.innerHTML = `длиной ${dataOrder.resWidth} ${caseWord(dataOrder.resWidth)}`;
        totalHeight.innerHTML = `высотой ${dataOrder.resHeight} ${caseWord(dataOrder.resHeight)}`;
        totalSum.innerHTML = `${dataOrder.resSum} &#8381;`;
        let wordArr = dataOrder.resMat.split(" ");
        totalMat.innerHTML = `${wordArr[0]}`;
        num.value = dataOrder.resNum;
    } catch (err) {
        console.log(err);
        totalWidth.innerHTML = `длиной 0 метров`;
        totalHeight.innerHTML = `высотой 0 метров`;
        totalMat.innerHTML = 'материала';
        totalSum.innerHTML = '0 000 &#8381;';
    }
}
setTimeout(getData, 500);

function checkInput(elem, target, reg) {
    let warn = target.parentElement.querySelector('.warning');
    let succes = target.parentElement.querySelector('.succes');
    let checkReg = reg;
    if (!elem.value.match(checkReg) && elem.value.length > 0) {
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

// Mask for phone
let maskOptions = {
    mask: '+{7} (000) 000-00-00',
};
let mask = IMask(phone, maskOptions);

// Check Input
name.oninput = (event) => {
    let target = event.target;
    checkInput(name, target, regexName);
}
mail.oninput = (event) => {
    let target = event.target;
    checkInput(mail, target, regexMail);
}
phone.oninput = (event) => {
    let target = event.target;
    checkInput(phone, target, regexPhone);
}

// Disable-Enabled button and info of order
customer.oninput = () => {
    let succesArr = document.querySelectorAll('.succes');
    let styleArr = [];
    if (succesArr) {
        for (let i = 0; i < succesArr.length; i++) {
            let styles = getComputedStyle(succesArr[i]);
            (styles.visibility != 'visible') ? styleArr.push(false) : styleArr.push(true);
        }
    }
    function isTrue(elem) {
        return elem == true;
    }
    if (styleArr.length < 2) {
        return false;
    } else {
        (!styleArr.every(isTrue)) ?
        (btnSend.setAttribute('disabled', 'disabled'), sizeData.style.visibility = 'hidden') :
        (btnSend.removeAttribute('disabled'), sizeData.style.visibility = 'visible');
    }
}

// redirect to Next page
btnSend.onclick = () => {
    localStorage.setItem('result', JSON.stringify({
        name: name.value,
        mail: mail.value,
        phone: phone.value,
    }));
}