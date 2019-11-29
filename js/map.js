//Leaflet configuration javascript file
//Luc Clément	

//	Elevation statistics global variables
var dplus;
var dmoins;

var isDisplayed = true;


//	LatLng to center the map
var saintCouat = [42.996200, 2.107704];
//	LEAFLET Map Object
var map = L.map('map', {
    zoomControl: true,
    maxZoom: 20
}); // .setView(saintCouat, 6);
if (L.Browser.mobile) {
    map.removeControl(map.zoomControl);
}
var bounds_group = new L.featureGroup([]);

function setBounds() {
    if (bounds_group.getLayers().length) {
        map.fitBounds(bounds_group.getBounds());
    }
}

//	BASEMAPS LAYERS

//	1.	MapBox Outdoors (Topo)
var mapBox = L.tileLayer('http://{s}.tiles.mapbox.com/v4/matt.f714d988/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {
    maxZoom: 21
}).addTo(map);

var mpO = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {
    maxZoom: 21
});

//	2. IGN France Topo Scan express classique WMTS
var ignApiKey = "uysc5plwe5d5vezt4dvze1l5";
var scanWmtsUrl = "http://wxs.ign.fr/" + ignApiKey + "/wmts?LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&EXCEPTIONS=text/xml&FORMAT=image/jpeg&SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&STYLE=normal&TILEMATRIXSET=PM&&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}";
var basemap1 = L.tileLayer(scanWmtsUrl, {
    attribution: ''
});

//	3. IGN EspaÃ±a Mapa Raster WMS
var MTN = L.tileLayer.wms("http://www.ign.es/wms-inspire/mapa-raster?", {
    layers: 'mtn_rasterizado', // Capa o capas separadas por coma. Consultar los metadatos del servicio
    format: 'image/png',
    transparent: true,
    maxZoom: 20
    // attribution: '<a href="http://www.ign.es/ign/main/index.do" target="_blank">Â© Instituto GeogrÃ¡fico Nacional de EspaÃ±a</a>',
});

//	4.	Google Street
var googleLayer = L.tileLayer('http://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

//	5.	Google Satellite
var satelite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

//	6.	Google Relief
var reliefLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

//	7.	Cyclemap OSM
var osmBike = L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=2ef599d239a34da9ba2e91cd3e33a269', {
    maxZoom: 18
});

//	8.	Hongrie IGN
var hongrie = L.tileLayer('http://terkep.turistautak.hu/tiles/turistautak-domborzattal/{z}/{x}/{y}.png', {
    maxZoom: 17
});

//	9.	Slovaquie
var slovaquie = L.tileLayer('http://t{s}.freemap.sk/T/{z}/{x}/{y}.png', {});

//	10.	Autriche
var austria = L.tileLayer('http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png', {
    format: 'image/png',
    maxZoom: 19,
    subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4']
});

//	11.	Norvège
var norvege = L.tileLayer('http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=toporaster3&zoom={z}&x={x}&y={y}', {
    maxZoom: 17
});

//	12.	Suede
// var suede = L.tileLayer.wmts('https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/64a0ae63-35dd-3eed-aa75-97e6d2093f1e/?request=getcapabilities&service=wmts', {
// layer: 'topowebb',
// tilematrixSet: '3857',
// format: 'image/png',
// style: 'default',
// uppercase: true,
// transparent: true,
// continuousWorld : true,
// opacity: 1.0
// });

//	13.	Croatie topo
var croatie = L.tileLayer.wms("http://geoportal.dgu.hr/services/tk/wms", {
    layers: 'TK25',
    format: 'image/jpeg'
});

//	14.	Belgique topo
var belgique = L.tileLayer('http://www.ngi.be/cartoweb/1.0.0/topo/default/3857/{z}/{y}/{x}.png', {
    maxZoom: 18
});

//	15.	Suède topo
var apiKey = "64a0ae63-35dd-3eed-aa75-97e6d2093f1e";
var suede = new L.TileLayer(`https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/${apiKey}/1.0.0/topowebb/default/3857/{z}/{y}/{x}.png`, {
    maxZoom: 17,
    minZoom: 0,
    continuousWorld: true,
    attribution: '&copy; <a href="https://www.lantmateriet.se/en/">Lantmäteriet</a> Topografisk Webbkarta Visning, CCB',
});


