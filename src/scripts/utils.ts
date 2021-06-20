export function getRandomInt(low: number, high: number) {
	let value = Math.random();
	value *= high - low + 1;
	value += low;
	return Math.floor(value);
}

export function getRandomColor() {
	let hex = ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
	const value = parseInt(hex, 16);
	return value;
}
