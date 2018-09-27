const newSearch = document.querySelector('#newSearch button');

// Weather App
$('form').submit(function (evt) {
   evt.preventDefault();
   const $searchField =  $('#search');
   const $searchTerm = $('#search').val();
   const $submitButton = $('#submit');

   // $searchField.prop("disabled",true);
   // $submitButton.attr("disabled", true).val("searching....");
    // the AJAX part
  const mwAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + $searchTerm + "&APPID=85a26e603bc7dbe69a147ee2e7780d23";
  $.getJSON(mwAPI, function(data) {
    const currentTemp = Math.round(data.main.temp - 273.15) + " &#x000B0;C";
    const maxTemp = Math.round(data.main.temp_max - 273.15) + " &#x000B0;C";
    const minTemp = Math.round(data.main.temp_min - 273.15) + " &#x000B0;C";
    let resultsHTML = '<dl><dt>City Name:</dt><dd> ' + data.name + ', ' + data.sys.country +
    '</dd><dt>Current Weather:</dt><dd>' + data.weather[0].main + '; ' + data.weather[0].description +
    '</dd><dt>Current Temperature:</dt><dd> ' + currentTemp + '</dd><dt>Maximum Temperature:</dt><dd> '
    + maxTemp + '</dd><dt>Minimum Temperature:</dt><dd> ' + minTemp + '</dd></dl>';
    $('#searchBox').css('display', 'none');
    $('#results').css('display', 'block');
    $('#results').html(resultsHTML);
    newSearch.parentNode.style = "display: block";
    $('#errorMessage').css('display', 'none');
  });
}); //end .submit

// print error message if AJAX request returns an error
$( document ).ajaxError(function() {
  $('#searchBox').css('display', 'none');
  $('#errorMessage').css('display', 'block');
  newSearch.parentNode.style = 'display: block';
  $('#searchBox').attr('placeholder', '')
  $('#search').val('');
});

//Reset the App with newSearch button
newSearch.addEventListener('click', () => {
  newSearch.parentNode.style = 'display: none';
  $('#errorMessage').css('display', 'none');
  $('#searchBox').css('display', 'block');
  $('#searchBox').attr('placeholder', '')
  $('#results').css('display', 'none');
  $('#search').val('');
  $('#submit').attr('value', 'Search');
});

// display loading message while waiting for ajax response
$( document ).ajaxStart(function() {
  console.log('ajaxStart')
  $('#submit').attr('value', 'Loading...');
});
