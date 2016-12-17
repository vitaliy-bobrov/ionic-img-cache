# ionic-img-cache

[![Bower version](https://badge.fury.io/bo/ionic-img-cache.svg)](https://badge.fury.io/bo/ionic-img-cache)
[![npm version](https://badge.fury.io/js/ionic-img-cache.svg)](https://badge.fury.io/js/ionic-img-cache)
[![devDependency Status](https://david-dm.org/vitaliy-bobrov/ionic-img-cache/dev-status.svg)](https://david-dm.org/vitaliy-bobrov/ionic-img-cache#info=devDependencies)


Ionic directive to cache images or element background images on first load.

This library works with Ionic Framework (v >= 1.0), the supported platforms being:

* Android
* iOS
* Windows Phone 8.1
* Amazon Fire OS

## Instalation

* Install
  * Bower
  `bower install --save ionic-img-cache`

  * npm
  `npm install --save ionic-img-cache`

* Add **imgcache.js** and **ionic-img-cache.min.js** files to your app index.html file.
* Install required [cordova plugins](#required-cordova-plugins):
  ```
    cordova plugin add cordova-plugin-device
    cordova plugin add cordova-plugin-file
    cordova plugin add cordova-plugin-file-transfer
  ```
* Inject as dependency into your app, example:

```javascript
  angular.module('app', [
      'ionic',
      'ionicImgCache'
    ])
```

* Edit **config.xml** file:
  * Add `<access origin="*"/>`
  * For Android add:
  ```xml
    <access origin="cdvfile://*"/>
    <allow-intent href="cdvfile://*"/>
    <preference name="AndroidPersistentFileLocation" value="Compatibility" />
  ```
  * For iOS add `<preference name="iosPersistentFileLocation" value="Library"/>`

### Required cordova plugins:

* [Device](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html)
* [File](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file/index.html)
* [FileTransfer](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-file-transfer/index.html)

## Usage

Just add `ion-img-cache` attribute to `img` tag you want to cache.

Example:
  Image:
  `<img ion-img-cache ng-src="{{ imagePath }}"/>`

  Background image:
  `<div ion-img-cache-bg>Element with abckground image set with css or ng-style</div>`

## Clearing cache:

`ionImgCacheSrv.clearCache()` - returns promise, so you can chain it with `.then` and/or `.catch`.

Unfortunaly there is no way to invalidate single image now.

## Options

Caching can be configured via `ionicImgCacheProvider`, there are available parameters in this provider:

### debug

**Type**: Boolean

**Default value**: false

Enables ImgCache debug mode.

### quota

**Type**: Number

**Default value**: 50

Quota for storage size available for cached images in MB.

### folder

**Type**: String

**Default value**: ion-img-cache

Set name of cached files directory.

Example:

```javascript
angular.module('app')
  .config(function(ionicImgCacheProvider) {
    // Enable imgCache debugging.
    ionicImgCacheProvider.debug(true);

    // Set storage size quota to 100 MB.
    ionicImgCacheProvider.quota(100);
    
    // Set foleder for cached files.
    ionicImgCacheProvider.folder('my-cache');
  });
```
