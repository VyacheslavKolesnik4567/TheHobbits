app.factory("hobbitsService", function ($http) {
    return {
        GetHobbitsAsync: function () {
            var promise = $http.post("Hobbit/GetHobbits").then(function (response) {
                return response.data;
            });

            return promise;
        },

        AddHobbitAsync: function (hobbit, succesFunc, errorFunc) {
            var formData = new FormData();
            formData.append("PhotoFile", hobbit.PhotoFile);
            formData.append("Age", hobbit.Age);
            if (hobbit.Password != undefined)
                formData.append("Password", hobbit.Password);
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
                .success(succesFunc)
                //Error function
                .error(errorFunc);
        },

        EditHobbitAsync: function (hobbit, succesFunc, errorFunc) {
            var formData = new FormData();
            formData.append("Id", hobbit.Id);
            formData.append("PhotoFile", hobbit.PhotoFile);
            formData.append("Age", hobbit.Age);
            if (hobbit.Password != undefined)
                formData.append("Password", hobbit.Password);
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
                .success(succesFunc)
                //Error function
                .error(errorFunc);
        },

        RemoveHobbitAsync: function (id, photo, password, successFunc, errorFunc) {
            $http({ method: "POST", url: "Hobbit/RemoveHobbit", params: { id: id, photo: photo, password: password } })
            .success(successFunc)
            .error(errorFunc);
        }
    };
});