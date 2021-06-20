async function loadImage(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve, reject) => {
		const image = document.createElement('img') as HTMLImageElement;
		image.addEventListener('load', function () {
			resolve(image);
		});
		image.crossOrigin = 'anonymous';
		image.src = url;
	});
}
export async function loadImages(total: number) {
	const images: HTMLImageElement[] = [];
	for (let i = 0; i < total; i++) {
		const url = `https://picsum.photos/id/${1 + i}/200/300`;
		console.log(`Loading image#${i + 1}`);
		const imageElement = await loadImage(url);
		images.push(imageElement);
	}
	return images;
}
