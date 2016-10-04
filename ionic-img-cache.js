(function() {
  'use strict';

  angular.module('ionicImgCache', ['ionic'])
    .run(init)
    .factory('ionImgCacheSrv', ionImgCacheSrv)
    .directive('ionImgCache', ionImgCache);

  init.$inject = ['$ionicPlatform'];

  function init($ionicPlatform) {
    ImgCache.options.debug = false;
    ImgCache.options.skipURIencoding = true;
    ImgCache.options.chromeQuota = 50*1024*1024;

    $ionicPlatform.ready(function() {
      ImgCache.init();
    });
  }

  ionImgCacheSrv.$inject = ['$q'];

  function ionImgCacheSrv($q) {
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

  ionImgCache.$inject = ['ionImgCacheSrv'];

  function ionImgCache(ionImgCacheSrv) {
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
