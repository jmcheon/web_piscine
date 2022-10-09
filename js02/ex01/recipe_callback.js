function randomFail() {
    if (Math.random() < 0.2) throw "제작 실패..!(월급이 삭감되었다 ㅜㅜ)";
}

const makeDough = () => {
    setTimeout(() => {
        try{
            randomFail();
            console.log('makeDough 3s...');
            firstFermentation();
        }catch (e) {
            console.log(e);
            makeDough();
        }
    }, 3000);
}

const firstFermentation = () => {
    setTimeout(() => {
        try{
            randomFail();
            console.log('fisrt fermentation 5s...');
            makeShape();
        }catch (e) {
            console.log(e);
            firstFermentation();
        }
    }, 5000);
} 

const makeShape = () => {
    setTimeout(() => {
        try{
            randomFail();
            console.log('makeShape 4.2s...');
            secondFermentation();
        }catch (e) {
            console.log(e);
            makeShape();
        }
    }, 4200);
}

const secondFermentation = () => {
    setTimeout(() => {
        try{
            randomFail();
            console.log('second fermentation 2s...');
            fry();
        }catch (e) {
            console.log(e);
            secondFermentation();
        }
    }, 2000);
}

const fry = () => {
    setTimeout(() => {
        try{
            randomFail();
            console.log('fry 5s...');
        }catch (e) {
            console.log(e);
            fry();
        }
    }, 5000);
}

const makeFood = () => {
    makeDough();
}

makeFood();
