app.factory("weaponsService", function ($http) {
    var weaponsService = {
        async: function () {
            var promise = $http.post("Weapon/GetWeapons").then(function (response) {
                return response.data;
            });

            return promise;
        }
    };

    return weaponsService;
});