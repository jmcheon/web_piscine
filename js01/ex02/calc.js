const checkbox = document.getElementById('checkbox');
const selectbox = document.getElementById('select');

const time = document.getElementById('time');
const currentDate = new Date();

const inputForm = document.getElementById('inputForm');
const displayForm = document.getElementById('display');

time.innerHTML = `${currentDate.toLocaleDateString('ko-kr')} ${currentDate.toLocaleTimeString('ko-kr')}`;

checkbox.addEventListener('change', () => {
    if (checkbox.checked == true)
        selectbox.disabled = false;
    else
        selectbox.disabled = true;
});

function calcDiscountedPrice(target) {
    let newPrice;

    switch (selectbox.value) {
        case 'none':
            return null;
        case 'Lv1':
            newPrice = target.value - (target.value * (0.05));
            break ;
        case 'Lv2':
            newPrice = target.value - (target.value * (0.10));
            break ;
        case 'Lv3':
            newPrice = target.value - (target.value * (0.15));
            break ;
        default :
            return null;
    }
    return newPrice; 
}

function displayDiscountedPrice(target) {
    let newPrice = calcDiscountedPrice(target);
        if (newPrice != null)
            displayForm.lastElementChild.innerHTML = `할인가: ${newPrice.toLocaleString('ko-kr')}`;
        else
            displayForm.lastElementChild.innerHTML = `할인가:`;
}

inputForm.addEventListener('input', (event) => {
    let target = event.target;
    let newPrice = null;

    if (target.id == 'product')
        displayForm.firstElementChild.innerHTML = `상품명: ${target.value}`;
    else if (target.id == 'price') {
        newPrice = null ? target.value : +target.value;
        displayForm.children[1].innerHTML = `원가: ${(+newPrice).toLocaleString('ko-kr')}`;
        displayDiscountedPrice(target);
    }
    else if (target.id == 'select') {
        displayDiscountedPrice(inputForm.children[2]);
    }
    else if (target.id == 'checkbox') {
        if (target.checked == false)
            displayForm.lastElementChild.innerHTML = `할인가:`;
        else if (target.checked == true) {
            displayDiscountedPrice(inputForm.children[2]);
        }
    }
});