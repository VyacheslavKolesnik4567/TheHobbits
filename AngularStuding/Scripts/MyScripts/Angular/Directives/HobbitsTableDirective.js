app.directive("hobbitsTable", function () {
    return {
        link: function (scope, element, attrs) {         
            scope.data = scope[attrs["hobbitsTable"] || attrs["source"]];
        },

        restrict: "E",

        templateUrl: "Scripts/MyScripts/Angular/Templates/hobbitsTable.html"
    };
});