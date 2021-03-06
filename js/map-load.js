var mapboxKey = 'https://api.mapbox.com/styles/v1/eliasgago/cj4i5ei8s5swd2ss6awluycmx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWxpYXNnYWdvIiwiYSI6ImNqM3ZtbDlheTAwMG8zMW8wYzNocGVzcXcifQ.3Ex1pscNCyDO4Pdq3uIqLw';
var mapboxToken = 'pk.eyJ1IjoiZWxpYXNnYWdvIiwiYSI6ImNqM3ZtbDlheTAwMG8zMW8wYzNocGVzcXcifQ.3Ex1pscNCyDO4Pdq3uIqLw';
var initialPoint = [42.438862, -7.531178];
var initialZoom = 12;

var map = L.map('map').setView(initialPoint, initialZoom);

L.mask(mapMaskCoordinates).addTo(map);

L.tileLayer(mapboxKey, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    accessToken: mapboxToken
}).addTo(map);

var sidebar = L.control.sidebar('sidebar', {position: 'right'}).addTo(map);

function show(e) {
    var marker = e.target;
    var markerId = marker.options.markerId;
    var type = marker.options.type;
    sidebar.open(type);
    var newActivePane = $('#' + markerId);
    var oldActivePane = newActivePane.parent().find('.sidebar-pane-detail.active');
    oldActivePane.hide('slide', 600);
    setTimeout(function() { 
        oldActivePane.removeClass('active');
        newActivePane.show('slide', 600); 
        newActivePane.addClass('active');
    }, 620);
    $('.icon-active').removeClass('icon-active');
    $(marker._icon).addClass('icon-active');
    marker._tooltip._contentNode.className += ' tooltip-active';
    marker._tooltip.options.permanent = true;
    if(marker._tooltip._contentNode.className.indexOf(marker.options.type) < 0){
        marker._tooltip._contentNode.className += ' ' + marker.options.type;
    }
    marker.openTooltip();
    console.log(marker._tooltip);
}

function getIcon(layerGroupCode){
    if(layerGroupCode == 'viewpoints'){
        return './img/view_icon.png';
    }else if(layerGroupCode == 'sites'){
        return './img/sites_icon.png';
    }else if(layerGroupCode == 'lodgings'){
        return './img/lodgings_icon.png';
    }else if(layerGroupCode == 'wineries'){
        return './img/wineries_icon.png';
    }
}

function bindIcon(marker, mapElement) {
    var icon = L.icon({
        iconUrl: getIcon(marker.options.type),
        iconSize: [30, 30],
        iconAnchor: [20, 20],
        popupAnchor: [-3, -76]
    });

    if(mapElement.icon){
        var itselfIcon = L.icon({
            iconUrl: mapElement.icon,
            iconSize: [30, 30],
            iconAnchor: [20, 20],
            popupAnchor: [-3, -76]
        });
        marker.setIcon(itselfIcon);
    }else{
        marker.setIcon(icon);   
    }
    $(marker._icon).addClass(marker.options.type);
}

function getTooltipPositionPoint(tooltipPosition){

    var topBottomPoint = 15;
    var leftRightPoint = 20;

    var positionY = tooltipPosition;
    var offsetY;
    if(positionY == 'top'){
        offsetY = -topBottomPoint;
        leftRightPoint -= 5;
    }else if(positionY == 'bottom'){
        offsetY = topBottomPoint;
        leftRightPoint -= 5;
    }else if(positionY == 'center'){
        offsetY = 0;
    }
    var offsetX = leftRightPoint;
    return [offsetX, offsetY];
}

function bindTooltip(marker, mapElement, mapElementType) {
    var offset = [20, 0];
    if(mapElement.tooltipPosition){
        offset = getTooltipPositionPoint(mapElement.tooltipPosition);
    }
    marker.bindTooltip(mapElement.name, {
        offset: offset,
        direction: 'right'
    });
}

