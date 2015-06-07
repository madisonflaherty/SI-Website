/////////////////////////////////////////////////////////////
//  CUSTOMIZABLE
//  Only change items within this block

var schoolName = "Rochester Institute of Technology";
var schoolInitials = "RIT";
var title = "SI @ " + schoolInitials;

//
//
//
/////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
//
//  Database Accessing
//  Must replace with your own means of accessing your database
//

function httpGet(url)
{
var options = {
  host = url
  path = "/studentaffairs/siapp/get.php?type=sections"

}

 return  result;
}


function httpGetSections()
{
  return httpGet("http://www.rit.edu")
}

console.log(JSON.stringify(httpGetSections()))


//
//
//
///////////////////////////////////////////////////////////

//do not edit
//document.getElementById('site_title').innerHTML = title;
//document.getElementById('schoolName').innerHTML = schoolName;
//document.getElementById('schoolInitials').innerHTML = schoolInitials;
//document.getElementById('navbar_title').innerHTML = title;
