var geocoder;
var map;

var codefellows = {lat: 47.618248, lng: -122.351871};

/**
 * The CenterControl adds a control to the map that recenters the map on
 * codefellows.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#A874D4';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.marginTop = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to add toilet';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'white';
  controlText.style.fontFamily = 'Delius Unicase', 'cursive';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Add Toilet';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Codefellows.
  controlUI.addEventListener('click', function() {
    $('.mainContent').hide();
    $('.aboutUsAll').hide();
    $('.toilet-form').fadeIn();
  });

}

//initializing google map
function initMap() {
  var geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: codefellows,
  });

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);
  var marker = new google.maps.Marker({
          position: codefellows,
          map: map,
        });
  var script = document.createElement('script');
  script.src='../../data/toiletsRawData.json';
  document.getElementsByTagName('head')[0].appendChild(script);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
}

window.eqfeed_callback = function(results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}

function addMarker(coords, toilet){
  var marker = new google.maps.Marker({
        map: map,
        position: coords
      });
  var infoWindow = new google.maps.InfoWindow({
    content: `<h5>${toilet.location}</h5>
              <h6>Overall Quality: ${toilet.overallQuality}</h6>
              <h6>TP Quality: ${toilet.tpQuality}</h6>
              <h6>Overall Quality: ${toilet.overallQuality}</h6>
              <h6>Free To Use or Pay: ${toilet.usage}</h6>
              <h6>Single or Multiple occupancy: ${toilet.occupancy}</h6>
              <h6>Gender Neutral Friendly: ${toilet.genderNeutral}</h6>
              <h6>Gel Soap or Foam Soap: ${toilet.soap}</h6>
              <h6>Paper Towels or Air Dry: ${toilet.drying}</h6>`
  });
  marker.addListener('mouseover', function() {
    infoWindow.open(map, marker);
  });
  marker.addListener('mouseout', function() {
    infoWindow.close(map,marker);
  });
}


function loadMarkers(){
  app.Toilet.all.forEach(toilet => toilet.geocode(addMarker));
}

function initIndexPage(){
  app.Toilet.fetchData(loadMarkers);
}
