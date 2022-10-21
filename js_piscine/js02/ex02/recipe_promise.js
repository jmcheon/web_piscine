function randomFail() {
	if (Math.random() < 0.2) 
		return false;
	return true;
}

const FAIL_MESSAGE = "fail..!, retrying... current step is...";
const PROCESS = [['make dough', 5], 
                    ['first fermentation', 4.2], 
                    ['make shape', 3], 
					['second fermentation', 2], 
                    ['fry', 5]];
let i = 0;

function retry(currentProcess, promise) {
    return new Promise((resolve, reject) => {
        promise(currentProcess[i])
            .then((result) => {
                console.log(result[0], result[1] + 's...');
                i++;
                if (i < currentProcess.length)
                    retry(currentProcess, promise).then(resolve).catch(reject);
                resolve([currentProcess, result[0]])})
            .catch((error) => {console.log(FAIL_MESSAGE, error[0]); retry(currentProcess, promise).then(resolve).catch(reject);});
    });
}

const makeFood = ([step, interval]) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (randomFail() === true) {
			    resolve([step, interval]);
			}
            reject([step, interval]);
		}, interval * 1000);
	})
}

retry(PROCESS, makeFood);