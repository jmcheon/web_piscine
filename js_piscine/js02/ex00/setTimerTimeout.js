export function setTimer(callbackfn, interval) {
    let count = 0;

    const sid = setTimeout(function r() {
        if (callbackfn(count)) {
            count++;
            setTimeout(r, interval);
        }
        else
            clearTimeout(sid);
    }, interval)
}