var viewpoints = [
    {
        "id": "viewpoints_barca",
        "name" : "A Barca",
        "tooltipPosition": "center",
        "lat": 42.4244108470418,
        "lon": -7.661574482917785
    },
    {
        "id": "viewpoints_chancis",
        "name" : "Miradoiro da Os Chancís",
        "tooltipPosition": "top",
        "lat": 42.411231108946076,
        "lon": -7.634741663932801
    },
    {
        "id": "viewpoints_cividade",
        "name" : "Miradoiro da Cividade",
        "tooltipPosition": "center",
        "lat": 42.39334215481423,
        "lon": -7.615011334419251
    },
    {
        "id": "viewpoints_boqueirino",
        "name" : "Miradoiro do Boqueiriño",
        "tooltipPosition": "center",
        "lat": 42.40393908425197,
        "lon": -7.596171498298644
    },
    {
        "id": "viewpoints_santiorxo",
        "name" : "Miradoiro de Santiorxo",
        "tooltipPosition": "center",
        "lat": 42.40786840656946,
        "lon": -7.568507194519042
    },
    {
        "id": "viewpoints_cadeiras",
        "name" : "Miradoiro de Cadeiras",
        "tooltipPosition": "center",
        "lat": 42.3976841411843,
        "lon": -7.555275857448577
    },
    {
        "id": "viewpoints_chelos",
        "name" : "Miradoiro de Os Chelos",
        "tooltipPosition": "center",
        "lat": 42.38953276520176,
        "lon": -7.517826855182647
    },
    {
        "id": "viewpoints_souto_chao",
        "name" : "Miradoiro de Souto Chao",
        "tooltipPosition": "bottom",
        "lat": 42.407500043057176,
        "lon": -7.471837699413299
    },
    {
        "id": "viewpoints_pena",
        "name" : "Miradoiro da Pena do Castelo",
        "tooltipPosition": "top",
        "lat": 42.412528216274005,
        "lon": -7.467776834964752
    },
    {
        "id": "viewpoints_siltrip",
        "name" : "SilTrip",
        "tooltipPosition": "bottom",
        "icon": "./img/siltrip_icon.png",
        "lat": 42.409381446908135,
        "lon": -7.632086277008057
    },
    {
        "id": "viewpoints_catamaran",
        "name" : "Catamarán",
        "tooltipPosition": "center",
        "icon": "./img/catamaran_icon.png",
        "lat": 42.4095794861362,
        "lon": -7.444020509719849
    }
]

var viewpointsMarkers = [];

for (var i = viewpoints.length - 1; i >= 0; i--) {
    var options = {
        markerId: viewpoints[i].id,
        type: 'viewpoints'
    };
    var marker = L.marker([viewpoints[i].lat, viewpoints[i].lon], options).addTo(map);
    bindIcon(marker, viewpoints[i]);
    bindTooltip(marker, viewpoints[i]);
    marker.setZIndexOffset(300);
    marker.on('click', show);
    viewpointsMarkers.push(marker);
}    

var sites = [
    {
        "id": "sites_turismo",
        "name" : "Oficina de Turismo",
        "tooltipPosition": "center",
        "icon": "./img/info_icon.png",
        "lat": 42.46204971576779,
        "lon": -7.587255835533141
    },
    {
        "id": "sites_xabrega",
        "name" : "Os Muiños do Xabrega",
        "tooltipPosition": "center",
        "icon": "./img/xabrega_icon.png",
        "lat": 42.41889454494551,
        "lon": -7.630434036254883
    },
    {
        "id": "sites_canabal",
        "name" : "Igrexa de San Pedro de Canabal",
        "tooltipPosition": "center",
        "icon": "./img/iglesia_icon.png",
        "lat": 42.48237788307621,
        "lon": -7.585777938365935
    },
    {
        "id": "sites_proendos",
        "name" : "Petroglifos de Proendos",
        "tooltipPosition": "center",
        "icon": "./img/proendos_icon.png",
        "lat": 42.45169217735101,
        "lon": -7.583417594432831
    },
    {
        "id": "sites_bolmente",
        "name" : "Igrexa de Santa María de Bolmente",
        "tooltipPosition": "center",
        "icon": "./img/iglesia_icon.png",
        "lat": 42.4224269349809,
        "lon": -7.589288949966431
    },
    {
        "id": "sites_pinol",
        "name" : "Igrexa de San Vicente de Pinol",
        "tooltipPosition": "bottom",
        "icon": "./img/iglesia_icon.png",
        "lat": 42.405899815164204,
        "lon": -7.549495697021484
    },
    {
        "id": "sites_gundivos",
        "name" : "Centro Oleiro Rectoral de Gundivós",
        "tooltipPosition": "center",
        "icon": "./img/gundivos_icon.png",
        "lat": 42.446261403946686,
        "lon": -7.5407034158706665
    },
    {
        "id": "sites_lobios",
        "name" : "Igrexa de San Xillao de Lobios",
        "tooltipPosition": "top",
        "icon": "./img/iglesia_icon.png",
        "lat": 42.40813774626316,
        "lon": -7.530913352966309
    }
]

