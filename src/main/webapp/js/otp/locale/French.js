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
        metricsSystem : "international",
        rightClickMsg : "Cliquez avec le bouton droit de la souris sur la carte pour désigner le départ et l'arrivée de votre parcours.",
        attribution : {
            title : "Attribution de licence",
            content : "<p>Cet outil utilise des données provenant de nombreuses sources.</p><br/><p>Les données de transport en commun proviennent de</p> <ul><li>- L'<a href='http://www.amt.qc.ca/developpeurs/'>Agence métropolitaine de transport</a></li><li>- La <a href='http://www.stm.info/en-bref/developpeurs.htm'>Société de Transport de Montréal</a></li><li>- La <a href='http://www.stl.laval.qc.ca/lang/fr/stl-mobile/donnees-ouvertes/'>Société de Transport de Laval</a></li><li>- Le <a href='http://www.rtl-longueuil.qc.ca/fr-CA/donnees-ouvertes/fichiers-gtfs/'>Réseau de transport de Longueuil</a></li></ul><br/><p>Les données du réseau routier proviennent d'<a href='http://www.openstreetmap.org/'>OpenStreetMap</a>.</p><br/><p>Les données topographiques d'élévation proviennent de la <a href='http://www.echo.nasa.gov/reverb/about_reverb.htm'>NASA</a>.</p><br/><p>Les attributions pour les fonds de carte apparaissent dans le coin inférieur droit en fonction du fond de carte choisie.</p>"
        }
    },

    contextMenu : {
        fromHere : "Partir d'ici",
        toHere : "Arriver ici",
        intermediateHere : "Ajouter un point de passage",

        centerHere : "Centrer la carte ici",
        zoomInHere : "Zoomer ici",
        zoomOutHere : "Dézoomer ici",
        previous : "position précédente",
        next : "position suivante"
    },

    menu : {
        about: "À propos",
        contact: "Contact",
        splash: "Où irez-vous en Bixi?...<br/>...ou simplement à vélo",
        contactText: "<p>Pour toute question contacter info@opennorth.ca</p>",
        aboutText: "<p>VéloPlan est encore en développement... mais fonctionne parfaitement bien :)</p>"
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
