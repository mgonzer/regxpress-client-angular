(function() {
  angular
    .module('regXpress')
    .controller('RoomListController', RoomListController)

  const roomsURL = 'https://regxpress.herokuapp.com/rooms'
  // const socket = io.connect('http://localhost:3000');

  function RoomListController($http, ServerService, $scope) {
    const vm = this
    vm.users = [];
    vm.message = "";
    vm.serverService = ServerService;
    vm.numPlayers = 0;

    vm.$onInit = function() {

      $http.get(roomsURL)
        .then(results => {
          // console.log(results);
          vm.rooms = results.data
        })
    }

    vm.getInfo = function(room) {

      var stuff = {
        name: room.name,
        users: [],
        max_numplayers: room.max_numplayers
      }

    }

    vm.joinRoom = function(room) {

      console.log("Joining Room");
      // vm.serverService.joinRoom(room, vm.username)

      var roomObj = {
        name: room.name,
        users: [],
        max_numplayers: room.max_numplayers
      }


      var info = {
        user: vm.username,
        room: roomObj
      }


      vm.serverService.room = roomObj;

      // console.log(info);

      socket.emit("room", info);

      socket.on("room", function(_info) {
        console.log("Info -----------> ", _info)
        console.log("Room -----------> ", _info.room)
        console.log("Users -----------> ", _info.room.users)

        vm.users = _info.room.users;

        console.log("VMS ", vm.users);

        vm.serverService.users = vm.users;
        let lastUserIndex = vm.users.length - 1;
        vm.serverService.message = `User ${vm.users[lastUserIndex].name} Joined the room`;
        vm.serverService.getUsers = getUsers

        $scope.$applyAsync(function() {
          $scope.connected = 'TRUE';
        });

        vm.serverService.userName = vm.username;
      });

      // vm.username = ''

    }

    getUsers = function() {
      // console.log("Users ======= ", vm.users);
      return vm.users;
    }
  }
})();
