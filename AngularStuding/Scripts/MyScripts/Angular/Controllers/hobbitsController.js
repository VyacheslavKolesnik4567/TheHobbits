app.controller("hobbitsController", function ($scope, hobbitsService, weaponsService, $uibModal) {
    $scope.loading = true;

    weaponsService.GetWeaponsAsync().then(function (weapons) {
        $scope.weapons = weapons;
        hobbitsLoad();
    });

    var hobbitsLoad = function () {
        hobbitsService.GetHobbitsAsync().then(function (hobbits) {
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
        var size = (!hobbit.Info) ? 'sm' : 'md';
        var modalInstance = $uibModal.open({
            templateUrl: "Scripts/MyScripts/Angular/Templates/HobbitDetail.html",
            controller: function ($scope) {
                $scope.hobbit = hobbit;
                $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };
            },
            size: size
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

        modalInstance.result.then(function (hobbit) {
            //Http request to the server
            hobbitsService.AddHobbitAsync(hobbit)
                //Succes func
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
                //Error func
                .error(function (data, status, headers, config) {
                    var message = status == 500 ? "File is too big. Max file size 4Mb." : "Problems with the server connection.";
                    $uibModal.open({
                        templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                        animation: true,
                        controller: function ($scope) {
                            $scope.message = { Status: "Failed", Description: "Hobbit didn't created. " + message };
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

        modalInstance.result.then(function (hobbit) {
            //Http request to the server
            hobbitsService.EditHobbitAsync(hobbit)
            //Success func
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
            //Error func
            .error(function (data, status, headers, config) {
                var message = status == 500 ? "File is too big. Max file size 4Mb." : "Problems with the server connection.";
                $uibModal.open({
                    templateUrl: "Scripts/MyScripts/Angular/Templates/message.html",
                    animation: true,
                    controller: function ($scope) {
                        $scope.message = { Status: "Failed", Description: "Hobbit didn't updated. " + message };
                    },
                    size: 'sm',
                });
            });
        });
    };

    //Remove hobbit
    $scope.remove = function (id, photo) {
        var modalInstance = $uibModal.open({
            templateUrl: "Scripts/MyScripts/Angular/Templates/removeHobbit.html",
            controller: function ($scope) {
                $scope.cancel = function () {
                    modalInstance.dismiss('cancel');
                };
                $scope.remove = function () {
                    modalInstance.close($scope.password);
                };
            },
            size: 'sm'
        });

        modalInstance.result.then(function (password) {
            //Http request to the server
            hobbitsService.RemoveHobbitAsync(id, photo, password)
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
                        $scope.message = { Status: "Failed", Description: "Hobbit didn't removed. Problems with the server connection." }
                    },
                    size: 'sm',
                });
            });
        })
    }
});