import * as PIXI from 'pixi.js';
import { Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { addStats, StatsJSAdapter } from 'pixi-stats';
import { drawSizedContainer } from './scripts/containerUtils';
import { getRandomInt } from './scripts/utils';

const ticker: Ticker = Ticker.shared;
const app = new PIXI.Application({
	width: 800,
	height: 600,
	backgroundColor: 0x000000,
});
document.body.appendChild(app.view);

const WIDTH = 200;
const HEIGHT = 150;

function atEachTick() {
	const children = app.stage.children;
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		child.destroy({
			children: true,
		});
	}
	for (let i = 0; i < 200; i++) {
		const width = getRandomInt(WIDTH - 100, WIDTH);
		const height = getRandomInt(HEIGHT - 100, HEIGHT);

		const x = getRandomInt(0, 800 - width);
		const y = getRandomInt(0, 600 - height);
		const container = drawSizedContainer({ width, height });

		container.x = x;
		container.y = y;

		app.stage.addChild(container);
	}
}

ticker.add(atEachTick);

const adaptor: StatsJSAdapter = addStats(document, app);
ticker.add(adaptor.update, adaptor, UPDATE_PRIORITY.UTILITY);
