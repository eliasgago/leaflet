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

var viewpointsIcon = L.icon({
    iconUrl: './img/view_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76]
});

var viewpointsMarkers = [];

for (var i = viewpoints.length - 1; i >= 0; i--) {
    var options = {
        markerId: 'viewpoints_' + viewpoints[i].id,
        type: 'viewpoints',
        title: viewpoints[i].name
    };
    var marker = L.marker([viewpoints[i].lat, viewpoints[i].lon], options).addTo(map);
    marker.setIcon(viewpointsIcon);
    marker.setZIndexOffset(300);
    marker.on('click', show);
    viewpointsMarkers.push(marker);
}    

var sites = [
    {
        "name" : "Oficina de Turismo",
        "icon": "./img/info_icon.png",
        "lat": 42.46204971576779,
        "lon": -7.587255835533141
    },
    {
        "name" : "SilTrip",
        "icon": "./img/siltrip_icon.png",
        "lat": 42.409381446908135,
        "lon": -7.632086277008057
    },
    {
        "name" : "Catamarán",
        "icon": "./img/catamaran_icon.png",
        "lat": 42.4095794861362,
        "lon": -7.444020509719849
    },
    {
        "name" : "Os Muiños do Xabrega",
        "icon": "./img/xabrega_icon.png",
        "lat": 42.41889454494551,
        "lon": -7.630434036254883
    },
    {
        "id": "proendos",
        "name" : "Petroglifos de Proendos",
        "icon": "./img/proendos_icon.png",
        "lat": 42.452262143758645,
        "lon": -7.586199045181274
    },
    {
        "name" : "Centro Oleiro Rectoral de Gundivós",
        "icon": "./img/gundivos_icon.png",
        "lat": 42.446261403946686,
        "lon": -7.5407034158706665
    },
    {
        "name" : "Igrexa de San Xillao de Lobios",
        "icon": "./img/lobios_icon.png",
        "lat": 42.40813774626316,
        "lon": -7.530913352966309
    }
]

var sitesIcon = L.icon({
    iconUrl: './img/sites_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76]
});

var sitesMarkers = [];

for (var i = sites.length - 1; i >= 0; i--) {
    var options = {
        markerId: 'sites_' + sites[i].id,
        type: 'sites',
        title: sites[i].name
    };
    var marker = L.marker([sites[i].lat, sites[i].lon], options).addTo(map);
    if(sites[i].icon){
        var itselfIcon = L.icon({
            iconUrl: sites[i].icon,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            popupAnchor: [-3, -76]
        });
        marker.setIcon(itselfIcon);
    }else{
        marker.setIcon(sitesIcon);   
    }
    marker.setZIndexOffset(400);
    marker.on('click', show);
    sitesMarkers.push(marker);
}   

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

var lodgingsIcon = L.icon({
    iconUrl: './img/lodgings_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76]
});

var lodgingsMarkers = [];

for (var i = lodgings.length - 1; i >= 0; i--) {
    var options = {
        markerId: 'lodgings_' + lodgings[i].id,
        type: 'lodgings',
        title: lodgings[i].name
    };
    var marker = L.marker([lodgings[i].lat, lodgings[i].lon], options).addTo(map);
    marker.setIcon(lodgingsIcon);
    marker.setZIndexOffset(200);
    marker.on('click', show);
    lodgingsMarkers.push(marker);
}   


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
    },
    {
        "id": "frieira",
        "name" : "Viña A Frieira",
        "lat": 42.418565848308745,
        "lon": -7.5054484605789185
    },
    {
        "id": "cichon",
        "name" : "Viña Cichón",
        "lat": 42.41423322800066,
        "lon": -7.48068630695343
    },
    {
        "id": "cruceiro",
        "name" : "Cruceiro",
        "lat": 42.41749658227026,
        "lon": -7.504348754882812
    },
    {
        "id": "anzio",
        "name" : "Anzio",
        "lat": 42.41423322800066,
        "lon": -7.48068630695343
    },
    {
        "id": "barbado",
        "name" : "Barbado",
        "lat": 42.453378312949006,
        "lon": -7.585823535919189
    },
    {
        "id": "gullufre",
        "name" : "Gullufre",
        "lat": 42.40739309840652,
        "lon": -7.533617019653319
    },
    {
        "id": "regoa",
        "name" : "Régoa",
        "lat": 42.3964600166767,
        "lon": -7.550182342529296
    },
    {
        "id": "rectoral_gundivos",
        "name" : "Rectoral de Gundivós",
        "lat": 42.41701738675883,
        "lon": -7.5199806690216064
    },
    {
        "id": "regina",
        "name" : "Regina Viarum",
        "lat": 42.40862295088143,
        "lon": -7.476593255996704
    },
    {
        "id": "decima",
        "name" : "Décima",
        "lat": 42.419306403359556,
        "lon": -7.501140832901
    },
    {
        "id": "val_de_lenda",
        "name" : "Val de Lenda",
        "lat": 42.40719505227568,
        "lon": -7.513527274131775
    },
    {
        "id": "peon",
        "name" : "Viña Peón",
        "lat": 42.42992666380791,
        "lon": -7.570309638977051
    },
    {
        "id": "regueiral",
        "name" : "Viña Regueiral",
        "lat": 42.420767686867336,
        "lon": -7.58104920387268
    },
    {
        "id": "guimaro",
        "name" : "Guímaro",
        "lat": 42.42975244586277,
        "lon": -7.51813530921936
    },
    {
        "id": "tear",
        "name" : "Tear",
        "lat": 42.43259926477228,
        "lon": -7.572535872459411
    },
    {
        "id": "baldomero",
        "name" : "Baldomero",
        "lat": 42.409634937008036,
        "lon": -7.520511746406556
    },
    {
        "id": "cividade",
        "name" : "Cividade",
        "lat": 42.41473620750738,
        "lon": -7.590157985687256
    },
    {
        "id": "mezquita",
        "name" : "Mezquita",
        "lat": 42.4125777236558,
        "lon": -7.509214282035828
    }
];