var sitesMarkers = [];

for (var i = sites.length - 1; i >= 0; i--) {
    var options = {
        markerId: sites[i].id,
        type: 'sites'
    };
    var marker = L.marker([sites[i].lat, sites[i].lon], options).addTo(map);
    bindIcon(marker, sites[i]);
    bindTooltip(marker, sites[i]);
    marker.setZIndexOffset(400);
    marker.on('click', show);
    sitesMarkers.push(marker);
}   

var lodgings = [
    {
        "id": "lodgings_donatus",
        "name" : "Vila Donatus",
        "tooltipPosition": "bottom",
        "lat": 42.41389658591989,
        "lon": -7.478824853897094
    },
    {
        "id": "lodgings_corona",
        "name" : "Casa Corona",
        "tooltipPosition": "top",
        "lat": 42.45853538959867,
        "lon": -7.597963213920593
    },
    {
        "id": "lodgings_flores",
        "name" : "Casa das Flores",
        "tooltipPosition": "center",
        "lat": 42.44503822748129,
        "lon": -7.573903799057006
    },
    {
        "id": "lodgings_estevo",
        "name" : "Casa do Estevo",
        "tooltipPosition": "center",
        "lat": 42.42134783469654,
        "lon": -7.472907900810241
    },
    {
        "id": "lodgings_rio_sil",
        "name" : "Apartamentos Río Sil",
        "tooltipPosition": "bottom",
        "lat": 42.4166946207761,
        "lon": -7.597289979457854
    },
    {
        "id": "lodgings_madrina",
        "name" : "Casa da Madriña",
        "tooltipPosition": "center",
        "lat": 42.48857888524799,
        "lon": -7.574032545089722
    },
    {
        "id": "lodgings_anllo",
        "name" : "Rectoral de Anllo",
        "tooltipPosition": "center",
        "lat": 42.43931391926548,
        "lon": -7.626260519027709
    },
    {
        "id": "lodgings_rosende",
        "name" : "Casa Grande de Rosende",
        "tooltipPosition": "center",
        "lat": 42.45652089523697,
        "lon": -7.620472311973571
    },
    {
        "id": "lodgings_ruperto",
        "name" : "Casa Ruperto",
        "tooltipPosition": "top",
        "lat": 42.414728286601516,
        "lon": -7.479715347290039
    },
    {
        "id": "lodgings_solveira",
        "name" : "Casa Solveira",
        "tooltipPosition": "top",
        "lat": 42.417710436936574,
        "lon": -7.600843906402588
    }
]

var lodgingsMarkers = [];

for (var i = lodgings.length - 1; i >= 0; i--) {
    var options = {
        markerId: lodgings[i].id,
        type: 'lodgings'
    };
    var marker = L.marker([lodgings[i].lat, lodgings[i].lon], options).addTo(map);
    bindIcon(marker, lodgings[i]);
    bindTooltip(marker, lodgings[i]);
    marker.setZIndexOffset(200);
    marker.on('click', show);
    lodgingsMarkers.push(marker);
}   


