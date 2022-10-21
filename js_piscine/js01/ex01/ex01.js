let energyBar = document.getElementsByClassName('energy');
let progressBars = document.getElementsByTagName('progress');

setTimeout(() => {
    energyBar[0].value -= 10;
    energyBar[0].style.setProperty('--c', 'red');
}, 2000);

setTimeout(() => {
    for (let i = 0; i < progressBars.length; i++)
        progressBars[i].value += 5;   
}, 5000);