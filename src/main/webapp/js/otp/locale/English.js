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

otp.namespace("otp.locale");

/**
 * @class
 */
otp.locale.English= {

    config : {
        metricsSystem : "Imperial"
    },

    menu : {
        about: "About",
        contact: "Contact",
        splash: "Where will you go?",
        contactText: "<p>Comments? Reach us <a href='http://twitter.com/openplans'>@OpenPlans</a> or <a href='http://openplans.org/contact'>send us a message</a> via our website. </p><p>Read more about <a href='http://openplans.org/?p=9892'>cibi.me</a>.</p><p>For more information about NYC's bike share, visit <a href='http://citibikenyc.com/'>Citi Bike</a> and <a href='http://nyc.gov/bikeshare'>nyc.gov/bikeshare</a>.</p><p>cibi.me is a project from <a href='http://openplans.org/'>OpenPlans</a>.</p><p style='text-align:center;margin:2em;'><a href='http://openplans.org/'><img src='images/openplans-logo-gray.gif'></a></p>",
        aboutText: "<p><strong>Bike share is coming to NYC this summer!</strong> How will you use it to get around?</p><img src='http://www.streetsblog.org/wp-content/uploads/2012/05/IMAG0391.jpg'><p>CiBi.me is a trip planner for bike share. Pick your start and end points, and we'll tell you how to make the trip with a <a href=''>Citi Bike</a>. Including, where to pick up a bike and where to drop it off, and alternative docks nearby. When the system is running this summer, cibi.me will check to see if bikes and docks are available before recommending a route. For now, we're using draft station locations from NYC DOT.</p><p>Soon, Citi Bike will make all sorts of short trips quicker and easier. With CiBi.me, you can start planning those trips today!</p><p>cibi.me is a project from OpenPlans, powered by OpenTripPlanner and using OpenStreetMap data. Proposed station data from <a href='http://nyc.gov/bikeshare/'>nyc.gov/bikeshare</a>. Photo of station dock from streetsblog.org.</p><p style='text-align:center;margin:2em;'><a href='http://openplans.org/'><img src='images/openplans-logo-gray.gif'></a></p>"
},

    bikeTriangle : 
    {
        safeName : "Bike friendly",
        safeSym  : "B",

        hillName : "Flat",
        hillSym  : "F",

        timeName : "Quick",
        timeSym  : "Q"
    },

    tripMode :
    {
        use: "Use", 
        bikeShare : "A shared bike",
        ownBike : "My own bike"
    },

    tripSummary : 
    {
        yourTrip : "Your trip:",
        distanceTraveled : "Distance Traveled :",
        estimatedDuration : "Estimates duration :",
        dragToChange : "Drag to change :",
        shareTrip : "Share your trip :"
    },

    tipWidget : 
    {
       startPoint : "To Start: Click on the Map to Plan a Trip.",
       endPoint : "Next: Click Again to Add Your Trip's End Point.",
       modifyTrip : "Tip: Drag the Start or End Flags to Modify Your Trip." 
    },


    stationInfo :
    {
        bikeStation : "Bike station",
        station : "Station : ",
        bikesAvail : "Bikes available : ",
        docksAvail : "Docks available : ",
        start : "Start",
        destination: "Destination",
        tripLine: "Your trip!",
        walkToDock: "Walk to dock",
        walkToDestination: "Walk to destination",
        pickUpBike: "Pick up bike",
        alternatePickUp: "Alternate pick up",
        dropOffBike: "Drop off bike",
        alternateDropOff: "Alternate drop off"
         
    },

    stationWidget:
    {
        recommendedPickUp : "Recommended Pick Up:",
        recommendedDropOff: "Recommended Drop Off:",
        bikes: "Bikes:",
        spaces: "Spaces:",
    },


    CLASS_NAME : "otp.locale.English"
};
