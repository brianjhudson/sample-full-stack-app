angular.module('pongApp', [])

.run(function() {
   console.log("Working")
})

.controller('mainCtrl', function($scope, mainService) {
   $scope.getPlayers = function() {
      mainService.getPlayers()
      .then(players => {
         $scope.players = players
      })
   }
   $scope.getTeams = function() {
      mainService.getTeams()
      .then(teams => {
         $scope.teams = teams
      })
   }

   $scope.submitTeam = function(team) {
      mainService.submitTeam(team)
      .then(response => {
         console.log(response)
         $scope.getTeams()
      })

   }
   $scope.submitPlayer = function (player) {
      mainService.submitPlayer(player)
      .then(response => {
         console.log(response)
         $scope.getPlayers()
      })
   }

   $scope.getPlayers()
   $scope.getTeams()
})

.service('mainService', function($http) {
   this.submitTeam = function(team) {
      return $http.post('/api/teams', team)
   }

   this.submitPlayer = function(player) {
      return $http.post('/api/players', player)
   }

   this.getTeams = function() {
      return $http.get('/api/teams').then(response => {
         return response.data
      })
   }

   this.getPlayers = function() {
      return $http.get('/api/players').then(response => {
         return response.data
      })
   }
})