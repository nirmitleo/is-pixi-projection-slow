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

const increaseUniqueImageCount = document.querySelector(
	'.increase-unique-image-count'
);
const decreaseUniqueImageCount = document.querySelector(
	'.decrease-unique-image-count'
);
const uniqueImageCount = document.querySelector('.unique-image-count')!;
const totalImageCount = document.querySelector('.total-image-count')!;

function attachListeners() {
	increaseUniqueImageCount?.addEventListener('click', function () {
		UNIQUE_IMAGE += 10;
		UNIQUE_IMAGE = Math.min(500, UNIQUE_IMAGE);
		updateUI();
	});
	decreaseUniqueImageCount?.addEventListener('click', function () {
		UNIQUE_IMAGE -= 10;
		UNIQUE_IMAGE = Math.max(10, UNIQUE_IMAGE);
		updateUI();
	});
}

function updateUI() {
	uniqueImageCount.textContent = UNIQUE_IMAGE.toString();
	totalImageCount.textContent = TOTAL_IMAGE_COUNT.toString();
}

async function preload(): Promise<Array<HTMLImageElement>> {
	const imageElementCollection = await loadImages(UNIQUE_IMAGE);
	return imageElementCollection;
}

async function main() {
	attachListeners();
	const imageElementCollection = await preload();
	function atEachTick() {
		const children = app.stage.children;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			child.destroy({
				children: true,
			});
		}
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

			app.stage.addChild(container);
		}
	}

	ticker.add(atEachTick);
}

const adaptor: StatsJSAdapter = addStats(document, app);
ticker.add(adaptor.update, adaptor, UPDATE_PRIORITY.UTILITY);
main();
