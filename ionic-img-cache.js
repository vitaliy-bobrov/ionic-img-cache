(function() {
  'use strict';

  angular.module('ionicImgCache', ['ionic'])
    .run(init)
    .factory('ionImgCacheSrv', ionImgCacheSrv)
    .directive('ionImgCache', ionImgCache);

  init.$inject = ['$ionicPlatform'];

  function init($ionicPlatform) {
    ImgCache.options.debug = false;
    ImgCache.options.chromeQuota = 50*1024*1024;

    $ionicPlatform.ready(function() {
      ImgCache.init();
    });
  }

  ionImgCacheSrv.$inject = ['$q'];

  function ionImgCacheSrv($q) {
    var service = {
      heckCacheStatus: checkCacheStatus
    };

    return service;

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
  }

  function ionImgCache() {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, el, attrs) {
      attrs.$observe('ngSrc', function(src) {
        ImgCache.isCached(src, function(path, success) {
          if (success) {
            ImgCache.useCachedFile(el);
          } else {
            ImgCache.cacheFile(src, function() {
              ImgCache.useCachedFile(el);
            });
          }
        });
      });
    }
  }
})();
