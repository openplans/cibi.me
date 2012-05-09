// step 1: make sure we have some type of otp.config, and otp.config.locale defined
if(typeof(otp) == "undefined" || otp == null) otp = {};
if(typeof(otp.config) == "undefined" || otp.config == null) otp.config = {};
//if(typeof(otp.config.locale) == "undefined" || otp.config.locale == null) otp.config.locale = otp.locale.English;


// step 2: create an object of default otp.config default values (see step3 where we apply this to any existing config)
otp.config_defaults = {

    hostname : "http://localhost:8080",
    
    // default cloudmade tiles:
    // tileUrl : 'http://{s}.tile.cloudmade.com/882f51841e1f47e9b81b3e258e6d76b4/997/256/{z}/{x}/{y}.png',
    // tileAttrib : 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',

    // devseed tiles (DC only) & tile URL function override:
    tileUrl : 'http://{s}.tiles.mapbox.com/devseed/1.0.0/devseed-hq/{z}/{x}/{y}.png',
    tileAttrib : 'Map tiles &copy; Development Seed, Routing powered by OpenTripPlanner',

  	getTileUrl : function(tilePoint, zoom){
	    var subdomains = this.options.subdomains,
		    s = this.options.subdomains[(tilePoint.x + tilePoint.y) % subdomains.length];

	    return_url = this._url
		    .replace('{s}', s)
		    .replace('{z}', zoom)
		    .replace('{x}', tilePoint.x)
		    .replace('{y}', Math.pow(2,zoom) - tilePoint.y -1);
	    //console.debug("url = " + return_url + " & x, y, z = " + tilePoint.x+","+tilePoint.y+","+zoom)
	    return return_url;
    },
	        
    
    initLatLng : new L.LatLng(38.89355, -77.0146), // DC
    initZoom : 14,

    CLASS_NAME : "otp.config"
};


// step 3: apply our default to the existing (possibly empty) otp config
try {
    otp.inherit(otp.config, otp.config_defaults);       // step 3a: build the object up
    otp.configure(otp.config, otp.config_defaults);     // step 3b: make sure any / all local changes above get applied
    console.log("otp.config updated with default items from otp.config_defaults");
} catch(e) {
    console.log("ERROR: was unable to run otp.inherit override in config.js - got this exception: " + e);
}