var wineries = [
    {
        "id": "wineries_algueira",
        "name" : "Algueira",
        "lat": 42.41797181387165,
        "lon": -7.474597692489625
    },
    {
        "id": "wineries_lobeiras",
        "name" : "Lobeiras",
        "lat": 42.42024099511087,
        "lon": -7.579439878463744
    },
    {
        "id": "wineries_malcavada",
        "name" : "Malcavada",
        "lat": 42.45669899656409,
        "lon": -7.619297504425049
    },
    {
        "id": "wineries_marcelino",
        "name" : "Marcelino I",
        "lat": 42.439955257818234,
        "lon": -7.582336664199829
    },
    {
        "id": "wineries_proencia",
        "name" : "Proencia",
        "lat": 42.45328332060084,
        "lon": -7.588167786598205
    },
    {
        "id": "wineries_soutelo",
        "name" : "Soutelo",
        "lat": 42.42317932418995,
        "lon": -7.540912628173828
    },
    {
        "id": "wineries_petron",
        "name" : "Petrón",
        "lat": 42.41838367834631,
        "lon": -7.474393844604492
    },
    {
        "id": "wineries_rectoral",
        "name" : "Rectoral de Amandi",
        "lat": 42.39905877681099,
        "lon": -7.515850067138671
    },
    {
        "id": "wineries_cazoga",
        "name" : "Viña Cazoga",
        "lat": 42.39912215986002,
        "lon": -7.507599592208861
    },
    {
        "id": "wineries_noguedo",
        "name" : "Casa Noguedo",
        "lat": 42.407476277594995,
        "lon": -7.559446692466736
    },
    {
        "id": "wineries_sesse",
        "name" : "Castro Sesse",
        "lat": 42.483000978057134,
        "lon": -7.589557170867919
    },
    {
        "id": "lwineries_ucenza",
        "name" : "Lucenza",
        "lat": 42.441823811732505,
        "lon": -7.588908076286315
    },
    {
        "id": "wineries_estrela",
        "name" : "Estrela",
        "lat": 42.41708075166462,
        "lon": -7.519959211349487
    },
    {
        "id": "wineries_bernardino",
        "name" : "Don Bernardino",
        "lat": 42.42111221216409,
        "lon": -7.528767585754394
    },
    {
        "id": "wineries_san_xiao",
        "name" : "San Xiao",
        "lat": 42.40705245867436,
        "lon": -7.530033588409423
    },
    {
        "id": "wineries_frieira",
        "name" : "Viña A Frieira",
        "lat": 42.418565848308745,
        "lon": -7.5054484605789185
    },
    {
        "id": "wineries_cichon",
        "name" : "Viña Cichón",
        "lat": 42.41423322800066,
        "lon": -7.48068630695343
    },
    {
        "id": "wineries_cruceiro",
        "name" : "Cruceiro",
        "lat": 42.41749658227026,
        "lon": -7.504348754882812
    },
    {
        "id": "wineries_anzio",
        "name" : "Anzio",
        "lat": 42.41423322800066,
        "lon": -7.48068630695343
    },
    {
        "id": "wineries_barbado",
        "name" : "Barbado",
        "lat": 42.453378312949006,
        "lon": -7.585823535919189
    },
    {
        "id": "wineries_gullufre",
        "name" : "Gullufre",
        "lat": 42.40739309840652,
        "lon": -7.533617019653319
    },
    {
        "id": "wineries_regoa",
        "name" : "Régoa",
        "lat": 42.3964600166767,
        "lon": -7.550182342529296
    },
    {
        "id": "wineries_rectoral_gundivos",
        "name" : "Rectoral de Gundivós",
        "lat": 42.41701738675883,
        "lon": -7.5199806690216064
    },
    {
        "id": "wineries_regina",
        "name" : "Regina Viarum",
        "lat": 42.40862295088143,
        "lon": -7.476593255996704
    },
    {
        "id": "wineries_decima",
        "name" : "Décima",
        "lat": 42.419306403359556,
        "lon": -7.501140832901
    },
    {
        "id": "wineries_val_de_lenda",
        "name" : "Val de Lenda",
        "lat": 42.40719505227568,
        "lon": -7.513527274131775
    },
    {
        "id": "wineries_peon",
        "name" : "Viña Peón",
        "lat": 42.42992666380791,
        "lon": -7.570309638977051
    },
    {
        "id": "wineries_regueiral",
        "name" : "Viña Regueiral",
        "lat": 42.420767686867336,
        "lon": -7.58104920387268
    },
    {
        "id": "wineries_guimaro",
        "name" : "Guímaro",
        "lat": 42.42975244586277,
        "lon": -7.51813530921936
    },
    {
        "id": "wineries_tear",
        "name" : "Tear",
        "lat": 42.43259926477228,
        "lon": -7.572535872459411
    },
    {
        "id": "wineries_baldomero",
        "name" : "Baldomero",
        "lat": 42.409634937008036,
        "lon": -7.520511746406556
    },
    {
        "id": "wineries_cividade",
        "name" : "Cividade",
        "lat": 42.41473620750738,
        "lon": -7.590157985687256
    },
    {
        "id": "wineries_mezquita",
        "name" : "Mezquita",
        "lat": 42.4125777236558,
        "lon": -7.509214282035828
    }
];

