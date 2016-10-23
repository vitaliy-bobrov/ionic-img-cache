(function(document) {
  'use strict';

  angular
    .module('ionicImgCache', ['ionic'])
    .run(init)
    .provider('ionicImgCache', ionicImgCacheProvider)
    .factory('ionImgCacheSrv', ionImgCacheSrv)
    .directive('ionImgCache', ionImgCache)
    .directive('ionImgCacheBg', ionImgCacheBg);

  function init($ionicPlatform, ionicImgCache) {
    /* ngInject */

    ImgCache.options.skipURIencoding = true;
    ImgCache.options.debug = ionicImgCache.debug;
    ImgCache.options.localCacheFolder = ionicImgCache.folder;
    ImgCache.options.chromeQuota = ionicImgCache.quota * 1024 * 1024;

    $ionicPlatform.ready(function() {
      ImgCache.init(function() {
        var message = 'ionicImgCache initialized';

        if (ionicImgCache.debug) {
          if (console.info) {
            console.info(message);
          }
          else {
            console.log(message);
          }
        }
      }, function() {
        var message = 'Failed to init ionicImgCache.';

        if (ionicImgCache.debug) {
          if (console.error) {
            console.error(message);
          }
          else {
            console.log(message);
          }
        }
      });
    });
  }

  function ionicImgCacheProvider() {
    var debug = false;
    var quota = 50;
    var folder = 'ionic-img-cache';

    this.debug = function(value) {
      debug = !!value;
    }

    this.quota = function(value) {
      quota = isFinite(value) ? value : 50;
    }

    this.folder = function(value) {
      folder = '' + value;
    }

    this.$get = function() {
      return {
        debug: debug,
        quota: quota,
        folder: folder
      };
    };
  }

  function ionImgCacheSrv($q) {
    /* ngInject */

    return {
      checkCacheStatus: checkCacheStatus,
      checkBgCacheStatus: checkBgCacheStatus,
      clearCache: clearCache
    };

    function checkCacheStatus(src) {
      var defer = $q.defer();

      _checkImgCacheReady()
        .then(function() {
          ImgCache.isCached(src, function(path, success) {
            if (success) {
              defer.resolve(path);
            } else {
              ImgCache.cacheFile(src, function() {
                ImgCache.isCached(src, function(path, success) {
                  defer.resolve(path);
                }, defer.reject);
              }, defer.reject);
            }
          }, defer.reject);
        })
        .catch(defer.reject);

      return defer.promise;
    }

    function checkBgCacheStatus(element) {
      var defer = $q.defer();

      _checkImgCacheReady()
        .then(function() {
          ImgCache.isBackgroundCached(element, function(path, success) {
            if (success) {
              defer.resolve(path);
            } else {
              ImgCache.cacheBackground(element, function() {
                ImgCache.isBackgroundCached(element, function(path, success) {
                  defer.resolve(path);
                }, defer.reject);
              }, defer.reject);
            }
          }, defer.reject);
        })
        .catch(defer.reject);

      return defer.promise;
    }

    function clearCache() {
      var defer = $q.defer();

      _checkImgCacheReady()
        .then(function() {
          ImgCache.clearCache(defer.resolve, defer.reject);
        })
        .catch(defer.reject);

      return defer.promise;
    }

    function _checkImgCacheReady() {
      var defer = $q.defer();

      if (ImgCache.ready) {
        defer.resolve();
      }
      else{
        document.addEventListener('ImgCacheReady', function() {
          defer.resolve();
        }, false);
      }

      return defer.promise;
    }
  }

  function ionImgCache(ionImgCacheSrv) {
    /* ngInject */

    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      attrs.$observe('ngSrc', function(src) {
        ionImgCacheSrv.checkCacheStatus(src)
          .then(function() {
            ImgCache.useCachedFile(element);
          });
      });
    }
  }

  function ionImgCacheBg(ionImgCacheSrv) {
    /* ngInject */

    return {
      restrict: 'A',
      link: link
    };

    function link(scope, element, attrs) {
      ionImgCacheSrv.checkBgCacheStatus(element)
        .then(function() {
          ImgCache.useCachedBackground(element);
        });

      attrs.$observe('ngStyle', function() {
        ionImgCacheSrv.checkBgCacheStatus(element)
          .then(function() {
            ImgCache.useCachedBackground(element);
          });
      });
    }
  }
})(document);
