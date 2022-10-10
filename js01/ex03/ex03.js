const food = document.getElementsByTagName('ul');

for (let i = 0; i < 3; i++) {
    // food[i].addEventListener('mouseover', (event) => {
    //     let target = event.target;
    
    //     if (target === event.currentTarget)
    //         return ;
    //     target.setAttribute('style', 'color:red')
    // });
    
    // food[i].addEventListener('mouseout', (event) => {
    //     let target = event.target;
    
    //     if (target === event.currentTarget)
    //         return ;
    //     if (target.getAttribute('style') === 'color:red')
    //         target.removeAttribute('style')
    // });

    food[i].addEventListener('click', (event) => {
        alert('메뉴를 선택하셨습니다!');
    });
}