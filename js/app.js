$(function() {

  /*parameters*/
  let startButton = $(".startButton");
  let returnButton = $(".returnButton")
  let mainPage = $(".main-page");
  let choosePage = $(".choose-page");
  let option1 = $(".option1");
  let option2 = $(".option2");
  let option3 = $(".option3");

  let option1Page = $(".option1-page");
  let headerH1 = $("#header").find('h1');
  let button = $('#submitWeather');
  let button2 = $('#submitWeather2');
  let button3 = $('#submitWeather3');
  let showIt = $('#show');
  let showIt2 = $('#show2');
  let showIt3 = $('#show3');

  let option2Page = $(".option2-page");
  let option3Page = $(".option3-page");
  let date3 = $("#startDay3").text("");
  let hour3 = $("#endHour3").text("");
  let date2 = $("#startDay2").text("");
  let hour2 = $("#endHour2").text("");
  $('#city').val("");
  $('#city2').val("");
  $('#city3').val("");
  $("#error").html("")
  $("#error2").html("")
  $("#error3").html("")

  /*button start*/
  startButton.on("click", function() {
    mainPage.css('display', "none");
    option1Page.css('display', "none");
    option2Page.css('display', "none");
    option3Page.css('display', "none");
    choosePage.css('display', "block");
  });



  /*button return*/
  returnButton.on("click", function() {
    mainPage.css('display', "none");
    option1Page.css('display', "none");
    option2Page.css('display', "none");
    option3Page.css('display', "none");
    choosePage.css('display', "block");

    headerH1.text("Weather App");

    showIt.hide();
    showIt2.hide();
    showIt3.hide();
    $('#city').val("");
    $('#city2').val("");
    $('#city3').val("");
    $("#error").html("")
    $("#error2").html("")
    $("#error3").html("")


  })

  /*option 1*/
  option1.on("click", function() {
    mainPage.css('display', "none");
    option1Page.css('display', "block");
    option2Page.css('display', "none");
    option3Page.css('display', "none");
    choosePage.css('display', "none");
    headerH1.text("Get Current Weather");

    button.on("click", function() {

      let city = $('#city').val();
      let count = 0;
      if (city != "") {

        $.ajax({
          url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + '&APPID=7d2c32f695f0b6b68626d74c96df2ce5',
          type: "GET",
          dataType: "json",
        }).done(function(data) {
          let widget = show(data);

          showIt.html(widget);
          showIt.show();
          $('#city').val("");
          $("#error").html("");
        }).fail(function() {
          $("#error").html("<div class='alert alert-danger center-block'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Incorrect name of city</div>");
        });
      } else {
        $("#error").html("<div class='alert alert-danger center-block'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Field cannot be empty</div>");
      }
    });


    function show(data) {

      var a = new Date(data.dt * 1000);
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

      return "<h2 class='name text-center'>" + data.name + ", " + data.sys.country + "</h2>" +
        "<h2 class='name text-center'> " + time + "</h2>" +
        "<h4><strong>Weather</strong>: " + data.weather[0].main + "</h4>" +
        "<h4><strong>Description</strong>: <img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>" + data.weather[0].description + "</h4>" +
        "<h4><strong>Temperature min</strong>: " + data.main.temp_min + "&degC" + "</h4>" +
        "<h4><strong>Temperature max</strong>: " + data.main.temp_max + "&degC" + "</h4>" +
        "<h4><strong>Temperature average</strong>: " + data.main.temp + "&degC" + "</h4>" +
        "<h4><strong>Pressure</strong>: " + data.main.pressure + " hPa" + "</h4>" +
        "<h4><strong>Humidity</strong>: " + data.main.humidity + "%" + "</h4>" +
        "<h4><strong>Wind speed</strong>: " + data.wind.speed + " m/s" + "</h4>";
    }
  });
  /*end option1*/

  /*option2*/
  option2.on("click", function() {
    mainPage.css('display', "none");
    option1Page.css('display', "none");
    option2Page.css('display', "block");
    option3Page.css('display', "none");
    choosePage.css('display', "none");
    headerH1.text("7 Day Forecast Weather Data");


    let myDate = new Date();

    $('#startDay2').empty();
    let x = '';
    for (i = 1; i <= 7; i++) {
      x += '<option value="' + i + '">' + new Date(myDate.getTime() + (24 * 60 * 60 * 1000) * i).toISOString().slice(0, 10) + '</option>'; // <-- store how many options
    }
    $('#startDay2').append(x);


    // $('#endHour2').empty();
    // var x = '';
    // for (i = 0; i <= 23; i++) {
    //   x += '<option value="' + i + '">' + i + ":00" + '</option>';
    // }
    // $('#endHour2').append(x);

    button2.on("click", function() {

      let city2 = $('#city2').val();
      date2 = $("#startDay2 :selected").text();
      // hour2 = $("#endHour2").val();

      if (city2 != "") {

        $.ajax({
          url: 'https://api.apixu.com/v1/forecast.json?key=521b939d648345b39bc163240172011&q=' + city2 + '&dt=' + date2,
          type: "GET",
          dataType: "json",
        }).done(function(data) {
          let widget = show2(data);


          showIt2.html(widget);
          showIt2.show();
          $('#city2').val("");
          $("#error2").html("");
        }).fail(function() {
          $("#error2").html("<div class='alert alert-danger center-block'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Incorrect name of city</div>");
        });
      } else {
        $("#error2").html("<div class='alert alert-danger center-block'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Field cannot be empty</div>");
      }

    });



	function timeConverter(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp * 1000);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = date + ' ' + month + ' ' + year + ' ';
	  return time;
	}



    function show2(data) {

      return "<h2 class='name text-center'>Forecast weather data for " + data.location.name +', ' + data.location.country+ "</h2>" +
        "<h4><strong>Local current time</strong>: " + data.location.localtime + "</h3>" +
        "<h4><strong>Date</strong>: " + timeConverter(data.forecast.forecastday[0].date_epoch) +"12:00"+ "</h4>" +
        "<h4><strong>Avarage temperature</strong>: " + data.forecast.forecastday[0].day.maxtemp_c + "&degC" + "</h4>" +
        "<h4><strong>Wind speed</strong>: " + data.forecast.forecastday[0].day.maxwind_mph + " m/s" + "</h4>" +
        "<h4><strong>Humidity</strong>: " + data.forecast.forecastday[0].day.avghumidity + "%" + "</h4>";
    }
  })
  /*end option2*/

  /*option3*/
  option3.on("click", function() {

    mainPage.css('display', "none");
    option3Page.css('display', "block");
    option2Page.css('display', "none");
    option1Page.css('display', "none");
    choosePage.css('display', "none");
    headerH1.text("Get History Weahter");

    let myDate = new Date();

    $('#startDay3').empty();
    var x = '';
    for (i = 1; i <= 7; i++) {
      x += '<option value="' + i + '">' + new Date(myDate.getTime() - (24 * 60 * 60 * 1000) * i).toISOString().slice(0, 10) + '</option>'; // <-- store how many options
    }
    $('#startDay3').append(x);

    $('#endHour3').empty();
    var x = '';
    for (i = 0; i <= 23; i++) {
      x += '<option value="' + i + '">' + i + ":00" + '</option>';
    }
    $('#endHour3').append(x);


    button3.on("click", function() {

      let city3 = $('#city3').val();
      date3 = $("#startDay3 :selected").text();
      hour3 = $("#endHour3").val();

      if (city3 != "") {

        $.ajax({
          url: 'https://api.apixu.com/v1/history.json?key=521b939d648345b39bc163240172011&q=' + city3 + '&dt=' + date3 + '&hour=' + hour3,
          type: "GET",
          dataType: "json",
        }).done(function(data) {
          let widget = show3(data);


          showIt3.html(widget);
          showIt3.show();
          $('#city3').val("");
          $("#error3").html("");
        }).fail(function() {
          $("#error3").html("<div class='alert alert-danger center-block'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Incorrect name of city</div>");
        });
      } else {
        $("#error3").html("<div class='alert alert-danger center-block'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Field cannot be empty</div>");
      }

    });


    function show3(data) {

      return "<h2 class='name text-center'>History weather data for " + data.location.name +', ' + data.location.country + "</h2>" +
        "<h4><strong>Local current time</strong>: " + data.location.localtime + "</h3>" +
        "<h4><strong>History date</strong>: " + data.forecast.forecastday[0].hour[0].time + "</h4>" +
        "<h4><strong>Temperature</strong>: " + data.forecast.forecastday[0].hour[0].temp_c + "&degC" + "</h4>" +
        "<h4><strong>Wind speed</strong>: " + data.forecast.forecastday[0].hour[0].wind_mph + " m/s" + "</h4>" +
        "<h4><strong>Pressure</strong>: " + data.forecast.forecastday[0].hour[0].pressure_mb + " hPa" + "</h4>" +
        "<h4><strong>Humidity</strong>: " + data.forecast.forecastday[0].hour[0].humidity + "%" + "</h4>";
    }
  })
  /*end option3*/




});
