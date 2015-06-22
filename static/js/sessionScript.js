(function(){
  var app = angular.module("get_sessions", ["ngResource"]);

  app.controller ('SessionsController', function($scope, $http){

    /**
     * Section functions
     */
    this.sections = sections_json;
    //this.sections = sectionFunc();
    this.sectionsDict = make_dict(this.sections);
    function sectionFunc(){
      request = section_req_func();
      return http_func(request);
    }
    function section_req_func(){
      return {
        method: 'GET',
        url: 'http://api.ahanes.com:12333/get.php/?type=sections',
        header: { 'Content-Type' : 'text/html'}
      }
    }
    function http_func(req){
      $http(req)
      .success(function(response){})
      .error(function(response){console.log(response)});
    }
    function make_dict(sections){
      dict = {};
      for(i=0; i<sections.length; i++){
        dict[sections[i].secid] = sections[i].courseName;
      }
      console.log("-->");
      console.log(dict)
      return dict;
    };

    $scope.getSectionName = function(dict, id){
      return dict[id]
    };


    /**
     * Section info functions
     */
    this.sectionInfo = sectionInfoFunc();

    function sectionInfoFunc() {
      sect_array = JSON.parse(localStorage.getItem("sections"))
      console.log(sect_array);
      section_info = []
      if(sect_array != null){
        for(i=0; i<sect_array.length; i++){
          request = request_func(sect_array[i]);
          http_func(request, function(response){section_info.push(response);console.log(response);});
        }
      }
      console.log(section_info);
      return section_info;
    }

    function request_func(id) {
        return {
          method: 'GET',
          url: 'http://api.ahanes.com:12333/get.php/?type=sectionInfo&secId=' + id,
          header: { 'Content-Type' : 'text/html'}
        }
    }
    function http_func(req, succ){
      $http(req)
        .success(succ)
        .error(function(response){console.log(response)});
    }
    $scope.comp_date = function(date){
      console.log("yup");
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
      console.log("Getting sections");
      return localStorage.getItem("sections");
    }
  });

  /**
   * Testing JSON
   */
  sections_json = [
    {
    secid :  5,
    courseName :  "Programming for IT II",
    courseNumber :  "4002-218-5 (2122)"
    },
    {
    secid :  6,
    courseName :  "Introduction to Computer Science I",
    courseNumber :  "CSCI-141-03"
    }
  ]


  sessions_info_json = [
    {
    secId :  1,
    professor :  "Tanweer Alam",
    leader :  "Johnathan",
    sessions :
    {
        1:{
            sessionId :  "h1suv577eb4687or05jo5b00b8",
            dateTime :  "2012|12|03|11|00",
            day :  "Monday",
            location :  "GOL-2650",
            bonusStatus :  false
        },
        2: {
            sessionId :  "js704v4rktu3clqn3953i3bmf8",
            dateTime :  "2012|12|03|10|00",
            day :  "Monday",
            location :  "GOL-2650",
            bonusStatus :  false
        }
    }
  }
  ]

  moment.locale('en', {
    calendar: {
      sameElse : 'L [at] hh:mm a'
    }
  });
})();
