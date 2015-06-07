var myApp = angular.module('myApp', []);

function MyCtrl($scope, $http) {
  $scope.name = 'Superhero';
  var url = "http://www.rit.edu/studentaffairs/siapp/get.php?type=sectionInfo&secId=1&callback=jsonp_callback";

  $http.jsonp(url).then(
    function(s) {
      $scope.success = JSON.stringify(s);
    },
    function(e) {
      $scope.error = JSON.stringify(e);
    });
  }

  function jsonp_callback(data) {
    var el = document.getElementById('ctl');
    var scope = angular.element(el).scope();
    scope.$apply(function() {
    scope.data = JSON.stringify(data);
  });
}
