app.controller('HobbitModalInstanceController', function ($scope, $uibModalInstance, hobbit, weapons) {

    $scope.hobbit = hobbit;
    $scope.weapons = weapons;   

    $scope.link = true;

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function (hobbitForm) {           
        if (hobbitForm.$valid && ((!$scope.link && $scope.hobbit.PhotoFile != undefined) || $scope.link)) {           
            if ($scope.link)
                $scope.hobbit.PhotoFile = undefined;
            else
                $scope.hobbit.Photo = undefined;

            $uibModalInstance.close($scope.hobbit);
        }
        else {
            angular.forEach(hobbitForm.$error, function (field) {
                angular.forEach(field, function (errorField) {
                    errorField.$setTouched();
                })
            });
        }
    };
});