export function setTimer(callbackfn, interval) {
    let count = 0;

    const sid = setInterval(() => {
        if (callbackfn(count))
            count++;
        else
            clearInterval(sid);
    }, interval);
}