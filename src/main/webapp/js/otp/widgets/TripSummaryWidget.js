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
        content += "<div style='text-align: center;'>";
        content += "<div style='font-size: 18px; margin-bottom: 8px; font-weight: bold;'>Your Trip</div>";
        content += "<strong>Distance Traveled:</strong> <span id='otp-tsw-distance'></span><br/>";
        content += "<strong>Estimated Time:</strong> <span id='otp-tsw-duration'></span><br/>";
        content += "<strong>Calories Burned:</strong> N/A"+"<br/>";
        content += "<strong>Cost:</strong> N/A<br/>";
        content += '<div style="font-size: 14px; font-style: italic; font-weight: bold; margin-top: 16px;">Drag to Change Trip:</div>';
        content += "<div id='otp-tsw-bikeTriangle' style='background: lightgray; height: 100px; margin-top: 10px;'></div>";
        content += '<div style="font-size: 14px; font-style: italic; font-weight: bold; margin-top: 16px;">Share this Trip:</div>';
        content += '<div id="share-route" style="background: lightgray; height: 40px; margin-top: 10px;"></div>';
        content += '</div>';
                
        this.setContent(content);

        // Copy our existing share widget from the header and customize it for route sharing.
        // The url to share is set in Webapp.js in the newTrip() callback that is called once
        // a new route is loaded from the server.
        var addthisElement = $(".addthis_toolbox").clone();
        addthisElement.find(".addthis_counter").remove();
        addthisElement.appendTo("#share-route");
        addthisElement.attr("addthis:title", "route title");
        addthisElement.attr("addthis:description", "route description");
        
        this.bikeTriangle = new otp.widgets.BikeTrianglePanel('otp-tsw-bikeTriangle');
        this.bikeTriangle.onChanged = planTripCallback; /*function() {
            console.log('worked!');
        };*/
    },
    
    updateMetrics : function(itin) {
        $("#otp-tsw-distance").html(Math.round(100*itin.walkDistance/5280)/100+" mi.");
        $("#otp-tsw-duration").html(otp.util.Time.msToHrMin(itin.duration)+" mi.");
    },
    
    CLASS_NAME : "otp.widgets.TripSummaryWidget"
});

