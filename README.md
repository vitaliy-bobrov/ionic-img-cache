# ionic-img-cache

[![Bower version](https://badge.fury.io/bo/ionic-img-cache.svg)](https://badge.fury.io/bo/ionic-img-cache)

Ionic directive to cache images on first load.

This library works with Ionic Framework (v >= 1.0), the supported platforms being:

* Android
* iOS
* Windows Phone 8.1
* Amazon Fire OS

## Instalation

* Install via bower `bower install --save ionic-img-cache`
* Add **imgcache.js** and **ionic-img-cache.min.js** files to your app index.html file.
* Inject into app.js, example:
```angular.module('app', [
      'ionic',
      'ionicImgCache'
    ])```
* Edit **config.xml** file:
  * Add `<access origin="*"/>`
  * For Android add ```<access origin="cdvfile://*"/>
  <allow-intent href="cdvfile://*"/>```
  * For iOS add `<preference name="iosPersistentFileLocation" value="Library"/>`

### Required cordova plugins:

* [File](http://docs.phonegap.com/en/edge/cordova_file_file.md.html#File_accessing_the_feature)
* [Device](http://docs.phonegap.com/en/edge/cordova_device_device.md.html#Device_accessing_the_feature)
* [FileTransfer](https://github.com/apache/cordova-plugin-file-transfer/blob/dev/doc/index.md)

## Usage

Just add `ion-img-cache` attribute to `img` tag you want to cache.

Example:

`<img ion-img-cache ng-src="{{ imagePath }}"/>`

Clearing cache:

`ionImgCacheSrv.clearCache()` - returns promise, so you can chain it with `.then` and/or `.catch`.

Unfortunaly there is no way to invalidate single image now.
