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

otp.modules.bikeshare.BikeShareModule = {

    moduleName  : "Bike Share",
        
    initialize : function(config) {
        otp.inherit(this, new otp.modules.Module());
    },
    
    handleClick : function(event) {
        console.log('bikeshare click at '+event.latlng.lat+", "+event.latlng.lng);    
    },
    
    CLASS_NAME : "otp.modules.bikeshare.BikeShareModule"
}


otp.modules.bikeshare.BikeShareModule = new otp.Class(otp.modules.bikeshare.BikeShareModule);
