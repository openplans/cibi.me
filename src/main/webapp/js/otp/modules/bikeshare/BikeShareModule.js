/* This program is free software: you can redistribute it and/or
   modify it under the terms of the GNU Lesser General Public License
   as published by the Free Software Foundation, either version 3 of
   the License, or (at your option) any later version.
   
   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.
   
   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>. 
*/

otp.namespace("otp.modules.bikeshare");


// TODO: move these to a shared icon libary file
var GreenFlagIcon = L.Icon.extend({
    iconUrl: 'images/flag_marker_green.png',
    shadowUrl: 'images/shadow.png',	
    iconSize: new L.Point(32, 37),
    shadowSize: new L.Point(51, 37),
    iconAnchor: new L.Point(16, 37),
    popupAnchor: new L.Point(0, -37)
});

var greenFlag = new GreenFlagIcon();


var RedFlagIcon = L.Icon.extend({
    iconUrl: 'images/flag_marker_red.png',
    shadowUrl: 'images/shadow.png',	
    iconSize: new L.Point(32, 37),
    shadowSize: new L.Point(51, 37),
    iconAnchor: new L.Point(16, 37),
    popupAnchor: new L.Point(0, -37)
});

var redFlag = new RedFlagIcon();


otp.modules.bikeshare.BikeShareModule = {

    moduleName  : "Bike Share",
    
    startLatLng : null,
    endLatLng   : null,
    
    markerLayer : new L.LayerGroup(),
    pathLayer   : new L.LayerGroup(),
        
    initialize : function(config) {
        otp.inherit(this, new otp.modules.Module());
        
        this.mapLayers.push(this.pathLayer);
        this.mapLayers.push(this.markerLayer);
    },

    handleClick : function(event) {
        //console.log('bikeshare click at '+event.latlng.lat+", "+event.latlng.lng);
        var this_ = this;
        if(this.startLatLng == null) {
            this.startLatLng = new L.LatLng(event.latlng.lat, event.latlng.lng);
            var start = new L.Marker(this.startLatLng, {icon: greenFlag, draggable: true}); 
            start.bindPopup('<strong>From:</strong> '+this.startLatLng);
            start.on('dragend', function() {
                this_.startLatLng = start.getLatLng();
                this_.planTrip();
            });
            this.markerLayer.addLayer(start);
        }
        else if(this.endLatLng == null) {
            this.endLatLng = new L.LatLng(event.latlng.lat, event.latlng.lng);
            var end = new L.Marker(this.endLatLng, {icon: redFlag, draggable: true}); 
            end.bindPopup('<strong>To:</strong> '+this.endLatLng);
            this.markerLayer.addLayer(end);
            end.on('dragend', function() {
                this_.endLatLng = end.getLatLng();
                this_.planTrip();
            });
            
            this.planTrip();
        }
    },
    
    planTrip : function() {
        var url = otp.config.hostname + '/opentripplanner-api-webapp/ws/plan';
        this.pathLayer.clearLayers();        
        var this_ = this;
        $.ajax(url, {
            data: {             
                fromPlace: this.startLatLng.lat+','+this.startLatLng.lng,
                toPlace: this.endLatLng.lat+','+this.endLatLng.lng,
                mode: 'WALK,BICYCLE'
            },
            dataType: 'jsonp',
                
            success: function(data) {
            
                console.log(data);
                var itin = data.plan.itineraries[0];
                for(var i=0; i < itin.legs.length; i++) {
                    var polyline = new L.EncodedPolyline(itin.legs[i].legGeometry.points);
                    polyline.setStyle({ color : this_.getModeColor(itin.legs[i].mode), weight: 8});
                    this_.pathLayer.addLayer(polyline);
                }
            }
        });
    },

    getModeColor : function(mode) {
        if(mode === "WALK") return '#0f0';
        if(mode === "BICYCLE") return '#f00';
        return '#aaa';
    },
    
    CLASS_NAME : "otp.modules.bikeshare.BikeShareModule"
}


otp.modules.bikeshare.BikeShareModule = new otp.Class(otp.modules.bikeshare.BikeShareModule);
