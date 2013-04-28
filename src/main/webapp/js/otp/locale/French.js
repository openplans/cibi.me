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
otp.locale.French = {

    config : {
        metricsSystem : "international"
    },

    menu : {
        about: "À propos",
        contact: "Contact",
        splash: "Où irez-vous en Bixi?...<br/>...ou simplement à vélo",
        contactText: "<p>Des commentaires? Des questions? Contactez-nous par <a href='mailto:info@nordouvert.ca'>courriel</a> ou via Twitter <a href='https://twitter.com/nordouvert'>@nordouvert</a>.</p><p>Pour en savoir plus sur le réseau de vélo-partage, vous pouvez visiter le site web de <a href='https://bixi.com'>Bixi</a>.</p><a href='http://ovh.ca'><img src='images/logoovh.png' alt='logo OVH' style='display: block; margin:auto'></a><a href='http://nordouvert.ca'><img src='images/logono.png' alt='Logo Nord Ouvert' style='display: block; margin:auto'></a>",
        aboutText: "<p>VéloPlan est un planificateur de trajet pour le vélo et le vélo-partage. Choisissez un point de départ et un point d'arrivée dans la région de Montréal et VéloPlan vous proposera un trajet. Modifiez vos préférences selon que vous préférez un trajet plus rapide, plus sécuritaire ou plus plat et VéloPlan adaptera le trajet en fonction.</p><img src='images/bikesharemtl.jpg' alt='Velo-Partage à Montréal' width='450'><p style='font-color: #888; font-size: 80%; text-align: right; width: 90%'>Photo de <a href='http://www.flickr.com/photos/39017545@N02/7219528278/'>Matt Johnson</a></p><p>Si vous comptez utiliser le système de vélo partage proposé à Montréal, VéloPlan vous proposera des stations de départ et d'arrivée en prenant en compte la disponibilité des vélos et des places libres.</p><p>Veuillez noter que VéloPlan n'est pas lié à la Société de vélo en libre-service qui opère le réseau Bixi.</p><p>VeloPlan a été mis en place en quelques heures en profitant du travail colossal réalisé par d'autres:<p><ul><li>Le code utilisé pour VéloPlan est celui de <a href='http://cibi.me/'>Cibi.me</a>, développé par l'équipe d'<a href='http://openplans.org/'>OpenPlans</a> et <a href='https://github.com/openplans/cibi.me'>disponible</a> selon une licence libre.</li><li>Le calcul de trajet repose sur une instance d'Open Trip Planner pour la <a href='http://multimodal.pourmontreal.net/'>région de Montréal</a>. En plus de fournir des trajets en vélo, <a href='http://www.opentripplanner.org/'>Open Trip Planner</a> peut également proposer des trajets en transport en commun.</li><li>Les données nécessaires pour le calcul de trajet proviennent d'<a href='http://www.openstreetmap.org/'>Open Street Map</a> pour les routes et les pistes cyclables et de la <a href='http://reverb.echo.nasa.gov/reverb/#utf8=%E2%9C%93&spatial_map=satellite&spatial_type=rectangle'>NASA</a> pour les données topologiques.</li><li>L'hébergement web, autant de VéloPlan que d'Open Trip Planner, est fourni gracieusement par <a href='http://www.ovh.com/ca/fr/'>OVH</a>.</li><li>Enfin VéloPlan est supporté par <a href='http://nordouvert.ca/'>Nord Ouvert</a> pour l'installation, la maintenance et les quelques modifications réalisées.</li></ul><p>Le <a href='https://github.com/Hoedic/cibi.me'>code source</a> utilisé pour VéloPlan est disponibles sur GitHub. Tout bug peut être signalé par un <a href='https://github.com/Hoedic/cibi.me/issues'>outil de suivi des anomalies</a></p><a href='http://ovh.ca'><img src='images/logoovh.png' alt='logo OVH' style='display: block; margin:auto'></a><a href='http://nordouvert.ca'><img src='images/logono.png' alt='Logo Nord Ouvert' style='display: block; margin:auto'></a>"
   },

    bikeTriangle : 
    {
        safeName : "Sécuritaire",
        safeSym  : "S",

        hillName : "Plat",
        hillSym  : "P",

        timeName : "Rapide",
        timeSym  : "R"
    },

    tripMode :
    {
        use: "Avec", 
        bikeShare : "Vélo-partage",
        ownBike : "Mon vélo"
    },

    tripSummary : 
    {
        yourTrip : "Votre trajet:",
        distanceTraveled : "Distance parcourue:",
        estimatedDuration : "Durée estimée:",
        dragToChange : "Critères:",
        shareTrip : "Partagez votre trajet:"
    },

    tipWidget : 
    {
       startPoint : "Commencez par cliquer sur la carte (ailleurs que sur une station) pour définir votre point de départ.",
       endPoint : "Ensuite, cliquez sur la carte pour définir votre point d'arrivée.",
       modifyTrip : "Astuce: déplacez les drapeaux de départ ou d'arrivée au besoin." 
    },


    stationInfo :
    {
        bikeStation : "Station de Vélo-partage",
        station : "Station: ",
        bikesAvail : "Vélos disponibles: ",
        docksAvail : "Places libres: ",
        start : "Départ",
        destination: "Destination",
        tripLine: "Votre trajet!",
        walkToDock: "Marche jusqu'à la station de vélo-partage",
        walkToDestination: "Marche jusqu'à la destination",
        pickUpBike: "Station de départ",
        alternatePickUp: "Station de départ alternative",
        dropOffBike: "Station d'arrivée",
        alternateDropOff: "Station d'arrivée alternative"
         
    },

    stationWidget:
    {
        recommendedPickUp : "Station de départ conseillée:",
        recommendedDropOff: "Station d'arrivée conseillée:",
        bikes: "Vélos:",
        spaces: "Places:",
    },


    CLASS_NAME : "otp.locale.French"
};
