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


var GreenBikeIcon = L.Icon.extend({
    iconUrl: 'images/bicycle_green.png',
    iconSize: new L.Point(21, 39),
    iconAnchor: new L.Point(10, 39),
    popupAnchor: new L.Point(0, -39)
});
var greenBike = new GreenBikeIcon();

var SmallGreenBikeIcon = L.Icon.extend({
    iconUrl: 'images/bicycle_green_small.png',
    iconSize: new L.Point(15, 28),
    iconAnchor: new L.Point(10, 28),
    popupAnchor: new L.Point(0, -28)
});
var smallGreenBike = new SmallGreenBikeIcon();

var RedBikeIcon = L.Icon.extend({
    iconUrl: 'images/bicycle_red.png',
    iconSize: new L.Point(21, 39),
    iconAnchor: new L.Point(10, 39),
    popupAnchor: new L.Point(0, -39)
});
var redBike = new RedBikeIcon();

var SmallRedBikeIcon = L.Icon.extend({
    iconUrl: 'images/bicycle_red_small.png',
    iconSize: new L.Point(15, 28),
    iconAnchor: new L.Point(10, 28),
    popupAnchor: new L.Point(0, -28)
});
var smallRedBike = new SmallRedBikeIcon();


otp.modules.bikeshare.BikeShareModule = {

    moduleName  : "Bike Share",
    
    webapp      : null,
    
    startLatLng : null,
    endLatLng   : null,
    
    markerLayer     : new L.LayerGroup(),
    pathLayer       : new L.LayerGroup(),
    stationsLayer   : new L.LayerGroup(),
    
    resultsWidget   : null,
    tipWidget       : null,
    tipStep         : 0,
        
    initialize : function(config) {
        otp.inherit(this, new otp.modules.Module());
        otp.configure(this, config);
        
        this.mapLayers.push(this.pathLayer);
        this.mapLayers.push(this.stationsLayer);
        this.mapLayers.push(this.markerLayer);
        
        this.tipWidget = this.createWidget("otp-tipWidget", "");
        this.updateTipStep(1);          
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
            this.updateTipStep(2);          
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
        this.stationsLayer.clearLayers();        
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
                var resultsContent = '';
                if(data.plan) {
                    for(var i=0; i < itin.legs.length; i++) {
                        var polyline = new L.EncodedPolyline(itin.legs[i].legGeometry.points);
                        polyline.setStyle({ color : this_.getModeColor(itin.legs[i].mode), weight: 8});
                        this_.pathLayer.addLayer(polyline);
                        if(itin.legs[i].mode === 'BICYCLE') {
                            this_.getStations(polyline.getLatLngs()[0], polyline.getLatLngs()[polyline.getLatLngs().length-1]);
                        }
                    }
                    resultsContent = this_.getResultsContent(itin);
                    this_.updateTipStep(3);
                }
                else {
                    resultsContent = '<i>This trip could not be routed. Try different start/end locations.</i>';
                }
                
                if(this_.resultsWidget) {
                    this_.resultsWidget.setContent(resultsContent)
                }
                else {
                    this_.resultsWidget = this_.createWidget("otp-tripResultsWidget", resultsContent);
                }
            }
        });
    },
    
    getResultsContent : function(itin) {
        var content = '<div style="text-align: center;">';
        content += '<div style="font-size: 18px; margin-bottom: 8px; font-weight: bold;">Your Trip</div>';
        content += '<strong>Distance Traveled:</strong> '+Math.round(100*itin.walkDistance/5280)/100+' mi.<br/>';
        content += '<strong>Estimated Time:</strong> '+otp.util.Time.msToHrMin(itin.duration)+'<br/>';
        content += '<strong>Calories Burned:</strong> N/A'+'<br/>';
        content += '<strong>Cost:</strong> N/A'+'<br/>';
        content += '<div style="font-size: 14px; font-style: italic; font-weight: bold; margin-top: 16px;">Drag to Change Trip:</div>';
        content += '<div style="background: lightgray; height: 100px; margin-top: 10px;">bike triangle</div>';
        content += '<div style="font-size: 14px; font-style: italic; font-weight: bold; margin-top: 16px;">Share this Trip:</div>';
        content += '<div style="background: lightgray; height: 40px; margin-top: 10px;">social media icons</div>';
        content += '</div>';

        return content;
    },
    

    getModeColor : function(mode) {
        if(mode === "WALK") return '#0f0';
        if(mode === "BICYCLE") return '#f00';
        return '#aaa';
    },
    
    getStations : function(start, end) {
        console.log('stations '+start+' '+end);
        var url = otp.config.hostname + '/opentripplanner-api-webapp/ws/bike_rental';
        var this_ = this;
        $.ajax(url, {
            data: {             
            },
            dataType: 'jsonp',
                
            success: function(data) {
                //console.log(data);
                var tol = .0001, distTol = .005;
                for(var i=0; i<data.stations.length; i++) {
                    var station = data.stations[i].BikeRentalStation;
                    //console.log(station.x+","+station.y);
                    if(Math.abs(station.x - start.lng) < tol && Math.abs(station.y - start.lat) < tol) {
                        // start station
                        var marker = new L.Marker(start, {icon: greenBike}); 
                        marker.bindPopup(this_.constructStationInfo("PICK UP BIKE", station));
                        this_.stationsLayer.addLayer(marker);                        
                    }
                    else if(Math.abs(station.x - end.lng) < tol && Math.abs(station.y - end.lat) < tol) {
                        // end station
                        var marker = new L.Marker(end, {icon: redBike}); 
                        marker.bindPopup(this_.constructStationInfo("DROP OFF BIKE", station));
                        this_.stationsLayer.addLayer(marker);                        
                    }
                    else if(this_.distance(station.x, station.y, this_.startLatLng.lng, this_.startLatLng.lat) < distTol && 
                            parseInt(station.bikesAvailable) > 0) {
                        var marker = new L.Marker(new L.LatLng(station.y, station.x), {icon: smallGreenBike}); 
                        marker.bindPopup(this_.constructStationInfo("ALTERNATE PICKUP", station));
                        this_.stationsLayer.addLayer(marker);                        
                    }
                    else if(this_.distance(station.x, station.y, this_.endLatLng.lng, this_.endLatLng.lat) < distTol && 
                            parseInt(station.spacesAvailable) > 0) {
                        var marker = new L.Marker(new L.LatLng(station.y, station.x), {icon: smallRedBike}); 
                        marker.bindPopup(this_.constructStationInfo("ALTERNATE DROPOFF", station));
                        this_.stationsLayer.addLayer(marker);                        
                    }
                }
            }
        });        
    },
    
    constructStationInfo : function(title, station) {
        var info = "<strong>"+title+"</strong><br/>";
        info += '<strong>Station:</strong> '+station.name+'<br/>';
        info += '<strong>Bikes Available:</strong> '+station.bikesAvailable+'<br/>';
        info += '<strong>Docks Available:</strong> '+station.spacesAvailable;
        return info;
    },
    
    distance : function(x1, y1, x2, y2) {
        return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
    },
    
    updateTipStep : function(step) {
        if (step <= this.tipStep) return;
        if(step == 1) this.tipWidget.setContent("To Start: Click on the Map to Plan a Bikeshare Trip.");
        if(step == 2) this.tipWidget.setContent("Next: Click Again to Add Your Trip's End Point.");
        if(step == 3) this.tipWidget.setContent("Tip: Drag the Start or End Points to Modify Your Trip.");
        
        this.tipStep = step;
    },
    
    CLASS_NAME : "otp.modules.bikeshare.BikeShareModule"
}


otp.modules.bikeshare.BikeShareModule = new otp.Class(otp.modules.bikeshare.BikeShareModule);
