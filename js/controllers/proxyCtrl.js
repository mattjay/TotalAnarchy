App.controller('proxyCtrl', ['$scope', 'socket', 'proxy', function($scope, socket, proxy){
	'use strict';
	$scope.serverstate = 'Not Listening';
	$scope.data = proxy.data;


	$scope.listen = function (){
		if ($scope.serverstate === 'Not Listening'){
			proxy.start();
			//push state update from service after a check?
			$scope.serverstate = 'Listening';
		}
		else if ($scope.serverstate === 'Listening'){
			proxy.stop();
			//push state update from service after a check?
			$scope.serverstate = 'Not Listening';
		}
	};

	$scope.sendResponse =  function(){
		if ($scope.data.length > 0){
			proxy.sendResponse();
			$scope.data = [];
		}
	};

	$scope.$on( 'Proxy.request', function( event, request ) {
		console.log(request);
		$scope.data = request;
		//registers the change in data
		if(!$scope.$$phase) {
			$scope.$apply();
		}
	});
}]);