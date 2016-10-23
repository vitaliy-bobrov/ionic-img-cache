(function() {
  'use strict';

  angular
    .module('ionicImgCache', ['ionic'])
    .run(init)
    .provider('ionicImgCache', ionicImgCacheProvider)
    .factory('ionImgCacheSrv', ionImgCacheSrv)
    .directive('ionImgCache', ionImgCache);

  function init($ionicPlatform, ionicImgCache) {
    /* ngInject */

    ImgCache.options.debug = ionicImgCache.debug;
    ImgCache.options.skipURIencoding = true;
    ImgCache.options.chromeQuota = ionicImgCache.quota * 1024 * 1024;

    $ionicPlatform.ready(function() {
      ImgCache.init();
    });
  }

  function ionicImgCacheProvider() {
    var debug = false;
    var quota = 50;

    this.debug = function(value) {
      debug = !!value;
    }

    this.quota = function(value) {
      quota = isFinite(value) ? value : 50;
    }

    this.$get = function() {
      return {
        debug: debug,
        quota: chromeQuota
      };
    };
  }

  function ionImgCacheSrv($q) {
    /* ngInject */

    return {
      checkCacheStatus: checkCacheStatus,
      clearCache: clearCache
    };

    function checkCacheStatus(src) {
      var defer = $q.defer();

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

      return defer.promise;
    }

    function clearCache() {
      var defer = $q.defer();

      ImgCache.clearCache(function() {
        defer.resolve;
      }, function() {
        defer.reject;
      });

      return defer.promise;
    }
  }

  function ionImgCache(ionImgCacheSrv) {
    /* ngInject */

    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      attrs.$observe('ngSrc', function(src) {
        ionImgCacheSrv.checkCacheStatus(src)
          .then(function() {
            ImgCache.useCachedFile(element);
          });
      });
    }
  }
})();
