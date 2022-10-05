'use strict';

export default function helloSomeone(param) {
	if (typeof param == 'string') {
		if (param === '')
			console.log('Who are you?');
		else
			console.log(`Hello ${param}`);
	}
	else if (param === null)
		console.log('I am null and void');
	else if (!isNaN(param)) {
		if (param > 0)
			console.log(`My age is ${param}`);
		else
			console.log('I am Benjamin Button!');
	}
	else if (isNaN(param) && param != undefined)
		console.log('Age is just a number');
	else if (typeof param === 'undefined')
		console.log('Nobody can define me!');
}
