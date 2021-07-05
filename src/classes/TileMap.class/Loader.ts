export default class Loader {
    images: object;

    constructor() {
        this.images = {};
    }

    loadImage = (key, src) => {
        const image = new Image();
        const promise: Promise<HTMLImageElement> = new Promise(
            (resolve, reject) => {
                image.onload = () => {
                    this.images[key] = image;
                    resolve(image);
                };

                image.onerror = () => {
                    reject('Could not load image: ' + src);
                };
            }
        );

        image.src = src;
        return promise;
    };

    getImage = (key) => {
        return key in this.images ? this.images[key] : null;
    };
}
