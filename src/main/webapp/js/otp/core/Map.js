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

otp.namespace("otp.core");

otp.core.Map = {

    lmap    : null,
    
    initialize : function(config) {
        otp.configure(this, config);
        
        this.lmap = new L.Map('map');

        var tileLayer = new L.TileLayer(otp.config.tileUrl, {maxZoom: 18, attribution: otp.config.tileAttrib});
	    
	    if(typeof otp.config.getTileUrl != 'undefined') {
    	    tileLayer.getTileUrl = otp.config.getTileUrl;
        }
	    
        this.lmap.setView(otp.config.initLatLng, otp.config.initZoom).addLayer(tileLayer);
    },
    
    activeModuleChanged : function(newModule) {
        this.lmap.on('click', function(event) {
            newModule.handleClick(event);
        });
        
        for (var i = 0; i < newModule.mapLayers.length; i++) {
            this.lmap.addLayer(newModule.mapLayers[i]);
        }
    },
    
    CLASS_NAME : "otp.core.Map"
}


otp.core.Map = new otp.Class(otp.core.Map);
