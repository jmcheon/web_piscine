const stackCreate = () => ({
  arr: []
});

export function stackEmpty(stack) {
	if (stack.arr[0] == null)
		return (false);
	return (true);
}

export function stackPush(stack, data) {
	let i = 0;

	while (stack.arr[i] != null)
		i++;
	stack.arr[i] = data;
}

export function stackPeek(stack) {
	let i = 0;

	while (stack.arr[i] != null)
		i++;
	return (stack.arr[i - 1]);
}

export function stackPop(stack) {
	let i = 0;
	let arr = [];

	while (stack.arr[i] != null)
		i++;
	if (i <= 0)
	{
		console.log('arr is already empty!');
		return ;
	}
	i -= 1;
	while (i--)
		arr[i] = stack.arr[i];
	stack.arr = arr;
}

const stack = stackCreate();
stackPop(stack);
//console.log(stackPop(stack));
stackPush(stack, 1);
stackPush(stack, 4);
stackPush(stack, 3);
stackPush(stack, 5);
console.log(stackPeek(stack))
stackPop(stack);
console.log(stackEmpty(stack))
console.log(stack);
