# ionic-img-cache 🖼

[![Bower version](https://badge.fury.io/bo/ionic-img-cache.svg)](https://badge.fury.io/bo/ionic-img-cache)
[![npm version](https://badge.fury.io/js/ionic-img-cache.svg)](https://badge.fury.io/js/ionic-img-cache)
[![npm](https://img.shields.io/npm/dt/ionic-img-cache.svg)](https://github.com/vitaliy-bobrov/ionic-img-cache)


Ionic directive to cache images or element background images on first load.
Working on top of [imgcache.js](https://github.com/chrisben/imgcache.js/) library.

This library works with Ionic Framework (v >= 1.0), the supported platforms being:

* Android
* iOS
* Windows Phone 8.1
* Amazon Fire OS

## Instalation

* Install
  * npm
  `npm install --save ionic-img-cache`

  * yarn
  `yarn add ionic-img-cache`

  * Bower
  `bower install --save ionic-img-cache`

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

## Cache service public methods:

All methods are async, wrapped into angular `$q` service.

### add
Adds file to local cache.

Example:

```js
angular.module('app')
  .controller('Ctrl', function(ionImgCacheSrv) {
    ionImgCacheSrv.add('path/to/my/asset.jpg')
      .then(function(path) {
        console.log('File cached in ' + path);
      })
      .catch(funtion(err) {
        console.error(err);
      })
  });
```

### get
Gets file local url if it present in cache.

Example:

```js
angular.module('app')
  .controller('Ctrl', function(ionImgCacheSrv) {
    ionImgCacheSrv.get('path/to/my/asset.jpg')
      .then(function(path) {
        console.log('File found in cache ' + path);
      })
      .catch(funtion(err) {
        console.error(err);
      })
  });
```

### remove
Removes file from local cache if it present.

Example:

```js
angular.module('app')
  .controller('Ctrl', function(ionImgCacheSrv) {
    ionImgCacheSrv.remove('path/to/my/asset.jpg')
      .then(function() {
        console.log('File removed from cache');
      })
      .catch(funtion(err) {
        console.error(err);
      })
  });
```

### checkCacheStatus
Checks file cache status by url.

Example:

```js
angular.module('app')
  .controller('Ctrl', function(ionImgCacheSrv) {
    ionImgCacheSrv.checkCacheStatus('path/to/my/asset.jpg')
      .then(function(path) {
        console.log('File added/found in/to cache' + path);
      })
      .catch(funtion(err) {
        console.error(err);
      })
  });
```

### checkBgCacheStatus
Checks elements background file cache status by element.

Example:

```js
angular.module('app')
  .controller('Ctrl', function(ionImgCacheSrv) {
    ionImgCacheSrv.checkBgCacheStatus(angular.element('#my-element))
      .then(function(path) {
        console.log('File added/found in/to cache' + path);
      })
      .catch(funtion(err) {
        console.error(err);
      })
  });
```

### clearCache
Clears all cahced files.

Example:

```js
angular.module('app')
  .controller('Ctrl', function(ionImgCacheSrv) {
    ionImgCacheSrv.clearCache()
      .then(function(path) {
        console.log('Cache successuly cleared');
      })
      .catch(funtion(err) {
        console.error(err);
      })
  });
```

### getCacheSize
Gets local cache size in bytes.

Example:

```js
angular.module('app')
  .controller('Ctrl', function(ionImgCacheSrv) {
    ionImgCacheSrv.getCacheSize()
      .then(function(result) {
        console.log('Cache size is ' + result + ' bytes');
      })
      .catch(funtion(err) {
        console.error(err);
      })
  });
```

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

### cacheClearSize

**Type**: Number

**Default value**: 0

Set quota after which cache folder will be cleared.

Example:

```js
angular.module('app')
  .config(function(ionicImgCacheProvider) {
    // Enable imgCache debugging.
    ionicImgCacheProvider.debug(true);

    // Set storage size quota to 100 MB.
    ionicImgCacheProvider.quota(100);

    // Set folder for cached files.
    ionicImgCacheProvider.folder('my-cache');

    // Set cache clear limit.
    ionicImgCacheProvider.cacheClearSize(100);
  });
```
