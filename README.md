# [@cloudtasks/image](https://cloudtasks.io)
[![npm version](https://img.shields.io/npm/v/@cloudtasks/image.svg?style=flat)](https://www.npmjs.com/package/@cloudtasks/image)
[![Build Status](https://img.shields.io/travis/Cloudtasks/image/master.svg?style=flat)](https://travis-ci.org/Cloudtasks/image)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/c5b0a49ab43f47a683ca03c44cded777)](https://www.codacy.com/app/jonnybgod/image?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Cloudtasks/image&amp;utm_campaign=Badge_Grade)
[![Coverage Status](https://coveralls.io/repos/Cloudtasks/image/badge.svg?branch=master&service=github)](https://coveralls.io/github/Cloudtasks/image?branch=master)
[![dependencies Status](https://david-dm.org/Cloudtasks/image/status.svg)](https://david-dm.org/Cloudtasks/image)

[![](https://data.jsdelivr.com/v1/package/npm/@cloudtasks/image/badge)](https://www.jsdelivr.com/package/npm/@cloudtasks/image)


Allows you to serve highly optimized images to your client apps.

Helps using [Cloudtasks.io](https://cloudtasks.io) image processing task by substituting your images sources with the processing URL.

With this you can process your images on the fly applying resize, trim, and even filters to your images. In the end you will save a lot of bandwidth for you and your users as well as improve the overall user experience.

You will need a [Cloudtasks.io](https://cloudtasks.io) account to be able to use this module;

## Installation
First you need to load the script just before the end of the ```head``` section of your page:
```html
<script>
  window.cloudtasks = {
    apiKey: 'YOUR_API_KEY'
  }
</script>
<script defer src="https://cdn.jsdelivr.net/npm/@cloudtasks/image@1/dist/cloudtasks-image.min.js"></script>
```

Finally, you can use cloudtasks-image in your website by replacing your ```img``` tags with ```cloudtasks-image```, ```cloudtasks-img``` or ```ct-img```.

```html
<cloudtasks-image src="http://example.com/image.jpg"></cloudtasks-image>
<cloudtasks-img src="http://example.com/image.jpg" [options]="{trim: true, smart: true, filters: 'blur(10):flip()'}"></cloudtasks-img>
<ct-img src="http://example.com/image.jpg" [options]="{trim: true, smart: true, filters: 'blur(10):flip()'}"></ct-img>
```

## API
### Settings
- `clientId`: (string) Cloudtasks.io client id
- `dev`: (boolean) Set environment to dev (default: false)
- `options`: (object) Global options for image processing ([Docs](https://cloudtasks.io/docs/image/#image))
- `photoWidths`: (array) Array of 'Ints' to be used for width approximation calculation
- `photoHeights`: (array) Array of 'Ints' to be used for height approximation calculation
- `placeholderImage`: (string) Set global placeholder image url to be used while waiting for original image (default: '')
- `lazy`: (boolean) Lazy load images (default: true)
- `options`: (boolean) Re-processes image when its resized to a larger container for all images (default: true)

### Attributes
- `[src]`: (string) (required) Sets original image url
- `[options]`: (object) (optional) Sets options for image processing ([Docs](https://cloudtasks.io/docs/image/#image))
- `[placeholder]`: (string) (optional) Sets placeholder image url to be used while waiting for original image
- `[size]`: (string) (optional) Sets size for image processing (if not set we will try to check the best size automatically)
- `[fit]`: (cover | contain | fill | inside | outside) (optional) How the image should be resized to fit both provided dimensions, one of (default: inside / cover when using smart detection)
- `[exact]`: (boolean) (optional) Forces the exact size for image processing ignoring photoWidths and photoHeights matrix
- `[autoResize]`: (boolean) (optional) Re-processes image when its resized to a larger container (default: true)
- `(is-visible)`: (EventEmitter) (optional) triggered once the image enters the viewport

#### Options
- `fit`: (cover | contain | fill | inside | outside) How the image should be resized to fit both provided dimensions, one of (default: inside / cover when using smart detection)
  - `cover`: Crop to cover both provided dimensions (the default).
  - `contain`: Embed within both provided dimensions.
  - `fill`: Ignore the aspect ratio of the input and stretch to both provided dimensions.
  - `inside`: Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
  - `outside`: Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
- `trim`: (boolean | number) Trim "boring" pixels from all edges that contain values similar to the top-left pixel. (default: false)
- `smart`: (boolean) Use 'smart' detection to center the image based on faces and features in the image. (default: false)
- `filters`: () Apply [filters](https://sharp.pixelplumbing.com/en/stable/api-operation/) to the image.
- `crop`: ((number|orig)x(number|orig):(number|orig)x(number|orig)) Extract a region of the image.
- `center`: () Force center when using manual crop
- `auto-orient`: (boolean) Auto image orientation based on its metadata.
- `quality`: (number | string) Defined quality or quality range for image optimization.
- `convert`: (webp | png | jpg | gif) Convert image to the specified format
- `cache`: (number) Cache-Control max age in seconds
- `skipOptimization`: (boolean) Skip image optimization

Example:
```html
<ct-img src="http://example.com/image.jpg" size="800x600" [options]="{trim: true, smart: 'face', filters: 'blur(10):flip()'}" placeholder="http://example.com/placeholderImage.jpg" [forceSize]="true">
```