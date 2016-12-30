app.factory("weaponsService", function ($http) {
    return {
        GetWeaponsAsync: function () {
            var promise = $http.post("Weapon/GetWeapons").then(function (response) {
                return response.data;
            });

            return promise;
        }
    };
});