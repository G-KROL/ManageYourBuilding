angular.module('smarthome.controllers', [])


.controller('AppCtrl', function ($scope, $ionicModal, $cordovaFileTransfer, $ionicLoading) {
    var showDay = moment();
    var lastUnit;
    var lastSensorCtrl;

    var getCsv = function () {
      var url = lastSensorCtrl.loadCsvHistory(showDay);
      console.log(cordova.file.externalRootDirectory);
      var targetPath = cordova.file.externalRootDirectory + lastSensorCtrl.introduce() + showDay.format('YYYYMMDD') + ".csv";
      var trustHosts = true
      var options = {};
      $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
        console.log(result);
        $ionicLoading.show({
          template: 'Downloaded into ' + result.nativeURL,
          duration: 1500
        });
      }, function (err) {
        console.log(err);
      }, function () {
        $ionicLoading.show({
          template: 'Downloading into ' + targetPath + ' ...',
          delay: 2000
        })
      });
    };

    var openHistory = function (sensorCtrl, params) {
      if (_.isUndefined(params)) {
        params = {};
      }

      if (_.isUndefined(_.propertyOf(params)('day'))) {
        params.day = moment();
      }

      showDay = params.day;
      lastSensorCtrl = sensorCtrl;
      lastUnit = params.unit;

      sensorCtrl.loadHistory(showDay).success(function (data) {
        $scope.items = [];
        angular.forEach(data, function (value) {
          $scope.items.push({
            'moment': moment(value.moment).toDate(),
            'value': value.value,
            'shotUrl': value.shotUrl
          });
        });
        $scope.unit = lastUnit;
        $scope.historyModal.show();
      });

    };

    $ionicModal.fromTemplateUrl('templates/extra_function/history.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.historyModal = modal;
    });


    $ionicModal.fromTemplateUrl('templates/extra_function/image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.shotModal = modal;
    });

    $scope.openHistory = openHistory;
    $scope.getCsvHistory = getCsv;

    $scope.closeHistory = function () {
      $scope.historyModal.hide();
    };

    $scope.openShot = function(shotUrl) {
      $scope.imageSrc = shotUrl;
      $scope.shotModal.show();
    }

    $scope.datepickerObject = {
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      inputDate: showDay.toDate(),  //Optional
      to: new Date(),
      mondayFirst: true,  //Optional
      templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      callback: function (val) {  //Mandatory
        if (!_.isUndefined(val)) {
          $scope.datepickerObject.inputDate = val;
          openHistory(lastSensorCtrl, {"day": moment(val)})
        }
      },
      dateFormat: 'yyyy-MM-dd', //Optional
      closeOnSelect: false
    };


  });


 
