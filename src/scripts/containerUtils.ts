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

export function drawSizedContainerWithSprite({
	width,
	height,
	image,
}: {
	width: number;
	height: number;
	image: HTMLImageElement;
}) {
	const container = new PIXI.Container();

	const sprite = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(image)));
	sprite.width = width;
	sprite.height = height;

	container.addChild(sprite);
	return container;
}