//	16. Thunderforest Outdoors
var bm0 = L.tileLayer('https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=2ef599d239a34da9ba2e91cd3e33a269', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 28
});


//	16.	Waymarked Trails VTT
var wayMtb = L.tileLayer('http://tile.waymarkedtrails.org/mtb/{z}/{x}/{y}.png', {
    format: 'image/png',
    transparent: true,
    maxZoom: 17
});
var topoMtb = L.layerGroup([wayMtb]);

//	17.	Waymarked Trails Route
var wayCyc = L.tileLayer('http://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
    format: 'image/png',
    transparent: true,
    maxZoom: 17
});
var topoCyc = L.layerGroup([wayCyc]);


//	ELEVATION CONTROL CUSTOMIZATION
//	same options in js/elevation/Leaflet.Elevation-0.0.2.min.js
//	all used options are the default values
var el = L.control.elevation({
    position: "bottomright",
    theme: "steelblue-theme", //default: lime-theme
    width: 600,
    height: 130,
    margins: {
        top: 40,
        right: 30,
        bottom: 5,
        left: 50
    },
    useHeightIndicator: true, //if false a marker is drawn at map position
    interpolation: "linear", //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
    hoverNumber: {
        decimalsX: 2, //decimals on distance (always in km)
        decimalsY: 0, //deciamls on hehttps://www.npmjs.com/package/leaflet.coordinatesight (always in m)
        formatter: undefined //custom formatter function may be injected
    },
    xTicks: undefined, //number of ticks in x axis, calculated by default according to width
    yTicks: undefined, //number of ticks on y axis, calculated by default according to height
    collapsed: false,  //collapsed mode, show chart on click or mouseover
    imperial: false    //display imperial units instead of metric

});

//	Add elevation-profile to map
el.addTo(map);

//	Toggle elevation profile function
function toggleEl() {
    if ($('.leaflet-control.elevation').not('visible')) {
        $('.leaflet-control.elevation').fadeIn('fast');
        isDisplayed = true;
    }
    isDisplayed = false;

}

//	Add data to elevation profile control
function addData(e) {
    var el = L.control.elevation();
    el.addData(e);
    map.addControl(el);
}


//	1.	Manosque - Cavaillon
//	2.	Cavaillon - Aix
var tabCouleurs = ["#ff3135", "#009b2e", "#ce06cb", "#3399ff", "#2d867c", "#9c3030", "#00c2d8", "#ff3135", "#009b2e", "#ce06cb", "#3399ff", "#2d867c", "#9c3030", "#00c2d8", "#ff3135", "#009b2e", "#ce06cb", "#3399ff", "#2d867c", "#9c3030", "#00c2d8", "#ff3135", "#009b2e", "#ce06cb", "#3399ff", "#2d867c", "#9c3030", "#00c2d8"];


// 		LAYER CLICK ACTIONS:
//			-change profile color,
//			-display elevation profile
//			-add elevation profile title div

function onEachFeature(feature, layer) {
    layer.on('click', function (e) {
        $('.area').css('fill', tabCouleurs[feature.properties.id - 1]);
        map.fitBounds(layer.getBounds());
        toggleEl();
        el.clear();
        el.addData(feature);
        $('<span id="titre">' + feature.properties.name + '</span>').appendTo('.leaflet-control.elevation');
        $('<span class="dl-link">' + feature.properties.desc + '</span>').appendTo('.leaflet-control.elevation');

    });
}

//	LAYER STYLE
//	1. Visible track style
function style(feature) {
    for (var i = 0; i < tabCouleurs.length; i++) {


        return {
            color: tabCouleurs[feature.properties.id - 1],
            weight: 3,
            opacity: 1
        };

    }
}

//	2. Large transparent track style (mobile use)
function large(feature) {
    for (var i = 0; i < tabCouleurs.length; i++) {


        return {
            color: "rgba(255,255,255, 0.01)",
            weight: 10,
            opacity: 1
        };

    }
}

/*      COUCHES GEOJSON
        Traces déjà faites
*/