var wineriesIcon = L.icon({
    iconUrl: './img/wineries_icon.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [-3, -76]
});

var wineriesMarkers = [];

for (var i = wineries.length - 1; i >= 0; i--) {
    var options = {
        markerId: 'wineries_' + wineries[i].id,
        type: 'wineries',
        title: wineries[i].name
    };
    var marker = L.marker([wineries[i].lat, wineries[i].lon], options).addTo(map);
    marker.setIcon(wineriesIcon);
    marker.setZIndexOffset(100);
    marker.on('click', show);
    wineriesMarkers.push(marker);
}   

var viewpointsLayer = L.layerGroup(viewpointsMarkers).addTo(map); 
var sitesLayer = L.layerGroup(sitesMarkers).addTo(map); 
var lodgingsLayer = L.layerGroup(lodgingsMarkers).addTo(map); 
var wineriesLayer = L.layerGroup(wineriesMarkers).addTo(map); 
map.removeLayer(wineriesLayer);

map.on('zoomend', function() {
    console.log(map.getZoom());
    if (map.getZoom() <12){
        if (map.hasLayer(viewpointsLayer)) {
            map.removeLayer(viewpointsLayer);
        }
        if (map.hasLayer(sitesLayer)) {
            map.removeLayer(sitesLayer);
        }
        if (map.hasLayer(lodgingsLayer)) {
            map.removeLayer(lodgingsLayer);
        }
        if (map.hasLayer(wineriesLayer)) {
            map.removeLayer(wineriesLayer);
        }
    }
    if (map.getZoom() >= 12){
        if (!map.hasLayer(viewpointsLayer)){
            map.addLayer(viewpointsLayer);
        }
        if (!map.hasLayer(sitesLayer)){
            map.addLayer(sitesLayer);
        }
        if (!map.hasLayer(lodgingsLayer)){
            map.addLayer(lodgingsLayer);
        }
        if (!map.hasLayer(wineriesLayer)){
            map.addLayer(wineriesLayer);
        }
    }
});


// marker.bindPopup("<b>Miradoiro da Cividade!</b><br>Vaia vistas!");

function showRoute() {
    L.Routing.control({
      waypoints: [
        L.latLng(42.46175290530536, -7.587263882160186),
        L.latLng(42.40786840656946, -7.568507194519042)
      ],
      language: 'es'
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

var switchableOptions = {
    click: function(event, code, isChecked){
        var layerGroup = null;
        if(code == 'viewpoints'){
            layerGroup = viewpointsLayer;
        }else if(code == 'sites'){
            layerGroup = sitesLayer;
        }else if(code == 'lodgings'){
            layerGroup = lodgingsLayer;
        }else if(code == 'wineries'){
            layerGroup = wineriesLayer;
        }
        if(layerGroup){
            if (map.hasLayer(layerGroup)) {
                map.removeLayer(layerGroup);
            }else{
                map.addLayer(layerGroup);
            }
        }
    }
}

$(document).ready(function(){
    $('#show_viewpoints').switchable(switchableOptions);
    $('#show_sites').switchable(switchableOptions);
    $('#show_lodgings').switchable(switchableOptions);
    $('#show_wineries').switchable(switchableOptions);
});

