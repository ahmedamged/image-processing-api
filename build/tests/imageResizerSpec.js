"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var imageResizer_1 = __importDefault(require("../utilities/imageResizer"));
var image_size_1 = __importDefault(require("image-size"));
describe('Test the resize functionality', function () {
    it('Should resize the image with the right width and height', function () {
        var filename = 'palmtunnel';
        var imageWidth = 900;
        var imageHeight = 900;
        var fullImagePath = "./images/".concat(filename, ".jpg");
        var fullResizedPath = "./resized-images/".concat(filename, "-").concat(imageWidth, "x").concat(imageHeight, ".png");
        (0, imageResizer_1.default)(fullImagePath, fullResizedPath, imageWidth, imageHeight).then(function (res) {
            console.log(res);
            var resizedImageDimensions = (0, image_size_1.default)(fullResizedPath);
            expect(resizedImageDimensions.width).toEqual(imageWidth);
            expect(resizedImageDimensions.height).toEqual(imageHeight);
        })
            .catch(function (err) { return console.log(err); });
    });
});
