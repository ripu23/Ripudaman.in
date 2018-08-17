'use strict'
var module = angular.module('feedbackapp', []);
module.controller("FeedbackController", ['$scope', '$http',
    function ($scope, $http) {
    console.log("Reached feedback controller")



    $(document).ready(function () {

            $scope.feedbacks = [];
            $http({
                method: 'GET',
                url: './getfeedback.php',
            }).then(function (response) {
                
                $scope.feedbacks = response.data;
            }, function (response) {
                console.log('error');
            });
        
    });

}]);
