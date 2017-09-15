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
  map.data.loadGeoJson('../../data/demo.json');

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

  var contentString = '<div id="content">'+
     '<div id="siteNotice">'+
     '</div>'+
     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
     '<div id="bodyContent">'+
     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
     'sandstone rock formation in the southern part of the '+
     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
     'south west of the nearest large town, Alice Springs; 450&#160;km '+
     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
     'features of the Uluru - Kata Tjuta National Park. Uluru is '+
     'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
     'Aboriginal people of the area. It has many springs, waterholes, '+
     'rock caves and ancient paintings. Uluru is listed as a World '+
     'Heritage Site.</p>'+
     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
     'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
     '(last visited June 22, 2009).</p>'+
     '</div>'+
     '</div>';

  var infowindow = new google.maps.InfoWindow({
  content: contentString
});
  marker.addListener('click', function() {
  infowindow.open(map, marker);
  });
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

function loadMarkers(){
  app.Toilet.all.forEach(toilet => toilet.info());
  app.Toilet.all.forEach(toilet => toilet.geocode());
  app.Toilet.all.forEach(toilet => addMarker(toilet));
}

function initIndexPage(){
  app.Toilet.fetchData(loadMarkers);
}
