'use strict'
var module = angular.module('ripu.controllers', []);
module.controller("HomeController", ["$scope", '$uibModal', '$http',
    function ($scope, $uibModal, $http) {


        const url = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=';
        const key = 'dict.1.1.20180711T080637Z.625cbe6ef7847622.cf59280ae9e66db3fd25be3130c105e046b4e447';
        const text = '&lang=en-ru&text=';


        $scope.feedback = {};

        $(document).ready(function () {

            $('[data-toggle="tooltip"]').tooltip();

            if (screen.width <= 480) {
                alert("Site best works on a PC."); // is mobile..
            }
        });
        
        
        $scope.sendFeedback = function () {

            $http({
                method: 'POST',
                url: 'sendfeedback.php',
                data: {
                    'name': $scope.feedback.name,
                    'email': $scope.feedback.email,
                    'message': $scope.feedback.message
                },
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (response) {
                $scope.feedback = {};
                alert('Your feedback has been submitted.');
                
            }, function (response) {
                alert('Error while submitting the feedback.');
            });
        };



        $scope.snakeOpen = function () {

            var modalInstance = $uibModal.open({
                templateUrl: './snakeGame/test.html',
                animation: true,
                keyboard: true,
                scope: $scope,
                controller: function ($uibModalInstance) {

                    $scope.Reset = function () {
                        $uibModalInstance.dismiss('cancel');
                        $scope.snakeOpen();
                    }
                },
                size: 'lg',
                windowClass: 'modal-service-large',
                resolve: {

                }
            });
        };

        $scope.flapOpen = function () {

            var modalInstance = $uibModal.open({
                templateUrl: './flappybird/flappyTemplate.html',
                animation: true,
                keyboard: true,
                scope: $scope,
                controller: function ($uibModalInstance) {

                    $scope.close = function () {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                size: 'md',
                windowClass: 'modal-service-large',
                resolve: {

                }
            });
        };

        $scope.TicTacToeOpen = function () {

            var modalInstance = $uibModal.open({
                templateUrl: './TicTacToe/tictactoetemplate.html',
                animation: true,
                keyboard: true,
                scope: $scope,
                controller: function ($uibModalInstance) {
                    $scope.Close = function () {
                        $uibModalInstance.dismiss('cancel');
                    }
                },
                size: 'lg',
                windowClass: 'modal-service-large',
                resolve: {

                }
            });
        };

        $scope.dictionaryOpen = function () {

            var modalInstance = $uibModal.open({
                templateUrl: './Dictionary/dictionary.html',
                animation: true,
                keyboard: true,
                scope: $scope,
                controller: function ($uibModalInstance) {

                    $scope.Close = function () {
                        $uibModalInstance.dismiss('cancel');
                    }


                    $scope.search = function (searchWord) {

                        if (searchWord) {
                            fetch(url + key + text + searchWord)
                                .then(function (response) {
                                    return response.json();
                                })
                                .then(function (myJson) {
                                    $scope.meanings = [];
                                    //console.log(JSON.parse(myJson));
                                    if (myJson && myJson.def) {
                                        for (var i = 0; i < myJson.def.length; i++) {
                                            if (myJson.def[i].pos == 'noun') {
                                                if (myJson.def[i].tr) {
                                                    for (var j = 0; j < myJson.def[i].tr.length; j++) {
                                                        if (myJson.def[i].tr[j].mean) {
                                                            for (var k = 0; k < myJson.def[i].tr[j].mean.length; k++) {
                                                                if ($scope.meanings.indexOf(myJson.def[i].tr[j].mean[k].text) == -1) {
                                                                    $scope.meanings.push(myJson.def[i].tr[j].mean[k].text)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        console.log($scope.meanings);
                                    }
                                });
                        }
                    }

                },
                size: 'lg',
                windowClass: 'modal-service-large',
                resolve: {

                }
            });
        };

}
]);
