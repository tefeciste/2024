//Leaflet configuration javascript file
//Luc Clément	

var hasLienDiv = false;
var isMobileDevice = false;

//	LEAFLET Map Object
var map = L.map('map', {
    zoomControl: true,
    maxZoom: 20
});
var myRenderer = L.canvas({ padding: 0.8, tolerance: 30 });

var bounds_group = new L.featureGroup([]);
function setBounds() {
    if (bounds_group.getLayers().length) {
        map.fitBounds(bounds_group.getBounds());
    }
}
//	BASEMAPS LAYERS

//	1.	MapBox Outdoors (Topo)
//var mapBox = L.tileLayer('http://{s}.tiles.mapbox.com/v4/matt.f714d988/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {
var mapBox = L.tileLayer('https://api.mapbox.com/v4/matt.f714d988/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {
    maxZoom: 21
});

var mpO = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ', {
    maxZoom: 21
}).addTo(map);

//	2. IGN France Topo Scan express classique WMTS
var ignApiKey = "uysc5plwe5d5vezt4dvze1l5";
//var scanWmtsUrl = "http://wxs.ign.fr/" + ignApiKey + "/wmts?LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&EXCEPTIONS=text/xml&FORMAT=image/jpeg&SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&STYLE=normal&TILEMATRIXSET=PM&&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}";
var scanWmtsUrl = "https://wxs.ign.fr/pratique/geoportail/wmts?LAYER=GEOGRAPHICALGRIDSYSTEMS.MAPS&EXCEPTIONS=text/xml&FORMAT=image/jpeg&SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&STYLE=normal&TILEMATRIXSET=PM&&TILEMATRIX={z}&TILECOL={x}&TILEROW={y}";
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

//	17.	Waymarked Trails Route
var wayCyc = L.tileLayer('http://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
    format: 'image/png',
    transparent: true,
    maxZoom: 17
});

