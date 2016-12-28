app.controller("hobbitsController", function ($scope, hobbitsService, weaponsService, $uibModal, $http) {
    $scope.loading = true;

    weaponsService.async().then(function (weapons) {
        $scope.weapons = weapons;
        hobbitsLoad();
    });

    var hobbitsLoad = function () {
        hobbitsService.async().then(function (hobbits) {
            $scope.hobbits = hobbits;
            hobbits.forEach(function (hobbit, index) {
                $scope.weapons.some(function (weapon) {
                    if (weapon.Id == hobbit.WeaponId) { hobbit.Weapon = weapon; return true; }
                })
            });
            $scope.loading = false;
        });
    }

    $scope.sortparam = 'Id';

    //More info popup open
    $scope.moreInfo = function (hobbit) {
        var size = (!hobbit.Info) ?'sm':'md';
        var modalInstance = $uibModal.open({
            template: '<hobbit-detail></hobbit-detail>',
            controller: function ($scope) {
                $scope.hobbit = hobbit;
                $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };
            },
            size:size
        });
    };

    //Add hobbit popup open
    $scope.addHobbit = function () {
        var modalInstance = $uibModal.open({
            templateUrl: "Scripts/MyScripts/Angular/Templates/addHobbit.html",
            controller: 'HobbitModalInstanceController',
            size: 'sm',
            resolve: {
                hobbit: function () {
                    return {};
                },
                weapons: function () {
                    return $scope.weapons;
                }
            }
        });

        //Http request to the server
        modalInstance.result.then(function (hobbit) {
            var formData = new FormData();
            formData.append("PhotoFile", hobbit.PhotoFile);
            formData.append("Age", hobbit.Age);
            formData.append("WeaponId", hobbit.WeaponId);
            formData.append("Name", hobbit.Name);
            if (hobbit.Info != undefined)
                formData.append("Info", hobbit.Info);
            if (hobbit.Photo != undefined)
                formData.append("Photo", hobbit.Photo);

            $http({
                method: "POST", url: "Hobbit/AddHobbit", data: formData, headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
                //Success function
                .success(function (data, status, headers, config) {
                    if (data.Code == 201) {
                        $uibModal.open({
                            templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                            animation: true,
                            controller: function ($scope) {
                                $scope.message = { Status: "Success", Description: "Hobbit created succesfully." };
                            },
                            size: 'sm',
                        });
                        hobbitsLoad();
                    }
                    else
                        $uibModal.open({
                            templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                            animation: true,
                            controller: function ($scope) {
                                $scope.message = { Status: "Failed", Description: "Hobbit didn't created. " + data.Description };
                            },
                            size: 'sm',
                        });
                })
                //Error function
                .error(function (data, status, headers, config) {
                    $uibModal.open({
                        templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                        animation: true,
                        controller: function ($scope) {
                            $scope.message = { Status: "Failed", Description: "Hobbit didn't created. Problems with server connection." };
                        },
                        size: 'sm',
                    });
                });
        });
    };

    //Edit hobbit popup open
    $scope.edit = function (hobbit) {
        var modalInstance = $uibModal.open({
            templateUrl: "Scripts/MyScripts/Angular/Templates/editHobbit.html",
            controller: 'HobbitModalInstanceController',
            size: 'sm',
            resolve: {
                hobbit: function () {
                    return angular.copy(hobbit);
                },
                weapons: function () {
                    return $scope.weapons;
                }
            }
        });

        //Http request to the server
        modalInstance.result.then(function (hobbit) {
            var formData = new FormData();
            formData.append("Id", hobbit.Id);
            formData.append("PhotoFile", hobbit.PhotoFile);
            formData.append("Age", hobbit.Age);
            formData.append("WeaponId", hobbit.Weapon.Id);
            formData.append("Name", hobbit.Name);
            if (hobbit.Info != null)
                formData.append("Info", hobbit.Info);
            if (hobbit.NewPhotoLink != undefined)
                formData.append("Photo", hobbit.NewPhotoLink);

            $http({
                method: "POST", url: "Hobbit/EditHobbit", data: formData, headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
                //Success function
                .success(function (data, status, headers, config) {
                    if (data.Code == 203) {
                        $uibModal.open({
                            templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                            animation: true,
                            controller: function ($scope) {
                                $scope.message = { Status: "Success", Description: "Hobbit updated succesfully." };
                            },
                            size: 'sm',
                        });
                        //Update hobbits table
                        hobbitsLoad();
                    }
                    else {
                        $uibModal.open({
                            templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                            animation: true,
                            controller: function ($scope) {
                                $scope.message = {
                                    Status: "Failed", Description: "Hobbit didn't updated. " + data.Description
                                };
                            },
                            size: 'sm',
                        });
                    }
                })
                //Error function
                .error(function (data, status, headers, config) {
                    $uibModal.open({
                        templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                        animation: true,
                        controller: function ($scope) {
                            $scope.message = { Status: "Failed", Description: "Hobbit didn't updated. Problems with server connection." };
                        },
                        size: 'sm',
                    });
                });
        });
    };

    //Remove hobbit
    $scope.remove = function (id, photo) {
        //Http request to the server
        $http({ method: "POST", url: "Hobbit/RemoveHobbit", params: { id: id, photo: photo } })
                //Success function
                .success(function (data, status, headers, config) {
                    if (data.Code == 202) {
                        $uibModal.open({
                            templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                            animation: true,
                            controller: function ($scope) {
                                $scope.message = { Status: "Success", Description: "Hobbit removed succesfully." };
                            },
                            size: 'sm',
                        });
                        hobbitsLoad();
                    }
                    else
                        $uibModal.open({
                            templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                            animation: true,
                            controller: function ($scope) {
                                $scope.message = {
                                    Status: "Failed", Description: "Hobbit didn't removed. " + data.Description
                                };
                            },
                            size: 'sm',
                        });

                })
                //Error function
                .error(function (data, status, headers, config) {
                    $uibModal.open({
                        templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                        animation: true,
                        controller: function ($scope) {
                            $scope.message = { Status: "Failed", Description: "Hobbit didn't removed. Problems with server connection." }
                        },
                        size: 'sm',
                    });
                });
    };

});