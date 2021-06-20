import * as PIXI from 'pixi.js';
import { getRandomColor } from './utils';
export function drawSizedContainer({
	width,
	height,
}: {
	width: number;
	height: number;
}) {
	const container = new PIXI.Container();

	let whiteSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
	whiteSprite.width = width;
	whiteSprite.height = height;

	const color = getRandomColor();
	whiteSprite.tint = color;

	container.addChild(whiteSprite);
	return container;
}
