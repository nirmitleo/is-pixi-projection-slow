async function loadImage(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = document.createElement('img') as HTMLImageElement;
		image.addEventListener('load', function () {
			resolve(image);
		});
		image.addEventListener('error', function () {
			reject();
		});
		image.crossOrigin = 'anonymous';
		image.src = url;
	});
}
export async function loadImages(total: number) {
	const images: HTMLImageElement[] = [];
	for (let i = 0; i < total; i++) {
		const url = `https://picsum.photos/id/${1 + i}/200/300`;
		let imageElement = null;
		console.log(`Loading image#${i + 1}`);
		try {
			imageElement = await loadImage(url);
		} catch (error) {
			i--;
			continue;
		}
		images.push(imageElement);
	}
	return images;
}
