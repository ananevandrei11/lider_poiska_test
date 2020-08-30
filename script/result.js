let totalName = document.querySelector('#total-name');
let totalMail = document.querySelector('#total-mail');
let totalPhone = document.querySelector('#total-phone');
let orderNumber = document.querySelector('#order-number');

// Get data for result
function getResult() {
    try {
        let dataResult = JSON.parse(localStorage.result);
        totalName.innerHTML = `${dataResult.name}`;
        totalMail.innerHTML = `${dataResult.mail}`;
        totalPhone.innerHTML = `${dataResult.phone}`;
        let dataOrder = JSON.parse(localStorage.data);
        orderNumber.innerHTML = `№ ${dataOrder.resNum}`;
    } catch (err) {
        console.log(err);
        totalName.innerHTML = `Г-н/Г-жа Клиент`;
        totalMail.innerHTML = `mail@mail.ru`;
        totalPhone.innerHTML = `+0 (000) 000-00-00`;
    }
}
getResult();
