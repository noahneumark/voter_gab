app.factory('APIFactory', ['$location', '$http', function($location, $http) {
    var factory = {};
    factory.callAPI = function(){
        $http({
            url: 'https://8d984hb45b.execute-api.us-west-2.amazonaws.com/prod/',
            method: "GET",
            headers: {
                'x-api-key': "sDzHNLlEUs2iTXsVdGrcI3NxigYFnqR66KGgP2sk"
            },
        }).success(function (data) {
            console.log(data);
            $scope.members = data.members;
        })
    }
    return factory;
}]);
