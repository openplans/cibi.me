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
        content += '<h3>Your Trip:</h3>';
        content += '<ul class="otp-stats">';
        content += '<li><strong>Distance Traveled:</strong> <span id="otp-tsw-distance"></span></li>';
        content += '<li><strong>Estimated Time:</strong> <span id="otp-tsw-duration"></span></li>';
        content += '<li><strong>Calories Burned:</strong> N/A</li>';
        content += '<li><strong>Cost:</strong> N/A</li>';
        content += '</ul>';
        content += '<hr />';
        content += '<h6>Drag to Change Trip:</h6>';
        content += '<div id="otp-tsw-bikeTriangle" style="background: lightgray; height: 100px; margin-top: 10px;"></div>';
        content += '<h6>Share this Trip:</h6>';
        content += '<div id="share-route"></div>';
                
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

