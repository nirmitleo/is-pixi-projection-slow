import * as PIXI from 'pixi.js';
import { Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { addStats, StatsJSAdapter } from 'pixi-stats';
import { drawSizedContainerWithSprite } from './scripts/containerUtils';
import { getRandomInt } from './scripts/utils';
import { loadImages } from './scripts/spriteUtils';

const WIDTH = 200;
const HEIGHT = 150;
let UNIQUE_IMAGE = 10;
let TOTAL_IMAGE_COUNT = 10;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

const ticker: Ticker = Ticker.shared;
const app = new PIXI.Application({
	width: CANVAS_WIDTH,
	height: CANVAS_HEIGHT,
	backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

function fromLocation() {
	const url = new URL(window.location.href);
	const left = url.search.substring(1);
	const uniqueAndTotal = left.split('&');
	const unique = uniqueAndTotal[0].replace('unique=', '');
	const total = uniqueAndTotal[1].replace('total=', '');
	UNIQUE_IMAGE = parseInt(unique, 10);
	TOTAL_IMAGE_COUNT = parseInt(total, 10);
	TOTAL_IMAGE_COUNT = Math.max(TOTAL_IMAGE_COUNT, UNIQUE_IMAGE);
}
fromLocation();

async function preload(): Promise<Array<HTMLImageElement>> {
	const imageElementCollection = await loadImages(UNIQUE_IMAGE);
	return imageElementCollection;
}

function addContainers(
	imageElementCollection: Array<HTMLImageElement>
): Array<PIXI.Container> {
	const containerCollection = [];
	for (let i = 0; i < TOTAL_IMAGE_COUNT; i++) {
		const width = getRandomInt(WIDTH - 100, WIDTH);
		const height = getRandomInt(HEIGHT - 100, HEIGHT);

		const x = getRandomInt(0, CANVAS_WIDTH - width);
		const y = getRandomInt(0, CANVAS_HEIGHT - height);
		const container = drawSizedContainerWithSprite({
			width,
			height,
			image: imageElementCollection[i],
		});

		container.x = x;
		container.y = y;

		containerCollection.push(container);
	}
	return containerCollection;
}

function changePosition(containerCollection: Array<PIXI.Container>): void {
	for (let i = 0; i < containerCollection.length; i++) {
		const container = containerCollection[i];
		const width = container.width;
		const height = container.height;
		const x = getRandomInt(0, CANVAS_WIDTH - width);
		const y = getRandomInt(0, CANVAS_HEIGHT - height);
		container.x = x;
		container.y = y;
	}
}

async function main() {
	const imageElementCollection = await preload();
	const containerCollection = addContainers(imageElementCollection);
	function atEachTick() {
		app.stage.removeChildren();

		changePosition(containerCollection);
		for (let i = 0; i < containerCollection.length; i++) {
			const container = containerCollection[i];
			app.stage.addChild(container);
		}
	}

	ticker.add(atEachTick);
}

const adaptor: StatsJSAdapter = addStats(document, app);
ticker.add(adaptor.update, adaptor, UPDATE_PRIORITY.UTILITY);
main();
