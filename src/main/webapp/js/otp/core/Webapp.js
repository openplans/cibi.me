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

otp.core.Webapp = otp.Class({

    map     : null,
    
    modules : [ ],
    moduleMenu : null,
    
    activeModule : null,
    
    // TODO: generalize
    aboutWidget		: null,
    contactWidget	: null,    
    
    initialize : function(config) {
        otp.configure(this, config);
        
        this.map = new otp.core.Map(this);        
        
        this.addModule(new otp.modules.annotations.AnnotationsModule(this), false);
        this.addModule(new otp.modules.bikeshare.BikeShareModule(this), true);
        //this.addModule(new otp.modules.planner.PlannerModule(this), true);
        
        // init module selector
        
        var this_ = this;
        
        this.moduleMenu = document.createElement("div");
        this.moduleMenu.className = "otp_moduleMenu";
        //this.moduleMenu.innerHTML = "Module Selector"
        document.body.appendChild(this.moduleMenu);
        
        $.each(this.modules, function() {
            var module = this;
            var labelDiv = document.createElement("div");
            labelDiv.className = "otp_moduleMenuLabel";
            labelDiv.innerHTML = module.moduleName;
            this_.moduleMenu.appendChild(labelDiv);
            $(labelDiv).click(function() {
                $(this_.moduleMenu).hide();
                this_.setActiveModule(module);
            });
        });
        
        $(this.moduleMenu).mouseleave(function() {
            //document.body.removeChild(this_.moduleMenu);
        });        
        
        $('#otp_topbutton').click(function() {
            $(this_.moduleMenu).show();
        });
        
        // Init AddThis
        addthis_config = {
		     pubid: "ra-4fb549f217255a7d",
		     data_track_clickback: false
		};
		$.getScript("http://s7.addthis.com/js/250/addthis_widget.js#pubid=ra-4fb549f217255a7d");
		
		this.createAboutInfo();
		        
		if(window.location.hash !== "")
			otp.util.DataStorage.retrieve(window.location.hash.replace("#", ""), this.activeModule);
			
		
    },
    
    addModule : function(module, makeActive) {
        makeActive = typeof makeActive !== 'undefined' ? makeActive : false;
        this.modules.push(module);
        if(makeActive) {
            this.setActiveModule(module);
        }
        this.setLinks(module);
    },
    
    setActiveModule : function(module) {
        console.log("set active module: "+module.moduleName);
        if(this.activeModule != null) {
            this.activeModule.deactivate();
            
            for(var i = 0; i < this.activeModule.widgets.length; i++) {
                this.activeModule.widgets[i].hide();
            }
        }
        
        $('#otp_toptitle').html(module.moduleName);
        
        for(var i = 0; i < module.widgets.length; i++) {
            module.widgets[i].show();
        }
        
        module.activate();
        
        this.map.activeModuleChanged(this.activeModule, module);
        
        this.activeModule = module;
    },   
    
    restoreTrip : function(data) {
    	
    	this.activeModule.restorePlan(data);
   
    },
    
    setLinks : function(module) {
    	var aboutLink = $("#about_link");
    	var contactLink = $("#contact_link");

        var this_ = this;
           	    	
    	aboutLink.click(function(e) {
        	e.preventDefault("about");
        	this_.showAboutInfo();
        });	
    	contactLink.click(function(e) {
        	e.preventDefault();
        	this_.showContactInfo();
        });
    },
    
    createAboutInfo : function() {
    	this.contactWidget = new otp.widgets.InfoWidget("otp-contactWidget");

		var contactCopy = '<p>Comments? Reach us <a href="http://twitter.com/openplans">@OpenPlans</a> or <a href="http://openplans.org/contact">send us a message</a> via our website. </p><p>Read more about <a href="http://openplans.org/?p=9892">cibi.me</a>.</p><p>For more information about NYC&apos;s bike share, visit <a href="http://citibikenyc.com/">Citi Bike</a> and <a href="http://nyc.gov/bikeshare">nyc.gov/bikeshare</a>.</p><p>cibi.me is a project from <a href="http://openplans.org/">OpenPlans</a>.</p><p style="text-align:center;margin:2em;"><a href="http://openplans.org/"><img src="images/openplans-logo-gray.gif" /></a></p>';

		this.contactWidget.setContent("<p class='title'>Contact</p>" + contactCopy);
		this.contactWidget.hide();
    	
        this.aboutWidget = new otp.widgets.InfoWidget("otp-aboutWidget");
		this.aboutWidget.setContent('<p><strong>Bike share is coming to NYC this summer!</strong> How will you use it to get around?</p><img src="http://www.streetsblog.org/wp-content/uploads/2012/05/IMAG0391.jpg"/><p>CiBi.me is a trip planner for bike share. Pick your start and end points, and we\'ll tell you how to make the trip with a <a href="">Citi Bike</a>. Including, where to pick up a bike and where to drop it off, and alternative docks nearby. When the system is running this summer, cibi.me will check to see if bikes and docks are available before recommending a route. For now, we&apos;re using draft station locations from NYC DOT.</p><p>Soon, Citi Bike will make all sorts of short trips quicker and easier. With CiBi.me, you can start planning those trips today!</p><p>cibi.me is a project from OpenPlans, powered by OpenTripPlanner and using OpenStreetMap data. Proposed station data from <a href="http://nyc.gov/bikeshare/">nyc.gov/bikeshare</a>. Photo of station dock from streetsblog.org.</p><p style="text-align:center;margin:2em;"><a href="http://openplans.org/"><img src="images/openplans-logo-gray.gif" /></a></p>');
		this.aboutWidget.hide();

    },
    
    showAboutInfo : function() {
    	this.aboutWidget.show();
    	this.contactWidget.hide();
    },
    
    showContactInfo : function() {
    	this.aboutWidget.hide();
    	this.contactWidget.show();
    },
        
    hideSplash : function() {
    	$("#splash-text").hide();
    },
        
    setBounds : function(bounds)
    {
    	this.map.lmap.fitBounds(bounds);
    },
        
   
    mapClicked : function(event) {
        $(this.moduleMenu).hide();
        this.hideSplash();
        this.activeModule.handleClick(event);
    },
    
    CLASS_NAME : "otp.core.Webapp"
});

