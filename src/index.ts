import * as PIXI from 'pixi.js';
import { Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { addStats, StatsJSAdapter } from 'pixi-stats';
import {
	drawSizedContainer,
	drawSizedContainerWithSprite,
} from './scripts/containerUtils';
import { getRandomInt } from './scripts/utils';

const WIDTH = 200;
const HEIGHT = 150;
const LOAD_COUNT = 10;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
import { loadImages } from './scripts/spriteUtils';

const ticker: Ticker = Ticker.shared;
const app = new PIXI.Application({
	width: CANVAS_WIDTH,
	height: CANVAS_HEIGHT,
	backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

async function preload(): Promise<Array<HTMLImageElement>> {
	const imageElementCollection = await loadImages(LOAD_COUNT);
	return imageElementCollection;
}

async function main() {
	const imageElementCollection = await preload();
	function atEachTick() {
		const children = app.stage.children;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			child.destroy({
				children: true,
			});
		}
		for (let i = 0; i < LOAD_COUNT; i++) {
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