//	01 Aix - Cannes
var aixCannes = L.geoJson(aixCan, {
    onEachFeature: onEachFeature,
    style: style
});
//aixCannes.addTo(map);

//	02 Bordeaux - Moissac
var bdxMoissac = L.geoJson(bdxMois, {
    onEachFeature: onEachFeature,
    style: style
});
//bdxMoissac.addTo(map);

//	03 Blan - Sarlat
var revelSarlat = L.geoJson(blanSarlat, {
    onEachFeature: onEachFeature,
    style: style
});
//revelSarlat.addTo(map);

//	04 Briancon - Aix
var brianconAix = L.geoJson(briAix, {
    onEachFeature: onEachFeature,
    style: style
});
//brianconAix.addTo(map);

// 05 Chemin navarrais
var cheminNav = L.geoJson(chemNav, {
    onEachFeature: onEachFeature,
    style: style
});
//cheminNav.addTo(map);

//  06 Danemark
var dkRoller = L.geoJson(danemark, {
    onEachFeature: onEachFeature,
    style: style
});
//dkRoller.addTo(map);

// 07 gtmc
var gtMassifC = L.geoJson(gtmc, {
    onEachFeature: onEachFeature,
    style: style
});
//gtMassifC.addTo(map);

// 08 gtmn
var gtMtnNoir = L.geoJson(gtmn, {
    onEachFeature: onEachFeature,
    style: style
});
//gtMtnNoir.addTo(map);

// 09 Hendaye - San Sebastian
var hendonosti = L.geoJson(hendSanSeb, {
    onEachFeature: onEachFeature,
    style: style
});
//hendonosti.addTo(map);

// 10 Lyon - Aix
var lyonAixPce = L.geoJson(lyonAix, {
    onEachFeature: onEachFeature,
    style: style
});
//lyonAixPce.addTo(map);

// 11 Lyon - Bordeaux
var lyonBordeaux = L.geoJson(lyonbdx, {
    onEachFeature: onEachFeature,
    style: style
});
//lyonBordeaux.addTo(map);

// 12 Nantes - Hendaye
var nantesHend = L.geoJson(nantHend, {
    onEachFeature: onEachFeature,
    style: style
});
//nantesHend.addTo(map);

// 13 Revel - Aix
var revAix = L.geoJson(revelAix, {
    onEachFeature: onEachFeature,
    style: style
});
//revAix.addTo(map);

// 14 Souston - St Jean-Pied-de-Port
var soustons = L.geoJson(sousPiePor, {
    onEachFeature: onEachFeature,
    style: style
});
//soustons.addTo(map);

// 15 Strasbourg - Saint-Petersbourg
var strasbSankt = L.geoJson(strasStPet, {
    onEachFeature: onEachFeature,
    style: style
});
//strasbSankt.addTo(map);

// 16 Toulouse - Miranda de Ebro
var toulMir = L.geoJson(tlseMirEbro, {
    onEachFeature: onEachFeature,
    style: style
});
//toulMir.addTo(map);

// 17 Lisbonne - Santiago
var lisSantiago = L.geoJson(lisSant, {
    onEachFeature: onEachFeature,
    style: style
});
//lisSantiago.addTo(map);

/*
        COUCHES GEOJSON
        Programme 2020
*/

//	01 Gerone - Ayamonte
var geroAya = L.geoJson(giroAya, {
    onEachFeature: onEachFeature,
    style: style
});
//geroAya.addTo(map);

// 02 Luxembourg - Lyon
var luxembourg = L.geoJson(luxLyon, {
    onEachFeature: onEachFeature,
    style: style
});
//luxembourg.addTo(map);

//	03 Madrid - Lisbonne
var madLis = L.geoJson(madridLisb, {
    onEachFeature: onEachFeature,
    style: style
});
//madLis.addTo(map);

// 04 Nantes - Strasbourg
var nantesStras = L.geoJson(nanStras, {
    onEachFeature: onEachFeature,
    style: style
});
//nantesStras.addTo(map);

// 05 Paris - revel
var parisRev = new L.geoJson(parisRevel, {
    onEachFeature: onEachFeature,
    style: style
});
//parisRev.addTo(map);

