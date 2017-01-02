app.factory("hobbitsService", function ($http) {
    return {
        GetHobbitsAsync: function () {
            return $http.post("Hobbit/GetHobbits").then(function (response) {
                return response.data;
            });
        },
        
        AddHobbitAsync: function (hobbit) {
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

            return $http({
                method: "POST", url: "Hobbit/AddHobbit", data: formData, headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        },

        EditHobbitAsync: function (hobbit) {
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

            return $http({
                method: "POST", url: "Hobbit/EditHobbit", data: formData, headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            });
        },

        RemoveHobbitAsync: function (id, photo, password) {
            return $http({
                method: "POST", url: "Hobbit/RemoveHobbit",
                params: { id: id, photo: photo, password: password }
            });
        }
    };
});