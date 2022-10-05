document.addEventListener('scroll', (event) => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const scrollOffset = Math.floor(100 * window.scrollY / (document.body.scrollHeight - screen.height)) / 100;

    if (scrollable == scrolled)
        alert("문서 마지막 지점에 도달했습니다.");
    else if (scrolled == window.scrollX)
        alert("문서 시작 지점에 도달했습니다.");
    document.documentElement.style.opacity = 1 - scrollOffset;
})