//	06 Toulouse - Béziers
var tlseBez = L.geoJson(tlseBeziers, {
    onEachFeature: onEachFeature,
    style: style
});
//tlseBez.addTo(map);

/*
		COUCHES GEOJSON
		Projets
*/
// 01 Nantes - Hambourg
var nantHamb = L.geoJson(nanthambourg, {
    onEachFeature: onEachFeature,
    style: style
});
//nantHamb.addTo(map);

// 02 Mulhouse - Istanbul
var mulhouse = new L.geoJson(mulhIstanbul, {
    onEachFeature: onEachFeature,
    style: style
});
//mulhouse.addTo(map);

// 03  Cap Nord
var capeNord = L.geoJson(capNord, {
    onEachFeature: onEachFeature,
    style: style
});
//capeNord.addTo(map);

/*
    LAYER GROUPS
*/

var overLayers = {
    label: 'overlays',
    noShow: true,
    children: [
        {
            label: '  2020',
            collapsed: false,
            selectAllCheckbox: true,
            children: [
                {
                    label: 'Paris - revel',
                    layer: parisRev
                },
                {
                    label: 'Luxembourg - Lyon',
                    layer: luxembourg
                },
                {
                    label: 'Nantes - Strasbourg',
                    layer: nantesStras
                },
                {
                    label: 'Girona - Ayamonte',
                    layer: geroAya
                },
                {
                    label: 'Madrid - Lisbonne',
                    layer: madLis
                },
                {
                    label: 'Toulouse - Béziers',
                    layer: tlseBez
                }
            ]
        },
        {
            label: '> 2020',
            collapsed: true,
            selectAllCheckbox: true,
            children: [
                {
                    label: 'Nantes - Hambourg',
                    layer: nantHamb
                },
                {
                    label: 'Bale - Istanbul',
                    layer: mulhouse
                },
                {
                    label: 'Cap Nord',
                    layer: capeNord
                }
            ]
        },
        {
            label: '< 2020',
            collapsed: true,
            selectAllCheckbox: true,
            children: [
                {
                    label: 'Aix-Cannes',
                    layer: aixCannes
                },
                {
                    label: 'Bordeaux - Moissac',
                    layer: bdxMoissac
                },
                {
                    label: 'Revel - Sarlat',
                    layer: revelSarlat
                },
                {
                    label: 'Briancon - Aix',
                    layer: brianconAix
                },
                {
                    label: 'Chemin Navarrais',
                    layer: cheminNav
                },
                {
                    label: 'Danemark en roller',
                    layer: dkRoller
                },
                {
                    label: 'GTMC',
                    layer: gtMassifC
                },
                {
                    label: 'GTMN',
                    layer: gtMtnNoir
                },
                {
                    label: 'Hendaye - Donosti',
                    layer: hendonosti
                },
                {
                    label: 'Lyon - Aix',
                    layer: lyonAixPce
                },
                {
                    label: 'Lyon - Bordeaux',
                    layer: lyonBordeaux
                },
                {
                    label: 'Nantes - Hendaye',
                    layer: nantesHend
                },
                {
                    label: 'Revel - Aix',
                    layer: revAix
                },
                {
                    label: 'Soustons - St Jean',
                    layer: soustons
                },
                {
                    label: 'Strasbourg - St Pétersbourg',
                    layer: strasbSankt
                },
                {
                    label: 'Toulouse - Miranda de Ebro',
                    layer: toulMir
                },
                {
                    label: 'Lisbonne - Santiago',
                    layer: lisSantiago
                }
            ]
        }
    ]
};
// Basemaps are radios
var baseLayers = {
    label: 'BaseLayers',
    noShow: true,
    children: [
        {
            label: 'Cartes',
            collapsed: true,
            children: [
                {
                    label: 'Mapbox Outdoors',
                    layer: mapBox
                },
                {
                    label: 'Street',
                    layer: googleLayer
                },
                {
                    label: 'Satellite',
                    layer: satelite
                },
                {
                    label: 'Relief',
                    layer: reliefLayer
                },
                {
                    label: 'OSM Cycle',
                    layer: osmBike
                },
                {
                    label: 'Waymarked Trails MTB',
                    layer: wayMtb
                },
                {
                    label: 'Waymarked Trails Cycle',
                    layer: wayCyc
                }
            ]
        },
        {
            label: 'Pays',
            collapsed: true,
            children: [
                {
                    label: 'France',
                    layer: basemap1
                },
                {
                    label: 'Espagne',
                    layer: MTN
                },
                {
                    label: 'Hongrie',
                    layer: hongrie
                },
                {
                    label: 'Slovaquie',
                    layer: slovaquie
                },
                {
                    label: 'Autriche',
                    layer: austria
                },
                {
                    label: 'Norvège',
                    layer: norvege
                },
                {
                    label: 'Belgique',
                    layer: belgique
                },
                {
                    label: 'Suède',
                    layer: suede
                },
                {
                    label: 'Croatie',
                    layer: croatie
                }
            ]
        }
    ]
};
//};

