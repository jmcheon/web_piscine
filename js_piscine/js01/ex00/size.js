const ul = document.body.lastElementChild.lastElementChild;
const timeLi = document.body.lastElementChild.firstElementChild;
const screenLi = document.createElement('li');
const outerLi = document.createElement('li');
const innerLi = document.createElement('li');
const docLi = document.createElement('li');
const date = new Date();

timeLi.innerHTML = `${date.toLocaleTimeString('ko-kr')}`;
screenLi.innerHTML = `screen: ${screen.width} * ${screen.height}`;
outerLi.innerHTML = `Window Outer: ${window.outerWidth} * ${window.outerWidth}`
innerLi.innerHTML = `Window inner: ${window.innerWidth} * ${window.innerHeight}`
docLi.innerHTML = `Document: ${document.body.scrollWidth} * ${document.body.scrollHeight}`

ul.appendChild(screenLi); 
ul.appendChild(outerLi);
ul.appendChild(innerLi);
ul.appendChild(docLi);