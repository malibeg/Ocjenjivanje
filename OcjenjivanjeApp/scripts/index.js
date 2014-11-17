// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    angular.module("prosjekApp", [])
  .constant('appConfig', {
      lowMark: 1,
      hiMark: 5
  })
  .controller("mainCtrl", ['$scope', 'appConfig',
    function ($scope, appConfig) {
        $scope.total = 20;

        $scope.rez = [];
        $scope.calculate2 = function () {
            var result = [];
            $scope.calcErr = false;
            for (var i = appConfig.lowMark; i <= appConfig.hiMark; i++) {
                var index = i - 1;

                //validation check before values are less than after
                if ($scope.range[index].fields[1].value <= $scope.range[index].fields[0].value) {
                    $scope.calcErr = true;
                    $scope.range[index].fields[0].error = true;
                } else {
                    $scope.range[index].fields[0].error = false;
                }
                if (i > 1) {
                    if ($scope.range[index].fields[0].value <= $scope.range[index - 1].fields[1].value) {
                        $scope.calcErr = true;
                        $scope.range[index - 1].fields[1].error = true;
                    } else {
                        $scope.range[index - 1].fields[1].error = false;
                    }
                } // end validation

                var res = {
                    ocjena: i,
                    minbod: $scope.range[index].fields[0].value * $scope.total,
                    maxbod: $scope.range[index].fields[1].value * $scope.total
                };

                result.push(res);
            }
            $scope.rez = result;
        }

        $scope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                var props = {
                    ocjena: i,
                    fields: [{
                        minname: "min" + i,
                        value: i === min ? 0 : 0.51 + ((i - 1) * 0.1)
                    }, {
                        maxname: "max" + i,
                        value: 0.6 + ((i - 1) * 0.1)
                    }]
                }
                input.push(props);
            }
            return input;
        }(appConfig.lowMark, appConfig.hiMark, 1);
    }
  ]);

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();