var wineriesMarkers = [];

for (var i = wineries.length - 1; i >= 0; i--) {
    var options = {
        markerId: wineries[i].id,
        type: 'wineries'
    };
    var marker = L.marker([wineries[i].lat, wineries[i].lon], options).addTo(map);
    bindIcon(marker, wineries[i]);
    bindTooltip(marker, wineries[i]);
    marker.setZIndexOffset(100);
    marker.on('click', show);
    wineriesMarkers.push(marker);
}   

var viewpointsLayer = L.layerGroup(viewpointsMarkers).addTo(map); 
var sitesLayer = L.layerGroup(sitesMarkers).addTo(map); 
var lodgingsLayer = L.layerGroup(lodgingsMarkers).addTo(map); 
var wineriesLayer = L.layerGroup(wineriesMarkers).addTo(map); 
map.removeLayer(wineriesLayer);

var markers = viewpointsMarkers.concat(sitesMarkers).concat(lodgingsMarkers).concat(wineriesMarkers);

// marker.bindPopup("<b>Miradoiro da Cividade!</b><br>Vaia vistas!");

function findMarker(id) {
    id = id.substring(1, id.length);
    for (var i = markers.length - 1; i >= 0; i--) {
        if(markers[i].options.markerId == id){
            return markers[i];
        }
    }
}

function find(id) {
    for (var i = viewpoints.length - 1; i >= 0; i--) {
        if(viewpoints[i].id == id){
            return viewpoints[i];
        }
    }
    for (var i = sites.length - 1; i >= 0; i--) {
        if(sites[i].id == id){
            return sites[i];
        }
    }
    for (var i = lodgings.length - 1; i >= 0; i--) {
        if(lodgings[i].id == id){
            return lodgings[i];
        }
    }
    for (var i = wineries.length - 1; i >= 0; i--) {
        if(wineries[i].id == id){
            return wineries[i];
        }
    }
}

var route = null;
function showRoute(destinationId) {
    var destination = find(destinationId);
    if(route){
        map.removeControl(route);   
    }
    route = L.Routing.control({
      waypoints: [
        L.latLng(42.46175290530536, -7.587263882160186),
        L.latLng(destination.lat, destination.lon)
      ],
      language: 'es'
    });
    route.addTo(map);
}

var MAX_VISIBLE_ITEMS_ZOOM_LEVEL = 12;

