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

otp.widgets.BikeTrianglePanel = new otp.Class({

    div         : null,
    cursor_size : 19,
    barWidth    : 0,
    tri_size    : 0,

    triangleTimeFactor:    null,
    triangleSlopeFactor:   null,
    triangleSafetyFactor:  null,

    // default is even mixture 
    timeFactor:    0.333,
    slopeFactor:   0.333,
    safetyFactor:  0.334,

    onChanged   : null,
    
    
    timeBar     : null,
    topoBar     : null,
    safetyBar   : null,

    timeLabel   : null,
    topoLabel   : null,
    safetyLabel : null,
    
    cursorVert  : null,
    cursorHoriz : null,
    cursor      : null,

    timeName    : "Quickest",
    hillName    : "Flattest",
    safeName    : "Safest",
    
    initialize : function(divID) {
        this.div = document.getElementById(divID);
        this.render();
    },
    
    render : function() {
    
        var this_ = this;
   
        var width = $(this.div).width(), height = $(this.div).height();
        var tri_side = 2 * (height - this.cursor_size) * 1/Math.sqrt(3);
        this.tri_side = tri_side;
        var margin = this.cursor_size/2;	
        
        //console.log()

        var canvas = Raphael($(this.div).attr('id'), width, height);

        var bg = canvas.rect(0,0,width,height).attr({
              stroke: 'none',
              fill: '#eee'
          });

        var triangle = canvas.path(["M",margin+tri_side/2,margin,"L",margin+tri_side,height-margin,"L",margin,height-margin,"z"]);


        triangle.attr({fill:"#ddd", stroke:"none"});
        
        var labelSize = "18px";

        var safeFill = "#bbe070"; 
        var safeFill2 = "#77b300"; 
        var safeSym  = "S"; //locale.bikeTriangle.safeSym;

        var hillFill = "#8cc4ff"; 
        var hillFill2 = "#61a7f2"; 
        var hillSym  = "F"; //locale.bikeTriangle.hillSym;
        
        var timeFill = "#ffb2b2";
        var timeFill2 = "#f27979";
        var timeSym  = "Q"; //locale.bikeTriangle.timeSym;

        var labelT = canvas.text(margin + tri_side/2, margin+24, timeSym);
        labelT.attr({fill:timeFill2, "font-size":labelSize, "font-weight":"bold"});	

        var labelH = canvas.text(margin + 22, height-margin-14, hillSym);
        labelH.attr({fill:hillFill2, "font-size":labelSize, "font-weight":"bold"});	

        var labelS = canvas.text(margin + tri_side - 22, height-margin-14, safeSym);
        labelS.attr({fill:safeFill2, "font-size":labelSize, "font-weight":"bold"});	

        var barLeft = margin*2 + tri_side; 
        this.barWidth = width - margin*3 - tri_side;
        var barWidth = this.barWidth;
        var barHeight = (height-margin*4)/3;

        this.timeBar = canvas.rect(barLeft, margin, barWidth*.333, barHeight);
        this.timeBar.attr({fill:timeFill, stroke:"none"});

        this.topoBar = canvas.rect(barLeft, margin*2+barHeight, barWidth*.333, barHeight);
        this.topoBar.attr({fill:hillFill, stroke:"none"});

        this.safetyBar = canvas.rect(barLeft, margin*3 + barHeight*2, barWidth*.333, barHeight);
        this.safetyBar.attr({fill:safeFill, stroke:"none"});

        this.timeLabel = canvas.text(barLeft + barWidth/2, margin+barHeight/2, this.timeName + ": 33%");
        this.timeLabel.attr({"font-size":"15px", opacity:1});

        this.topoLabel = canvas.text(barLeft + barWidth/2, margin*2+barHeight+barHeight/2,  this.hillName + ": 33%");
        this.topoLabel.attr({"font-size":"15px", opacity:1});

        this.safetyLabel = canvas.text(barLeft + barWidth/2, margin*3+barHeight*2+barHeight/2, this.safeName + ": 33%");
        this.safetyLabel.attr({"font-size":"15px", opacity:1});

        var cx = margin+tri_side/2, cy = height-margin-(1/Math.sqrt(3))*(tri_side/2);
        this.cursorVert = canvas.rect(cx-.5, cy-this.cursor_size/2-2, 1, this.cursor_size+4).attr({
            fill: "rgb(0,0,0)",
            stroke: "none"
        });
        this.cursorHoriz = canvas.rect(cx-this.cursor_size/2-2, cy-.5, this.cursor_size+4, 1).attr({
            fill: "rgb(0,0,0)",
            stroke: "none"
        });
        this.cursor = canvas.circle(cx, cy, this.cursor_size/2).attr({
            fill: "rgb(128,128,128)",
            stroke: "none",
            opacity: 0.25
        });
            
        var time, topo, safety;

        var thisBT = this;
        var animTime = 250;
        var start = function () {
            // storing original coordinates
            this.ox = this.attr("cx");
            this.oy = this.attr("cy");
            thisBT.timeBar.animate({opacity: .25}, animTime);
            thisBT.topoBar.animateWith(thisBT.timeBar, {opacity: .25}, animTime);
            thisBT.safetyBar.animateWith(thisBT.timeBar, {opacity: .25}, animTime);
            //timeLabel.animate({opacity: 1}, animTime);
            //topoLabel.animate({opacity: 1}, animTime);
            //safetyLabel.animate({opacity: 1}, animTime);
        },
        move = function (dx, dy) {
            // move will be called with dx and dy
            var nx = this.ox + dx, ny = this.oy + dy;
            if(ny >  height-margin) ny = height-margin;
            if(ny < margin) ny = margin;
            var offset =  (ny-margin)/(height-margin*2) * tri_side/2; 	
            if(nx < margin + (tri_side/2) - offset) nx = margin + (tri_side/2) - offset; 
            if(nx > margin + (tri_side/2) + offset) nx = margin + (tri_side/2) + offset;

            time = ((height-2*margin)-(ny-margin))/(height-2*margin);
            topo = thisBT.distToSegment(nx, ny, margin+tri_side/2, margin, margin+tri_side, height-margin)/(height-2*margin);
            safety = 1- time - topo;

            thisBT.timeBar.attr({width: barWidth*time});
            thisBT.topoBar.attr({width: barWidth*topo});
            thisBT.safetyBar.attr({width: barWidth*safety});
            thisBT.timeLabel.attr("text", thisBT.timeName + ": "+Math.round(time*100)+"%");
            thisBT.topoLabel.attr("text", thisBT.hillName + ": " +Math.round(topo*100)+"%");
            thisBT.safetyLabel.attr("text", thisBT.safeName + ": " +Math.round(safety*100)+"%");
    
            this.attr({cx: nx, cy: ny});
            thisBT.cursorVert.attr({x: nx-.5, y: ny-thisBT.cursor_size/2-2});
            thisBT.cursorHoriz.attr({x: nx-thisBT.cursor_size/2-2, y: ny-.5});
        },
        up = function () {
            // restoring state
            thisBT.timeBar.animate({opacity: 1}, animTime);
            thisBT.topoBar.animateWith(thisBT.timeBar, {opacity: 1}, animTime);
            thisBT.safetyBar.animateWith(thisBT.timeBar, {opacity: 1}, animTime);
            //timeLabel.animate({opacity: 0}, animTime);
            //topoLabel.animate({opacity: 0}, animTime);
            //safetyLabel.animate({opacity: 0}, animTime);

            // was seeing really odd small numbers in scientific notation when topo neared zero so added this
            if(topo < 0.005) {
                topo = 0.0;
            }
            
            thisBT.timeFactor = time;
            thisBT.slopeFactor = topo;
            thisBT.safetyFactor = safety;
            if(this_.onChanged && typeof(this_.onChanged) === "function") {
                this_.onChanged();
            }
        };

        this.cursor.drag(move, start, up);
        this.cursor.mouseover(function() {
            this.animate({opacity: 0.5}, animTime);
        });
        this.cursor.mouseout(function() {
            this.animate({opacity: 0.25}, animTime);
        });
        
    },

    enable : function() {
          if(this.container.findById('trip-bike-triangle') == null) {
               this.container.add(this.panel);
          }
          this.panel.show();
          this.container.doLayout();
    },

    disable : function() {
        if(!this.panel.hidden) {
            this.panel.hide();
        }
    },

    distance : function(x1, y1, x2, y2) {
	     return Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
    },

    distToSegment : function(px, py, x1, y1, x2, y2) {
        var r, dx ,dy;
        dx = x2 - x1;
        dy = y2 - y1;
        r = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
        return this.distance(px, py, (1 - r) * x1 + r * x2, (1 - r) * y1 + r * y2);
    },

    setValues : function(time, slope, safety) {
        this.timeFactor = time;
        this.slopeFactor = slope;
        this.safetyFactor = safety;
        
        this.timeBar.attr({width: this.barWidth*time});
        this.topoBar.attr({width: this.barWidth*slope});
        this.safetyBar.attr({width: this.barWidth*safety});
        this.timeLabel.attr("text",   this.timeName + ": "+Math.round(time*100)+"%");
        this.topoLabel.attr("text",   this.hillName + ": " +Math.round(slope*100)+"%");
        this.safetyLabel.attr("text", this.safeName + ": " +Math.round(safety*100)+"%");


    },

    /** */
    setSHT : function(safe, hills, time) {
        this.safetyFactor = otp.util.ObjUtils.toFloat(safe,  1.0);
        this.slopeFactor  = otp.util.ObjUtils.toFloat(hills, 0.0);
        this.timeFactor   = otp.util.ObjUtils.toFloat(time,  0.0);
    },

    /** NOTE: don't rename this stuff, as OTP api depends on these values */
    getFormData : function() {
        return {
                triangleTimeFactor     : this.timeFactor,
                triangleSlopeFactor    : this.slopeFactor,
                triangleSafetyFactor   : this.safetyFactor
        }
    },
    
    CLASS_NAME: "otp.widgets.BikeTrianglePanel"

});

