'use stric'
const FAIL_MESSAGE = "fail..!, retrying... current step is...";
const A_PROCESS = [['A. noodles', 10]];
const B_PROCESS = [['B1. broccoli', 1], 
                    ['B2. garlic and onion', 2], 
                    ['B3. bacon and ham', 2], 
                    ['B4. sauce and vegetables', 3]];
const C_PROCESS = [['C. mix everything', 3]];
let i = 0;

function randomFail() {
	if (Math.random() < 0.5) 
		return false;
	return true;
}

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

function retryAC(currentProcess, promise) {
    return new Promise((resolve, reject) => {
        promise(currentProcess[0])
            .then((result) => {
                console.log(result[0], result[1] + 's...');
                resolve([currentProcess, result[0]])})
            .catch((error) => {console.log(FAIL_MESSAGE, error[0]); retryAC(currentProcess, promise).then(resolve).catch(reject);});
    });
}

const makeFood = ([step, interval]) => {
    // console.log('current step:' + step, interval);
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (randomFail() === true) {
			    resolve([step, interval]);
			}
            reject([step, interval]);
		}, interval * 1000);
	})
}

const runProcess = () => {
        return Promise.all([retry(B_PROCESS, makeFood), retryAC(A_PROCESS, makeFood)]);
}

runProcess()
    .then(retryAC(C_PROCESS, makeFood));

// Promise.all([retry(B_PROCESS, makeFood), retryAC(A_PROCESS, makeFood)]).then(retryAC(C_PROCESS, makeFood));
// retry(B_PROCESS, makeFood).then(retry(A_PROCESS, makeFood));
// retry(A_PROCESS, makeFood).then(retry(B_PROCESS, makeFood));
// const result = retry(B_PROCESS, makeFood).catch(console.log).then(console.log);
// const result2 = makeFood(A_PROCESS).catch(console.log).then(console.log);
// console.log(result)
// console.log(result2)