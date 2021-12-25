"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
var resizeRoute = express_1.default.Router();
resizeRoute.get('/', function (req, res) {
    var filename = req.query.filename;
    var imageWidth = parseInt(req.query.width);
    var imageHeight = parseInt(req.query.height);
    var fullImagePath = "./images/".concat(filename, ".jpg");
    var fullResizedPath = "./resized-images/".concat(filename, "-").concat(imageWidth, "x").concat(imageHeight, ".png");
    var originalImageExists = fs_1.default.existsSync(fullImagePath);
    var cachedImageExists = fs_1.default.existsSync(fullResizedPath);
    if (cachedImageExists) {
        try {
            console.log('Image already exists!');
            res.writeHead(200, { 'Content-Type': 'image/png' });
            fs_1.default.createReadStream(fullResizedPath).pipe(res);
        }
        catch (error) {
            throw new Error(JSON.stringify({
                message: "Image couldn't be retrieved!",
            }));
        }
    }
    else {
        if (originalImageExists) {
            try {
                (0, sharp_1.default)(fullImagePath)
                    .resize(imageWidth, imageHeight, {
                    kernel: sharp_1.default.kernel.nearest,
                    fit: 'cover',
                    position: 'right top',
                    background: { r: 255, g: 255, b: 255, alpha: 0.5 },
                })
                    .toFile(fullResizedPath)
                    .then(function () {
                    console.log('Image is resized successfully!');
                    res.writeHead(200, { 'Content-Type': 'image/png' });
                    fs_1.default.createReadStream(fullResizedPath).pipe(res);
                });
            }
            catch (error) {
                throw new Error(JSON.stringify({
                    message: "Image couldn't be resized!",
                }));
            }
        }
        else {
            res.send("Image doesn't exist!");
        }
    }
});
exports.default = resizeRoute;
