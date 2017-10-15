


function formDisplayer() {

   $('#new').val("ADD");
   $('#dataForm').css("display", "block");
   $('#cancel').css("display", "block");
   $("#new").click(function() {
      var validateTime = timeValidator();
      var validateDate = dateValidator();
     var validateDesc=descriptionValidator();

      if (validateTime == true && validateDate == true && validateDesc == true) {
         document.getElementById("dataForm").submit();

      }
   });
}

/*The date has to be future date */
/*This function verfies if the given date is in future date or not*/ 
function isFutureDate(stringDate) {
   console.log(stringDate);
   var today = new Date().getTime(),
      inputDate = stringDate.split("/");
   inputDate= new Date(inputDate[2], inputDate[0] - 1, inputDate[1]).getTime();
   return (today - inputDate) < 0 ? true : false;
}
 
function timeValidator() {
   var timeInput = $('#time').val();//document.getElementById("time");
    
    //console.log(timeInput);
   $("#error").empty();

   if (timeInput.length!=0) {

      $('#time').css("background-color", "green");
      return true;

   } else {
      $('#time').css("background-color", "red");
      $("#error").append("<p>Please enter a valid Time!</p>");
      return false;
   }

}
 
function dateValidator() {
   var inputDate =  $('#date').val();
   //console.log(inputDate);
   $("#error").empty();
   
   if (isFutureDate(inputDate) ){
      $('#date').css("background-color", "green");
      return true;

   } else {
      $('#date').css("background-color", "red");
      $("#error").append("<p>Please enter a valid Date in the future!</p>");
      return false;
   }

}
function descriptionValidator() {
   var inputDescription = $('#desc').val();
   $("#error").empty();
//check if the description field is empty
   if (inputDescription.length!=0) {

      $('#desc').css("background-color", "green");
      return true;

   } else {
      $('#desc').css("background-color", "red");
      $("#error").append("<p>Please enter a valid Description!</p>");
      return false;
   }

}


function formHide() {

   $('#new').val("NEW");
   $('#dataForm').css("display", "none");
     $('#cancel').css("display", "none");

}
$(function() {
   $("#date").datepicker();
   
});

$(function() {
   $("#time").clockpicker();
   donetext: 'Done'
});
/*
$('.clockpicker').clockpicker({

   donetext: 'Done'
});
*/
$(document).ready(

   getAppointments()
);

function getDate(date) {
   var d = new Date(date);
   var day = d.getDate();
   var month = d.getMonth() + 1;
   var year = d.getFullYear();
   var result = year + "-" + day + "-" + month;
   return result;
}

function getTime(date) {
   var d = new Date(date);
   var hours = d.getHours();
   var minutes = d.getMinutes();
   var seconds = d.getSeconds();
   var time = hours + ":" + minutes + ":" + seconds;
   return time;
}
//Time formatter 
function formatTime(date) {

   date = date.split(":");
   var hours = parseInt(date[0]);
   var minutes = parseInt(date[1]);
   var ampm = hours >= 12 ? 'pm' : 'am';
   hours = hours % 12;
   hours = hours ? hours : 12;
   minutes = minutes < 10 ? '0' + minutes : minutes;
   var strTime = hours + ':' + minutes + ' ' + ampm;
   return strTime;
}
//Date formatter 
function formatDate(date) {
   date = date.split("-");
   var month = parseInt(date[2]);

   var day = parseInt(date[1]);
   var monthNames = ["January ", "February ", "March ", "April ", "May ", "June ",
      "July ", "August ", "September ", "October ", "November ", "December "
   ];
   var result = monthNames[month - 1].concat(day.toString());
   return result;
}

function getAppointments() {
	$("#error").empty();
   var toSelect = $('#toSelect').val();
   $('#tableDisplay').empty();
   $.ajax({
      type: "GET",
      url: "/cgi-bin/search.cgi",
      data: {
         "toSelect": toSelect
         
      },
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json",

      success: function(jsonData) {

         if (Object.keys(jsonData).length == 0) {

            $("#error").append("<p>No result !</p>");
         } else {
            var tr;
            tr = $("#tableDisplay");
            tr.append("<table> ");
            tr.append(" <tr> <");
            tr.append(" <th>Date </th>");
            tr.append("<th> Time </th>");
            tr.append("<th> Description </th>  ");
            tr.append(" </tr>");

            for (var i = 0; i < jsonData.length; i++) {

               tr.append("<tr> ");
               tr.append("<td>" + formatDate(getDate(jsonData[i].Date)) + "</td>");
				//AM PM
               tr.append("<td>" + formatTime(getTime(jsonData[i].Date)) + "</td>");
               tr.append("<td>" + jsonData[i].Description + "</td> ");
               tr.append("</tr>");

            }
            tr.append("</table>");

         }
      },
      error: function(request, status, error) {
         alert(request.responseText);
      }
   });
}