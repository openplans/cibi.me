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

otp.namespace("otp.widgets");

otp.widgets.TripSummaryWidget = 
    otp.Class(otp.widgets.Widget, {
    
    bikeTriangle    : null,
        
    initialize : function(id, planTripCallback) {
        
        otp.configure(this, id);
        otp.widgets.Widget.prototype.initialize.apply(this, arguments);

        var content = '';
        content += '<h3 class="your-trip">'+ locale.tripSummary.yourTrip+'</h3>';
        content += '<ul class="otp-stats">';
        content += '<li><strong>'+ locale.tripSummary.distanceTraveled +'</strong> <span id="otp-tsw-distance"></span></li>';
        content += '<li><strong>'+ locale.tripSummary.estimatedDuration +'</strong> <span id="otp-tsw-duration"></span></li>';
        // content += '<li><strong>Calories Burned:</strong> N/A</li>';
        // content += '<li><strong>Cost:</strong> N/A</li>';
        content += '</ul>';
        content += '<hr />';
        content += '<h6 class="drag-to-change">'+ locale.tripSummary.dragToChange +'</h6>';
        content += '<div id="otp-tsw-bikeTriangle"></div>';

        content += '<div id="otp-tsw-bikeTypeRow">' + locale.tripMode.use + ' ';
        content += '<input id="myOwnBikeRBtn" type="radio" name="bikeType" value="my_bike"> '+  locale.tripMode.ownBike +'&nbsp;&nbsp;';
        content += '<input id="sharedBikeRBtn" type="radio" name="bikeType" value="shared_bike" checked> ' + locale.tripMode.bikeShare;
        content += '</div>';
       
        //DO NOT ACTIVATE SHARE FEATURE SINCE WE DON'T SAVE THE VARIOUS REQUESTS 
        //content += '<hr />';
        //content += '<h6 id="share-route-header">'+ locale.tripSummary.shareTrip+'</h6>';
        //content += '<div id="share-route"></div>';
                
        this.setContent(content);

        // Copy our existing share widget from the header and customize it for route sharing.
        // The url to share is set in Webapp.js in the newTrip() callback that is called once
        // a new route is loaded from the server.
        //var addthisElement = $(".addthis_toolbox").clone();
        //addthisElement.find(".addthis_counter").remove();
        // give this addthis toolbox a unique class so we can activate it alone in Webapp.js
        //addthisElement.addClass("addthis_toolbox_route");
        //addthisElement.appendTo("#share-route");
        //addthisElement.attr("addthis:title", "Check out my #CiBi trip:");
        //addthisElement.attr("addthis:description", "Cibi.me is built by OpenPlans and allows users to plan trips using NYC's new bike share program.");
        
        this.bikeTriangle = new otp.widgets.BikeTrianglePanel('otp-tsw-bikeTriangle');
        this.bikeTriangle.onChanged = planTripCallback; /*function() {
            console.log('worked!');
        };*/
        
        document.getElementById('myOwnBikeRBtn').onclick = planTripCallback;
        document.getElementById('sharedBikeRBtn').onclick = planTripCallback;
    },
    
    updateMetrics : function(itin) {
    
    	var dist = 0;
    	
    	for(var i=0; i < itin.legs.length; i++) {
    		dist += itin.legs[i].distance;
        }
	
        if (locale.config.metricsSystem == "international"){
            $("#otp-tsw-distance").html(Math.round(100*(dist/1000))/100+" km");
        } else {    	
            $("#otp-tsw-distance").html(Math.round(100*(dist/1609.344))/100+" mi");
        }
        $("#otp-tsw-duration").html(otp.util.Time.msToHrMin(itin.duration));	

    },
    
    CLASS_NAME : "otp.widgets.TripSummaryWidget"
});

