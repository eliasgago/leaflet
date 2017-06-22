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
    var type = e.target.options.type;
    sidebar.open(type);
    $('.level1').hide();
    $('.level2').hide();
    $('#' + markerId).show(1000);
}

var markerPoints = [];

for (var i = viewpoints.length - 1; i >= 0; i--) {
    var options = {
        markerId: 'viewpoints_' + viewpoints[i].id,
        type: 'viewpoints',
        title: viewpoints[i].name
    };
    var marker = L.marker([viewpoints[i].lat, viewpoints[i].lon], options).addTo(map);
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
    var options = {
        markerId: 'sites_' + sites[i].id,
        type: 'sites',
        title: sites[i].name
    };
    var marker = L.marker([sites[i].lat, sites[i].lon], options).addTo(map);
    marker.setIcon(sitesIcon);
    marker.on('click', show);
    markerPoints.push(marker);
}   

var lodgingsIcon = L.icon({
    iconUrl: './img/lodgings_icon.png',
    iconSize: [25, 25],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76]
});

var lodgings = [
    {
        "id": "donatus",
        "name" : "Vila Donatus",
        "lat": 42.41389658591989,
        "lon": -7.478824853897094
    },
    {
        "id": "corona",
        "name" : "Casa Corona",
        "lat": 42.45853538959867,
        "lon": -7.597963213920593
    },
    {
        "id": "flores",
        "name" : "Casa das Flores",
        "lat": 42.44503822748129,
        "lon": -7.573903799057006
    },
    {
        "id": "estevo",
        "name" : "Casa do Estevo",
        "lat": 42.42134783469654,
        "lon": -7.472907900810241
    },
    {
        "id": "rio_sil",
        "name" : "Apartamentos Río Sil",
        "lat": 42.4166946207761,
        "lon": -7.597289979457854
    },
    {
        "id": "madrina",
        "name" : "Casa da Madriña",
        "lat": 42.48857888524799,
        "lon": -7.574032545089722
    },
    {
        "id": "anllo",
        "name" : "Rectoral de Anllo",
        "lat": 42.43931391926548,
        "lon": -7.626260519027709
    },
    {
        "id": "rosende",
        "name" : "Casa Grande de Rosende",
        "lat": 42.45652089523697,
        "lon": -7.620472311973571
    },
    {
        "id": "ruperto",
        "name" : "Casa Ruperto",
        "lat": 42.414728286601516,
        "lon": -7.479715347290039
    },
    {
        "id": "solveira",
        "name" : "Casa Solveira",
        "lat": 42.417710436936574,
        "lon": -7.600843906402588
    }
]

for (var i = lodgings.length - 1; i >= 0; i--) {
    var options = {
        markerId: 'lodgings_' + lodgings[i].id,
        type: 'lodgings',
        title: lodgings[i].name
    };
    var marker = L.marker([lodgings[i].lat, lodgings[i].lon], options).addTo(map);
    marker.setIcon(lodgingsIcon);
    marker.on('click', show);
    markerPoints.push(marker);
}   


var wineriesIcon = L.icon({
    iconUrl: './img/wineries_icon.png',
    iconSize: [25, 25],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76]
});

var wineries = [
    {
        "id": "algueira",
        "name" : "Algueira",
        "lat": 42.41797181387165,
        "lon": -7.474597692489625
    },
    {
        "id": "lobeiras",
        "name" : "Lobeiras",
        "lat": 42.42024099511087,
        "lon": -7.579439878463744
    },
    {
        "id": "malcavada",
        "name" : "Malcavada",
        "lat": 42.45669899656409,
        "lon": -7.619297504425049
    },
    {
        "id": "marcelino",
        "name" : "Marcelino I",
        "lat": 42.439955257818234,
        "lon": -7.582336664199829
    },
    {
        "id": "proencia",
        "name" : "Proencia",
        "lat": 42.45328332060084,
        "lon": -7.588167786598205
    },
    {
        "id": "soutelo",
        "name" : "Soutelo",
        "lat": 42.42317932418995,
        "lon": -7.540912628173828
    },
    {
        "id": "petron",
        "name" : "Petrón",
        "lat": 42.41838367834631,
        "lon": -7.474393844604492
    },
    {
        "id": "rectoral",
        "name" : "Rectoral de Amandi",
        "lat": 42.39905877681099,
        "lon": -7.515850067138671
    },
    {
        "id": "cazoga",
        "name" : "Viña Cazoga",
        "lat": 42.39912215986002,
        "lon": -7.507599592208861
    },
    {
        "id": "noguedo",
        "name" : "Casa Noguedo",
        "lat": 42.407476277594995,
        "lon": -7.559446692466736
    },
    {
        "id": "sesse",
        "name" : "Castro Sesse",
        "lat": 42.483000978057134,
        "lon": -7.589557170867919
    },
    {
        "id": "sesse",
        "name" : "Castro Sesse",
        "lat": 42.483000978057134,
        "lon": -7.589557170867919
    },
    {
        "id": "lucenza",
        "name" : "Lucenza",
        "lat": 42.441823811732505,
        "lon": -7.588908076286315
    },
    {
        "id": "estrela",
        "name" : "Estrela",
        "lat": 42.41708075166462,
        "lon": -7.519959211349487
    },
    {
        "id": "bernardino",
        "name" : "Don Bernardino",
        "lat": 42.42111221216409,
        "lon": -7.528767585754394
    },
    {
        "id": "san_xiao",
        "name" : "San Xiao",
        "lat": 42.40705245867436,
        "lon": -7.530033588409423
    }
];

var wineriesGroup = [];

for (var i = wineries.length - 1; i >= 0; i--) {
    var options = {
        markerId: 'wineries_' + wineries[i].id,
        type: 'wineries',
        title: wineries[i].name
    };
    var marker = L.marker([wineries[i].lat, wineries[i].lon], options).addTo(map);
    marker.setIcon(wineriesIcon);
    marker.on('click', show);
    wineriesGroup.push(marker);
}   

var points = L.layerGroup(markerPoints).addTo(map); 
var wineriesPoints = L.layerGroup(wineriesGroup).addTo(map); 

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