map.on('zoomend', function() {
    if (map.getZoom() < MAX_VISIBLE_ITEMS_ZOOM_LEVEL){
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
    if (map.getZoom() >= MAX_VISIBLE_ITEMS_ZOOM_LEVEL){
        if (!map.hasLayer(viewpointsLayer) && isLayerVisible('viewpoints')){
            map.addLayer(viewpointsLayer);
        }
        if (!map.hasLayer(sitesLayer) && isLayerVisible('sites')){
            map.addLayer(sitesLayer);
        }
        if (!map.hasLayer(lodgingsLayer) && isLayerVisible('lodgings')){
            map.addLayer(lodgingsLayer);
        }
        if (!map.hasLayer(wineriesLayer) && isLayerVisible('wineries')){
            map.addLayer(wineriesLayer);
        }
    }
});

var visibleLayers = ['viewpoints', 'sites', 'lodgings'];

function isLayerVisible(layerGroupCode) {
    return visibleLayers.indexOf(layerGroupCode) >= 0;
}

function addVisibleLayer(layerGroupCode) {
    if(!isLayerVisible(layerGroupCode)){
        visibleLayers.push(layerGroupCode);
    }
}

function removeVisibleLayer(layerGroupCode) {
    var index = visibleLayers.indexOf(layerGroupCode);
    if(index >= 0) {
        visibleLayers.splice(index, 1);
    }
}

function getLayerGroup(layerGroupCode){
    if(layerGroupCode == 'viewpoints'){
        return viewpointsLayer;
    }else if(layerGroupCode == 'sites'){
        return sitesLayer;
    }else if(layerGroupCode == 'lodgings'){
        return lodgingsLayer;
    }else if(layerGroupCode == 'wineries'){
        return wineriesLayer;
    }
}

var switchableOptions = {
    click: function(event, layerGroupCode, isChecked){
        var layerGroup = getLayerGroup(layerGroupCode);
        if(layerGroup){
            if(isChecked){
                addVisibleLayer(layerGroupCode);
            }else{
                removeVisibleLayer(layerGroupCode);
            }
            if (map.hasLayer(layerGroup)) {
                map.removeLayer(layerGroup);
            }else if(isLayerVisible(layerGroupCode) && isChecked && map.getZoom() >= MAX_VISIBLE_ITEMS_ZOOM_LEVEL){
                map.addLayer(layerGroup);
            }
        }
    }
}

var currentVisibleTab = null;

$(document).ready(function(){
    $('#show_viewpoints').switchable(switchableOptions);
    $('#show_sites').switchable(switchableOptions);
    $('#show_lodgings').switchable(switchableOptions);
    $('#show_wineries').switchable(switchableOptions);

    $('a[role=tab]').on('click', function(e){
        var eventTab = e.currentTarget.getAttribute('id');
        var sidebarOpen = false;
        if(eventTab == currentVisibleTab){
            oldVisibleTab = currentVisibleTab;
            currentVisibleTab = null;
        }else{
            oldVisibleTab = currentVisibleTab;
            currentVisibleTab = eventTab;
            sidebarOpen = true;
        }
        if(currentVisibleTab){
            var layerGroupCodeToOpen = currentVisibleTab.replace('_tab', '');
            var layerGroupToOpen = getLayerGroup(layerGroupCodeToOpen);
            if(layerGroupToOpen){
                layerGroupToOpen.eachLayer(function(layer) {
                    layer.openTooltip();
                    if(layer._tooltip._contentNode.className.indexOf(layerGroupCodeToOpen) < 0){
                        layer._tooltip._contentNode.className += ' ' + layerGroupCodeToOpen;
                    }
                });
            }
        }
        if(oldVisibleTab){
            var layerGroupCodeToClose = oldVisibleTab.replace('_tab', '');
            var layerGroupToClose = getLayerGroup(layerGroupCodeToClose);
            if(layerGroupToClose){
                layerGroupToClose.eachLayer(function(layer) {
                    layer.closeTooltip();
                });
            }
        }
    });

    $('.img-icon a').on('mouseover', function(e){
        var elementId = e.currentTarget.getAttribute("href");
        $('.icon-active').removeClass('icon-active');
        $('.tooltip-active').removeClass('tooltip-active');
        var marker = findMarker(elementId);
        $(marker._icon).addClass('icon-active');
        marker._tooltip._contentNode.className += ' tooltip-active';
        console.log(elementId);
    });


    $(document).on("click", ".link", function (e) {
        //marker.setIcon(myIcon2);
        var id = e.currentTarget.getAttribute("href");
        var newActivePane = $(id);
        var oldActivePane = $(id).parent().find('.sidebar-pane-detail.active');
        oldActivePane.hide('slide', 400);
        setTimeout(function() { 
            oldActivePane.removeClass('active');
            newActivePane.show('slide', 600); 
            newActivePane.addClass('active');
        }, 420);
        $('.icon-active').removeClass('icon-active');
        var marker = findMarker(id);
        $(marker._icon).addClass('icon-active');
        marker.openTooltip();
        //marker._icon.classList.add("className");
    });

});

