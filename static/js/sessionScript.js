(function(){
  var app = angular.module("get_sessions", ["ngResource"]);

  app.controller ('SessionsController', function($scope, $http){

  moment.locale('en', {
    calendar: {
      sameElse : 'L [at] hh:mm a'
    }
  });
    /**
     * Section functions
     */
    //this.sections = sections_json;
    $scope.sectionsDict = {};
    sectionFunc();
    function sectionFunc(){
      request = section_req_func();
      http_func(request).then(function(response){
        $scope.sections = response.data; make_dict($scope.sections); });
    }
    function section_req_func(){
      return {
        method: 'GET',
        url: 'http://api.ahanes.com/get.php/?type=sections',
        header: { 'Content-Type' : 'text/html'}
      }
    }
    function make_dict(sections){
      for(i=0; i<sections.length; i++){
        $scope.sectionsDict[sections[i].secId] = sections[i].courseName;
      }
    };

    $scope.getSectionName = function(id){
      return $scope.sectionsDict[id]
    };


    /**
     * Section info functions
     */
    sectionInfoFunc();

    function sectionInfoFunc() {
      sect_array = JSON.parse(localStorage.getItem("sections"))
      $scope.section_info = []
      if(sect_array != null){
        for(i=0; i<sect_array.length; i++){
          request = request_func(sect_array[i]);
          http_func(request).then(function(response){
            $scope.section_info.push(response.data);});
        }
      }
    }

    function request_func(id) {
        return {
          method: 'GET',
          url: 'http://api.ahanes.com/get.php/?type=sectionInfo&secId=' + id,
          header: { 'Content-Type' : 'text/html'}
        }
    }
    function http_func(req, succ){
      return $http(req)
    }
    $scope.comp_date = function(date){
      return moment(date,"YYYY|MM|DD|HH|mm").calendar();
    }
    /*
     * Section addition functions (for local storage)
     */
    $scope.add_section = function(key, data) {
      console.log("Setting sections");
      curr_sect_arr = localStorage.getItem(key);
      if (curr_sect_arr != null) {
        curr_sect_arr = JSON.parse(curr_sect_arr);
      }
      else {
        curr_sect_arr = []
      }
      if(curr_sect_arr.indexOf(data) == -1){
        curr_sect_arr.push(data)
      }
      localStorage.setItem(key, JSON.stringify(curr_sect_arr));
    }
    $scope.get_sections = function() {
      return localStorage.getItem("sections");
    }
    $scope.empty_sections = function() {
      return JSON.parse($scope.get_sections()) == null;
    }
    $scope.contains_section = function(id){
       sections = JSON.parse($scope.get_sections())
       return sections != null && sections.indexOf(id) != -1;
    }
    $scope.remove_section = function(data) {
      console.log("Removing sections");
      sections = eval($scope.get_sections());
      index = sections.indexOf(data);
      console.log(typeof(sections))
      sections.splice(index, 1);
      console.log(sections)
      localStorage.removeItem("sections");
      if(sections.length > 0){
        localStorage.setItem("sections", JSON.stringify(sections));
      }
    }
    $scope.clear_all_sections = function(data){
      localStorage.clear();
    }

    /*
     * Announcements Functions
     */
    function announcement_request(){
      return {
        method: 'GET',
        url: 'http://api.ahanes.com/get.php/?type=announcements',
        header: { 'Content-Type' : 'text/html' }
      }
    }
    getAnnouncements();
    function getAnnouncements(){
      request = announcement_request();
      http_func(request).then(function(response){
        $scope.announcements = response.data;});
    }
    $scope.formattedAnnouncementDate = function(date){
      return moment(date,"YYYY|MM|DD|HH|mm").format("MM/DD")
    }

  });


})();
