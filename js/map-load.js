var mapboxKey = 'https://api.mapbox.com/styles/v1/eliasgago/cj45nkg6a0lny2so9lt75n12g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxpYXNnYWdvIiwiYSI6ImNqM3ZtbDlheTAwMG8zMW8wYzNocGVzcXcifQ.3Ex1pscNCyDO4Pdq3uIqLw';
var mapboxToken = 'pk.eyJ1IjoiZWxpYXNnYWdvIiwiYSI6ImNqM3ZtbDlheTAwMG8zMW8wYzNocGVzcXcifQ.3Ex1pscNCyDO4Pdq3uIqLw';
var initialPoint = [42.438862, -7.531178];
var initialZoom = 13;

var map = L.map('map').setView(initialPoint, initialZoom);

L.mask(mapMaskCoordinates).addTo(map);

L.tileLayer(mapboxKey, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapboxToken
}).addTo(map);

var sidebar = L.control.sidebar('sidebar', {position: 'right'}).addTo(map);

var viewpointsIcon = L.icon({
    iconUrl: './img/view_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76]
});

var myIcon2 = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon-2x.png',
    iconSize: [70, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

var viewpoints = [
    {
        "id": "os_chancis",
        "name" : "Miradoiro da Os Chancís",
        "lat": 42.411231108946076,
        "lon": -7.634741663932801
    },
    {
        "id": "cividade",
        "name" : "Miradoiro da Cividade",
        "lat": 42.39334215481423,
        "lon": -7.615011334419251
    },
    {
        "id": "boqueirino",
        "name" : "Miradoiro do Boqueiriño",
        "lat": 42.40393908425197,
        "lon": -7.596171498298644
    },
    {
        "id": "santiorxo",
        "name" : "Miradoiro de Santiorxo",
        "lat": 42.40786840656946,
        "lon": -7.568507194519042
    },
    {
        "id": "cadeiras",
        "name" : "Miradoiro de Cadeiras",
        "lat": 42.3976841411843,
        "lon": -7.555275857448577
    },
    {
        "id": "os_chelos",
        "name" : "Miradoiro de Os Chelos",
        "lat": 42.38953276520176,
        "lon": -7.517826855182647
    },
    {
        "id": "souto_chao",
        "name" : "Miradoiro de Souto Chao",
        "lat": 42.407500043057176,
        "lon": -7.471837699413299
    },
    {
        "id": "pena_do_castelo",
        "name" : "Miradoiro da Pena do Castelo",
        "lat": 42.412528216274005,
        "lon": -7.467776834964752
    }
]

function show(e) {
    console.log(e.target.options.markerId);
    var markerId = e.target.options.markerId;
    sidebar.open('viewpoints');
    $('.level1').hide();
    $('.level2').hide();
    $('#' + markerId).show(1000);
}

var markerPoints = [];

for (var i = viewpoints.length - 1; i >= 0; i--) {
    var marker = L.marker([viewpoints[i].lat, viewpoints[i].lon], {markerId: 'viewpoints_' + viewpoints[i].id}).addTo(map);
    marker.setIcon(viewpointsIcon);
    marker.on('click', show);
    markerPoints.push(marker);
}    


var sitesIcon = L.icon({
    iconUrl: './img/sites_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76]
});

var sites = [
    {
        "name" : "Os Muiños do Xabrega",
        "lat": 42.41889454494551,
        "lon": -7.630434036254883
    },
    {
        "name" : "Petroglifos de Proendos",
        "lat": 42.452262143758645,
        "lon": -7.586199045181274
    },
    {
        "name" : "Centro Oleiro Rectoral de Gundivós",
        "lat": 42.446261403946686,
        "lon": -7.5407034158706665
    },
    {
        "name" : "Igrexa de San Xillao de Lobios",
        "lat": 42.40813774626316,
        "lon": -7.530913352966309
    }
]

for (var i = sites.length - 1; i >= 0; i--) {
    var marker = L.marker([sites[i].lat, sites[i].lon]);
    marker.setIcon(sitesIcon);
    markerPoints.push(marker);
}   

var points = L.layerGroup(markerPoints).addTo(map); 

map.on('zoomend', function() {
    console.log(map.getZoom());
    if (map.getZoom() <12){
        if (map.hasLayer(points)) {
            map.removeLayer(points);
        }
    }
    if (map.getZoom() >= 12){
        if (!map.hasLayer(points)){
            map.addLayer(points);
        }
    }
});


// marker.bindPopup("<b>Miradoiro da Cividade!</b><br>Vaia vistas!");

function showRoute() {
    L.Routing.control({
      waypoints: [
        L.latLng(42.393274, -7.614985),
        L.latLng(42.397951, -7.555044)
      ]
    }).addTo(map);
}

$('.level2').hide();

$(document).on("click", ".link", function (e) {
    //marker.setIcon(myIcon2);
    var id = '#viewpoints_' + e.currentTarget.id;
    $('.level1').hide(1000);
    $('.level2').hide(1000);
    $(id).show(1000);
});

$(document).on("click", ".button_back", function () {
    //marker.setIcon(myIcon2);
    $('.level2').hide(1000);
    $('#viewpoints_list').show(1000);
});
