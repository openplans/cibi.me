// step 1: make sure we have some type of otp.config, and otp.config.locale defined
if(typeof(otp) == "undefined" || otp == null) otp = {};
if(typeof(otp.config) == "undefined" || otp.config == null) otp.config = {};
//if(typeof(otp.config.locale) == "undefined" || otp.config.locale == null) otp.config.locale = otp.locale.English;


// step 2: create an object of default otp.config default values (see step3 where we apply this to any existing config)
otp.config = {

    hostname : "http://host-24.deployer.opentripplanner.org",
    routerId : "dc",

    // devseed tiles (DC only) & tile URL function override:
    //tileUrl : 'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streets/{z}/{x}/{y}.png',
    tileUrl : 'http://a.tiles.mapbox.com/v3/openplans.map-1gurs0w2/{z}/{x}/{y}.png', 
    //tileUrl : 'http://{s}.tiles.mapbox.com/v3/openplans.map-g4j0dszr,openplans.nyc_bike_overlay/{z}/{x}/{y}.png',
    //overlayTileUrl : 'http://{s}.tiles.mapbox.com/v3/intertwine.nyc_bike_overlay/{z}/{x}/{y}.png',
    tileAttrib : 'Routing powered by <a href="http://opentripplanner.org/">OpenTripPlanner</a>, Map tiles from MapBox (<a href="http://mapbox.com/about/maps/">terms</a>) and OpenStreetMap ',
    initLatLng : new L.LatLng(38.895111, -77.036667), // DC
    initZoom : 14,
    minZoom : 13,
    maxZoom : 17,

    showModuleSelector: false,

    siteName    : "BikePlanner.org",
    siteURL     : "http://bikeplanner.org",
    siteDescription  : "BikePlanner.org is a online trip planner, built by OpenPlans, that lets you plan trips around Washington DC using the Capital Bikeshare system.",
    
    bikeshareName : "CaBi",

    loggerUrl : 'http://cibi.me/cibi/log',
    dataStorageUrl : 'http://cibi.me/cibi/data',
        
    infoWidgets: [
        {
            title: 'About',
            styleId: 'otp-aboutWidget',
            content: '<p>Bikeplanner.org is a trip planner for bike and bikeshare. Right now it works in Washington, DC. But because the project is built on open source software and open data it can be adapted to work in any community.</p><p> Know a (legal) shortcut? Or see a missing bike lane? You can help make it better by improving the OpenStreetMap data that powers this site -- visit <a href="http://www.openstreetmap.org/">openstreetmap.org</a> to start editing! (Stay tuned for video a tutorial.)</p><p>To use the planner, pick your start and end points, and we\'ll tell you how to make the trip with a <a href="http://capitalbikeshare.com/">CaBi</a>. Including, where to pick up a bike and where to drop it off, and alternative docks nearby. The system checks to see if bikes and docks are available before recommending a route. If you want to use your own bike, we\'ll help with that too!</p><p>Bikeplanner.org is a project from <a href="http://openplans.org/">OpenPlans</a> in collaboration with <a href="http://mobilitylab.org/">Mobility Lab</a>, <a href="http://www.bikearlington.com/">Bike Arlington</a>, and <a href="http://mapbox.com">MapBox</a>. It\'s powered by <a href="http://opentripplanner.com/">OpenTripPlanner</a> and uses <a href="http://www.openstreetmap.org/">OpenStreetMap</a> data.</p><p style="text-align:center;margin:2em;"><a href="http://openplans.org/"><img src="images/openplans-logo-gray.gif"></a></p></div>',
        },
        {
            title: 'Contact',
            styleId: 'otp-contactWidget',
            content: '<p>Comments? Reach us <a href="https://twitter.com/openplans">@OpenPlans</a> or send us a message via our <a href="http://openplans.org/">website</a>.</p><p>bikeplanner.org is a project from <a href="http://openplans.org/">OpenPlans</a> in collaboration with <a href="http://mobilitylab.org/">Mobility Lab</a>, <a href="http://www.bikearlington.com/">Bike Arlington</a>, and <a href="http://mapbox.com">MapBox</a>.</p>'
        },           
    ],
    
    /*hostname : "http://cibi.me",
    //routerId : <id>,
    
    
    // default cloudmade tiles:
    // tileUrl : 'http://{s}.tiles.mapbox.com/v3/mapbox.mapbox-streetis/{z}/{x}/{y}.png',
    // tileAttrib : 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',

    // devseed tiles (DC only) & tile URL function override:
    tileUrl : 'http://{s}.tiles.mapbox.com/v3/openplans.map-g4j0dszr,openplans.nyc_bike_overlay/{z}/{x}/{y}.png',
    //overlayTileUrl : 'http://{s}.tiles.mapbox.com/v3/intertwine.nyc_bike_overlay/{z}/{x}/{y}.png',
    tileAttrib : 'Routing powered by <a href="http://opentripplanner.org/">OpenTripPlanner</a>, Map tiles from MapBox (<a href="http://mapbox.com/about/maps/">terms</a>) and OpenStreetMap ',
    initLatLng : new L.LatLng(40.719298,-73.999743), // NYC
    initZoom : 14,
    minZoom : 13,
    maxZoom : 17,

    bikeshareName : "CiBi",

    loggerUrl : 'http://cibi.me/cibi/log',
    dataStorageUrl : 'http://cibi.me/cibi/data', */
    
    CLASS_NAME : "otp.config"
};

/*
// step 3: apply our default to the existing (possibly empty) otp config
try {
    otp.inherit(otp.config, otp.config_defaults);       // step 3a: build the object up
    otp.configure(otp.config, otp.config_defaults);     // step 3b: make sure any / all local changes above get applied
    //console.log("otp.config updated with default items from otp.config_defaults");
} catch(e) {
    //console.log("ERROR: was unable to run otp.inherit override in config.js - got this exception: " + e);
}*/
