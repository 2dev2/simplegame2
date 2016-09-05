(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,$state,$stateParams) {
    var vm = this;
    vm.showSttingOptionsButton = true
    vm.showSttingOptions = false
    var setting;
    vm.startGame = function(){
      $state.go('home.startGamePage')
      console.log("start Game Page")
    }

    vm.changeSettings = function(){
      console.log('change setting')  
    }

  }
})();
