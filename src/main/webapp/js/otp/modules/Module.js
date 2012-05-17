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

otp.namespace("otp.modules");

otp.modules.Module = new otp.Class({

    webapp      : null,

    moduleName  : "N/A",
    mapLayers   : [ ],
    widgets     : [ ],
        
    initialize : function(webapp) {
        this.webapp = webapp;
    },
    
    handleClick : function(event) {
        //console.log('unhandled map click at '+event.latlng.lat+", "+event.latlng.lng);
    },

    createWidget : function(id, content) {
        var widget = new otp.widgets.Widget(id); 
        widget.setContent(content);
        this.widgets.push(widget);
        return widget;
    },
        
    CLASS_NAME : "otp.modules.Module"
});