//	ELEVATION CONTROL CUSTOMIZATION
//	same options in js/elevation/Leaflet.Elevation-0.0.2.min.js
//	all used options are the default values
var mobileWidth = document.getElementById("map").offsetWidth;
var deviceWidth = L.Browser.mobile? mobileWidth : 600;

        el = L.control.elevation({
        position: "bottomright",
        theme: "steelblue-theme", //default: lime-theme
        width: deviceWidth,
        height: 130,
        margins: {
            top: 40,
            right: 5,
            bottom: 5,
            left: 40
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
        if (L.Browser.mobile) {
            setMargin();
            $('.leaflet-control-scale').hide();
        }
    }
}

function setMargin() {
    $('.elevation').css({'margin-right': '1px'});
    $('.elevation').css({'margin-bottom': '0px'});
}

//	Add data to elevation profile control
function addData(e) {
    var el = L.control.elevation();
    el.addData(e);
    map.addControl(el);
}

function addLien(lien) {
    var html = '<a target="_blank" id="lien" href="' + lien + '">Voir seul</a>';
    var containerHtml = '<span id="lien-pc-container" class="dl-link">' + html + '</span>';
    if (hasLienDiv) {
        $('#lien').remove();
        $(html).appendTo(isMobileDevice === true ? '#titre' : '#lien-pc-container');
        /*        if (isMobileDevice) {
                    $('#titre').append(html)
                } else {
                    $('#lien-pc-container').append(html)
                }*/
    } else {
        hasLienDiv = true;
        if (isMobileDevice) {
            $('#titre').append(lienIt === 0 ? '<br>' + html : html);
        } else {
            $(containerHtml).appendTo('.leaflet-control.elevation');
        }
    }
}
var tabCouleurs = ["#ff3135", "#009b2e", "#ce06cb", "#3399ff", "#2d867c", "#9c3030", "#00c2d8", "#ff3135", "#009b2e", "#ce06cb", "#3399ff", "#2d867c", "#9c3030", "#00c2d8", "#ff3135", "#009b2e", "#ce06cb", "#3399ff", "#2d867c", "#9c3030", "#00c2d8", "#ff3135", "#009b2e", "#ce06cb", "#3399ff", "#2d867c", "#9c3030", "#00c2d8"];

// 		LAYER CLICK ACTIONS:
//			-change profile color,
//			-display eleofile
//			-add elevation profile title div

function onEachFeature(feature, layer) {
    layer.on('click', function (e) {
        L.DomEvent.stopPropagation(e);
        $('.area').css('fill', tabCouleurs[feature.properties.id-1]);
        map.fitBounds(layer.getBounds());
        toggleEl();
        el.clear();
        el.addData(feature);
        var titreHtml = '<span id="titre">' + feature.properties.name + '</span>';
        $(titreHtml).appendTo('.leaflet-control.elevation');
        if (isMobileDevice) {
            $('.leaflet-control-scale').hide();
        }
        if (feature.properties.link !== undefined) {
            var lien = feature.properties.link;
            addLien(lien);
        } else if (hasLienDiv) {
            hasLienDiv = false;
            if (isMobileDevice) {
                $('#lien').remove();
            } else {
                $('#lien-pc-container').remove();
            }
        }
    });
}
function style(feature) {
    for (var i=0; i<tabCouleurs.length; i++){


        return {
            color: tabCouleurs[feature.properties.id-1],
            weight: 3,
            opacity: 1
        };

    }
}



/*      COUCHES GEOJSON
        Traces déjà faites
*/
//	01 Aix - Cannes
var aixCannes = L.geoJson(aixCan, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//	02 Bordeaux - Moissac
var bdxMoissac = L.geoJson(bdxMois, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//	03 Blan - Sarlat
var revelSarlat = L.geoJson(blanSarlat, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//	04 Briancon - Aix
var brianconAix = L.geoJson(briAix, {


    onEachFeature: onEachFeature,
    style: style
});
// 05 Chemin navarrais
var cheminNav = L.geoJson(chemNav, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//  06 Danemark
var dkRoller = L.geoJson(danemark, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 07 gtmc
var gtMassifC = L.geoJson(gtmc, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 08 gtmn
var gtMtnNoir = L.geoJson(gtmn, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 09 Hendaye - San Sebastian
var hendonosti = L.geoJson(hendSanSeb, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 10 Lyon - Aix
var lyonAixPce = L.geoJson(lyonAix, {
    onEachFeature: onEachFeature,
    renderer: myRenderer,
    style: style
});
// 11 Lyon - Bordeaux
var lyonBordeaux = L.geoJson(lyonbdx, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 12 Nantes - Hendaye
var nantesHend = L.geoJson(nantHend, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 13 Revel - Aix
var revAix = L.geoJson(revelAix, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 14 Souston - St Jean-Pied-de-Port
var soustons = L.geoJson(sousPiePor, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 15 Strasbourg - Saint-Petersbourg
var strasbSankt = L.geoJson(strasStPet, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 16 Toulouse - Miranda de Ebro
var toulMir = L.geoJson(tlseMirEbro, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 17 Lisbonne - Santiago
var lisSantiago = L.geoJson(lisSant, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 18 Tour Pyrénées
var vueltapyr = L.geoJson(vueltajson, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 18 Cols Pyrénéens
var colpyr = L.geoJson(colpyrjson, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});

/*
        COUCHES GEOJSON
        Programme 2020
*/

//	01 Gerone - Ayamonte
var geroAya = L.geoJson(giroAya, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 02 Luxembourg - Lyon
var luxembourg = L.geoJson(luxLyon, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//	03 Gorges de l'Aveyron marathon départ de Penne
var gorgesAveyron = L.geoJson(gorAveyron, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 04 Nantes - Strasbourg
var nantesStras = L.geoJson(nanStras, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 05 Dunkerque - revel
var dunkerqueRev = new L.geoJson(dunRevel, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//	07 Toulouse - Moissac - Albi
var tlseAlbi = L.geoJson(tlseMoiss, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//	08 Albi - Béziers
var albiBeziers = L.geoJson(albiBez, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});


/*
		COUCHES GEOJSON
		Projets
*/
// 01 Nantes - Hambourg
var nantHamb = L.geoJson(nanthambourg, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 02 Mulhouse - Istanbul
var mulhouse = new L.geoJson(mulhIstanbul, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 03  Cap Nord
var capeNord = L.geoJson(capNord, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//04 Trans Alpes
var transAlpes = L.geoJson(transAlp, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    renderer: myRenderer,
    style: style
});
//05 Dunkerque - strasbourg
var dunStrasbourg = L.geoJson(dunStras, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
// 06  Valence - Madrid
var valenceMad = L.geoJson(valMad, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//07 Madrid - Lisbonne
var madLisbonne = L.geoJson(madlis, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    renderer: myRenderer,
    style: style
});
//08 San Sebastian - Seville
var sanSebSeville = L.geoJson(sansSev, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//09 Irun - Porto par la côte
var irunPortoCote = L.geoJson(irunPorto, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    renderer: myRenderer,
    style: style
});
//10 Charleville Mézières - Avallon
var charlevilleAval = L.geoJson(charlAval, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//11 GTMC Avallon - Clermont Ferrand
var avallonClermont = L.geoJson(avalClermont, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//12 Revel - Port de la Selva
var portSelva = L.geoJson(revelSelva, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//13 Caen - Bordeaux
var caenBordeaux = L.geoJson(caenBdx, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
//13 Caen - Bordeaux
var havre = L.geoJson(havreBdx, {
    renderer: myRenderer,
    onEachFeature: onEachFeature,
    style: style
});
/*
    LAYER GROUPS
*/

var overLayers = {
    label: 'overlays',
    noShow: true,
    children: [
/*        {
            label: '  2020',
            collapsed: false,
            selectAllCheckbox: true,
            children: [
                {
                    label: 'Route',
                    selectAllCheckbox: true,
                    children: [
                        {label: 'Dunkerque - revel', layer: dunkerqueRev},
                        {label: 'Luxembourg - Lyon', layer: luxembourg},
                        {label: 'Nantes - Strasbourg', layer: nantesStras},
                        {label: 'Toulouse - Albi', layer: tlseAlbi},
                        {label: 'Albi - Béziers', layer: albiBeziers}
                    ]
                },
                {
                    label: 'VTT',
                    selectAllCheckbox: true,
                    children: [
                        {label: 'Girona - Ayamonte', layer: geroAya},
                        {label: 'Gorges de l\'Aveyron', layer: gorgesAveyron}

                    ]
                }
            ]
        },*/
        {
            label: '> 2020',
            collapsed: true,
            selectAllCheckbox: true,
            children: [
                {
                    label: 'VTT',
                    selectAllCheckbox: true,
                    children: [
                        {label: 'Valence - Madrid', layer: valenceMad},
                        {label: 'Madrid - Lisbonne', layer: madLisbonne},
                        {label: 'San Sebastian - Séville', layer: sanSebSeville},
                        {label: 'Irun - Porto', layer: irunPortoCote},
                        {label: 'Trans Alpes', layer: transAlpes},
                        {label: 'Cordon lorrain', layer: charlevilleAval},
                        {label: 'GTMC Morvan', layer: avallonClermont},
                        {label: 'Revel - Port Selva', layer: portSelva},
                        {label: 'Girona - Ayamonte', layer: geroAya},
                        {label: 'Gorges de l\'Aveyron', layer: gorgesAveyron}
                    ]
                },
                {
                    label: 'Route',
                    selectAllCheckbox: true,
                    children: [
                        {label: 'Dunkerque - Strasbourg', layer: dunStrasbourg},
                        //{label: 'Caen - Bordeaux', layer: caenBordeaux},
                        {label: 'Le Havre - Bordeaux', layer: havre},
                        {label: 'Dunkerque - revel', layer: dunkerqueRev},
                        {label: 'Luxembourg - Lyon', layer: luxembourg},
                        {label: 'Nantes - Strasbourg', layer: nantesStras},
                        {label: 'Toulouse - Albi', layer: tlseAlbi},
                        {label: 'Albi - Béziers', layer: albiBeziers}
                    ]
                },
                {
                    label: 'Raids',
                    selectAllCheckbox: true,
                    children: [
                        {label: 'Nantes - Hambourg', layer: nantHamb},
                        {label: 'Bale - Istanbul', layer: mulhouse},
                        {label: 'Cap Nord', layer: capeNord}
                    ]
                }
            ]
        },
        {
            label: '< 2020',
            collapsed: true,
            selectAllCheckbox: true,
            children: [
                {
                    label: 'VTT',
                    selectAllCheckbox: true,
                    children: [
                        {label: 'Aix-Cannes', layer: aixCannes},
                        {label: 'Chemin Navarrais', layer: cheminNav},
                        {label: 'GTMC', layer: gtMassifC},
                        //{ label: 'GTMN', layer: gtMtnNoir },
                        {label: 'Soustons - St Jean', layer: soustons},
                        {label: 'GTMC', layer: gtMassifC},
                        {label: 'Lisbonne - Santiago', layer: lisSantiago},
                    ]
                },
                {
                    label: 'Route',
                    selectAllCheckbox: true,
                    children: [
                        {label: 'Tour Pyrénées', layer: vueltapyr},
                        {label: 'Cols Pyrénéens', layer: colpyr},
                        {label: 'Bordeaux - Moissac', layer: bdxMoissac},
                        {label: 'Revel - Sarlat', layer: revelSarlat},
                        {label: 'Briancon - Aix', layer: brianconAix},
                        {label: 'Lyon - Aix', layer: lyonAixPce},
                        {label: 'Hendaye - Donosti', layer: hendonosti},
                        {label: 'Lyon - Bordeaux', layer: lyonBordeaux},
                        {label: 'Nantes - Hendaye', layer: nantesHend},
                        {label: 'Revel - Aix', layer: revAix},
                        {label: 'Strasbourg - St Pétersbourg', layer: strasbSankt},
                        {label: 'Toulouse - Miranda de Ebro', layer: toulMir},
                    ]
                }/*,
                {
                    label: 'Autres',
                    children: [
                        {label: 'Danemark en roller', layer: dkRoller}
                    ]
                }*/
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
            label: 'Monde',
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
map.doubleClickZoom.disable();

bounds_group.addLayer(luxembourg);
bounds_group.addLayer(nantesStras);
bounds_group.addLayer(geroAya);

setBounds();

// 		On click
map.on('click', function(e) {
    if ($('.leaflet-control.elevation').not('visible')) {
        $('.leaflet-control.elevation').fadeOut('fast');
        isDisplayed=false;
        if (L.Browser.mobile){
            $('.leaflet-control-attribution').show();
        }
    }
});

function toggleMapboxLayer() {
    if (!map.hasLayer(mpO) && (map.hasLayer(wayCyc) || map.hasLayer(wayMtb))) {
        mpO.addTo(map);
    } else if (map.hasLayer(mpO) && !map.hasLayer(wayCyc) && !map.hasLayer(wayMtb)) {
        map.removeLayer(mpO);
    }
}

var anteLayersArray = [aixCannes, bdxMoissac, revelSarlat, brianconAix, cheminNav, dkRoller, gtMassifC, gtMtnNoir, hendonosti, lyonAixPce, lyonBordeaux, nantesHend, revAix, soustons, strasbSankt, toulMir, lisSantiago];
var preLayersArray = [dunkerqueRev, luxembourg, nantesStras, geroAya, gorgesAveyron, tlseAlbi, albiBeziers];
var postLayersArray = [nantHamb, mulhouse, capeNord, transAlpes, dunStrasbourg, valenceMad, madLisbonne, sanSebSeville, irunPortoCote, charlevilleAval, avallonClermont, portSelva, caenBordeaux, havre, dunkerqueRev, luxembourg, nantesStras, geroAya, gorgesAveyron, tlseAlbi, albiBeziers];

var allGroupLayers = [anteLayersArray, preLayersArray, postLayersArray];

for (var i = 0; i < preLayersArray.length; i++) {
    postLayersArray[i].addTo(map);
}

$(document).ready(function () {
    if (L.Browser.mobile) {
        isMobileDevice = true;
        map.removeControl(map.zoomControl);
    }

    $('.leaflet-control.elevation').hide();

    //	Load Close Button Elevation Profile
    $('<span class="elClose" id="elClose"><i class="fa fa-window-close" aria-hidden="true"></i></span>').appendTo('.leaflet-control.elevation');

    //	Close button action with Jquery
    $('#elClose').click(function () {
        $('.leaflet-control.elevation').fadeOut('fast');
        $("#elClose").blur();
        if (isMobileDevice) {
            $('.leaflet-control-scale').show();
        }
    });

    // Style div group titles
    $('.leaflet-layerstree-header-pointer').find('.leaflet-layerstree-header-name').css("font-weight", "Bold");

    // Style Collapse/Expand functions
    var process = ["base", "overlays"];
    for (var i = 0; i < process.length; i++) {
        $('.leaflet-control-layers-' + process[i]).prepend('<div id="' + process[i] + 'CollExp" class="text-center"></div>');
        $('.leaflet-control-layers-' + process[i]).find('.leaflet-layerstree-expand-collapse').addClass('layers-actions');
        $('.leaflet-control-layers-' + process[i]).find('.leaflet-layerstree-expand-collapse').first().appendTo('#' + process[i] + 'CollExp');
        $('#' + process[i] + 'CollExp').append(' / ');
        $('.leaflet-control-layers-' + process[i]).find('.leaflet-layerstree-expand-collapse:nth-child(2)').appendTo('#' + process[i] + 'CollExp');
    }
    $('.leaflet-layerstree-node:nth-child(1)').click(function () {
        toggleMapboxLayer();
    });

});
			
		
