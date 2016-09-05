(function() {
  'use strict';

  angular
    .module('frontend')
    .controller('startGameController', startGameController);

  /** @ngInject */
  function startGameController($scope,$timeout, webDevTec,randomNumberGeneration,generateListOfObject,$state) {
     var vm = this;
    //generate matrix and timer object
    generateListOfObject.generateMatrix(7)
    vm.mat = generateListOfObject.getMatrix()
    vm.row = generateListOfObject.getRow()

    vm.timerObject = {timerComplete:false,timer1:{}}
    var predefinedChance = 3;

    var rand = []
    vm.startGame = function(){
      console.log("timer",vm.timerObject)
     vm.hideResumeButton = false
      //generate random number matrix cell
      if(rand)
        randomNumberGeneration.generateRandomList(6,6,rand)
      else
        randomNumberGeneration.generateRandomList(6,6)
      rand = angular.copy(randomNumberGeneration.getList())
      //change randomly generated cell color

      rand.forEach(function(obj){
        generateListOfObject.modifyCell(obj);
      })
      //start timer
      vm.timerObject.timerComplete = false
      vm.timerObject.clickOnStartButton = true;
    }


    vm.resetMatrixCell = function(obj){
          obj.color = 'old'
      randomNumberGeneration.modifyCell(obj);
      rand = angular.copy(randomNumberGeneration.getList())
      if((rand && rand.length==0)||(!rand)){
         vm.timerObject.clickOnStartButton = false;
        alert("you win the game")
        $state.go('home.startGamePage.gameOver')
      }
    }


  
   //if timer complete start event
     $scope.$on('timer-stopped', function (event, data){
        predefinedChance= predefinedChance -1;
        vm.timerObject.timerComplete = true;
        vm.timerObject.clickOnStartButton = false;
        $scope.$digest()
         console.log('Timer Stopped - data = ', data,event);
        if((rand && rand.length==0)||(!rand)){
          $state.go('home.startGamePage.gameOver')
          // alert("you win the game")
        }
        else if(predefinedChance==0){
          $state.go('home.startGamePage.gameOver')
          // alert('game over')
        }
        else{
          vm.hideResumeButton = true;

          if (window.confirm("Do you  want to get chance")) { 
            $state.go('home.startGamePage.retryGame') 
            vm.startGame()
          }
          else
            $state.go('home')
          
        }
    });



    vm.startGame()

    vm.exitGame=function(){
      $state.go('home')
    }

  }
})();