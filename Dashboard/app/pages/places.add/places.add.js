app.controller('PlacesAddCtrl', ['$scope', 'Places', 'ModalService', function($scope, Places, ModalService) {
    $scope.parentPlaceName = "";

    $scope.add = function() {
        Places.add($scope.form, function(data) {
            $scope.form = {};
            $scope.parentPlaceName = "";
        });
    }

    $scope.selectParent = function() {
        Places.get(function(places) {
                ModalService.showModal({
                    templateUrl: 'app/modals/place/tpl.place.html',
                    controller: "PlaceModalCtrl",
                    inputs: {
                        title: "Select Place",
                        places: places.data
                    }
                }).then(function(modal) {
                    modal.element.modal();
                    modal.close.then(function(result) {
                        if(result!==undefined){
                          $scope.form.parentPlace = result._id;
                          $scope.parentPlaceName = result.name;
                        }
                    });
                });
            });
        };
}]);
