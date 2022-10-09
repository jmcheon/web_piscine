function randomFail() {
	if (Math.random() < 0.2) 
		return false;
	return true;
}

const FAIL_MESSAGE = "fail..!";

const makeFood = (step, interval) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (randomFail() === false) {
				reject(new Error(FAIL_MESSAGE));
			}
			resolve(`${step} ${interval}s...`);
		}, interval * 1000);
	})
}

makeFood('make dough', 5)
	.then((resolve) => {
		console.log(resolve);
		return makeFood('first fermentation', 4.2)
	})
	.then((resolve) => {
		console.log(resolve);
		return makeFood('make shape', 3)
	})
	.then((resolve) => {
		console.log(resolve);
		return makeFood('second fermentation', 2)
	})
	.then((resolve) => {
		console.log(resolve);
		return makeFood('fry', 5)
	})
	.then((resolve) => {
		console.log(resolve);
		console.log('done');
	})
	.catch(console.log);

