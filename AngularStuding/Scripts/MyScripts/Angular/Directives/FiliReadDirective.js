app.directive("fileread", [function () {
    return {
        scope: {
            fileread: '='
        },
        restrict: "A",
        link: function (scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                scope.$apply(function () {
                    scope.fileread = changeEvent.target.files[0];
                })                
            });
        }
    }
}]);