//		Panel Layers
var lay = L.control.layers.tree(baseLayers, overLayers,
    {
        namedToggle: false,
        collapseAll: 'Collapse all',
        expandAll: 'Expand all',
        collapsed: true,
    });

lay.addTo(map).collapseTree().expandSelected().collapseTree(true);

//	Add Scale control to map
L.control.scale({imperial: false}).addTo(map);

//	MAP EVENTS
//  On load
map.doubleClickZoom.disable();

bounds_group.addLayer(lisSantiago);
bounds_group.addLayer(capeNord);
setBounds();


//	Adjust map to fit layer clicked
/*function onselect(feature, layer) {
    layer.on('overlayadd', onOverlayAdd);

    function onOverlayAdd(e) {
        map.fitBounds(layer.getBounds());
    }
}*/


function toggleMapboxLayer() {
    if (!map.hasLayer(mpO) && (map.hasLayer(wayCyc) || map.hasLayer(wayMtb))) {
        mpO.addTo(map);
    } else if (map.hasLayer(mpO) && !map.hasLayer(wayCyc) && !map.hasLayer(wayMtb)) {
        map.removeLayer(mpO);
    }
}

$(document).ready(function () {

    $('.leaflet-control.elevation').hide();

    //	Load Close Button Elevation Profile
    $('<span class="elClose" id="elClose"><i class="fa fa-window-close" aria-hidden="true"></i></span>').appendTo('.leaflet-control.elevation');

    //	Close button action with Jquery
    $('#elClose').click(function () {
        $('.leaflet-control.elevation').fadeOut('fast');
        $("#elClose").blur();
    });

    /*
        $('.leaflet-panel-layers-base').click(function () {
            toggleMapboxLayer();
        });
    */

    //	On click
    map.on('click', function (e) {
        $('.leaflet-control.elevation').fadeOut('fast');
    });
    var titleDivs = $('.leaflet-layerstree-header-pointer').find('.leaflet-layerstree-header-name');
    $(titleDivs).css("font-weight", "Bold");
    $('.leaflet-control-layers-base').prepend('<div id="baseCollExp"></div>');
    $('.leaflet-control-layers-base').find('.leaflet-layerstree-expand-collapse').addClass('layers-actions');
    $('.leaflet-control-layers-base').find('.leaflet-layerstree-expand-collapse').first().appendTo('#baseCollExp');
    $('#baseCollExp').append(' / ');
    $('.leaflet-control-layers-base').find('.leaflet-layerstree-expand-collapse:nth-child(2)').appendTo('#baseCollExp');

    $('.leaflet-control-layers-overlays').prepend('<div id="overCollExp"></div>');
    $('.leaflet-control-layers-overlays').find('.leaflet-layerstree-expand-collapse').addClass('layers-actions');
    $('.leaflet-control-layers-overlays').find('.leaflet-layerstree-expand-collapse').first().appendTo('#overCollExp');
    $('#overCollExp').append(' / ');
    $('.leaflet-control-layers-overlays').find('.leaflet-layerstree-expand-collapse:nth-child(2)').appendTo('#overCollExp');

    var mtb = $('.leaflet-layerstree-node:nth-child(6)').find('label').first();
    var cyc = $('.leaflet-layerstree-node:nth-child(7)').find('label').first();
    $('.leaflet-layerstree-node:nth-child(1)').click(function () {
        toggleMapboxLayer();
    });
});
			
		
		