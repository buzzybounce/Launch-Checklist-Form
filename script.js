// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


// let pilotName = null;
// let coPilotName = null;
// let fuelLevel = null;
// let cargoMass = null;
let nameState = true;
let numberState = true;

// Number in string checker

function hasNumber(myString) {
   return /\d/.test(myString);
 }

function jsonFetcher () {
   
   fetch ("https://handlers.education.launchcode.org/static/planets.json").then (function (response) {

      let planets = response.json();

      planets.then(function (json) {

         let planetNames = [];
         let randomNum = Math.floor(Math.random()*json.length);

         for (let planet of json) {

            planetNames.push (planet.name)

         }

         for (let planet of json) {

            if (planet.name === planetNames[randomNum]) {

                  const profile = document.getElementById("missionTarget")
                  profile.innerHTML =  
                  `<h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${planet.name}</li>
                     <li>Diameter: ${planet.diameter}</li>
                     <li>Star: ${planet.star}</li>
                     <li>Distance from Earth: ${planet.distance}</li>
                     <li>Number of Moons: ${planet.moons}</li>
                  </ol>
                  <img src="${planet.image}">`

            }

         }

      });

   });

}

function formChecker () {

   let pilotName = document.querySelector("input[name=pilotName]").value;
   let coPilotName = document.querySelector("input[name=copilotName]").value;
   let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
   let cargoMass = document.querySelector("input[name=cargoMass]").value;

   if (pilotName === '' || coPilotName === '' || fuelLevel === '' || cargoMass === '') {

      window.alert ("Please fill in all fields.")
      event.preventDefault();

   }

   else {

      if (hasNumber(pilotName) || hasNumber(coPilotName)) {

         let stringAlert = "Please enter a name with no numbers for ";

         if (hasNumber(pilotName) && hasNumber(coPilotName)) {

            stringAlert = stringAlert + "the Pilot and Co-Pilot."

         }

         else if (hasNumber(pilotName)) {

            stringAlert = stringAlert + "the Pilot."

         }

         else if (hasNumber(coPilotName)) {

            stringAlert = stringAlert + "the Co-Pilot."

         }

         window.alert (stringAlert);
         nameState = false;
         event.preventDefault();

      }

      else {

         nameState = true;

      }

      if (isNaN (fuelLevel) || isNaN (cargoMass)) {

         let stringAlert = "Please enter a number for ";

         if (isNaN (fuelLevel) && isNaN (cargoMass)) {

            stringAlert = stringAlert + "Fuel Level and Cargo Mass.";

         }

         else if (isNaN (fuelLevel)) {

            stringAlert = stringAlert + "Fuel Level.";

         }

         else if (isNaN (cargoMass)) {

            stringAlert = stringAlert + "Cargo Mass.";

         }

         window.alert (stringAlert);
         numberState = false;
         event.preventDefault();

      }

      else {

         numberState = true;

      }

      if(nameState && numberState) {

         let pilotStatus = document.getElementById("pilotStatus");
         let copilotStatus = document.getElementById("copilotStatus");
         let fuelStatus = document.getElementById("fuelStatus");
         let cargoStatus = document.getElementById("cargoStatus");
         let launchStatus = document.getElementById("launchStatus");
         let faultyItems = document.getElementById("faultyItems");

         pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch.`
         copilotStatus.innerHTML = `Co-pilot ${coPilotName} is ready for launch`

         if (Number(fuelLevel) < 10000 || Number(cargoMass) > 10000) {

            faultyItems.style.visibility = 'visible';

            launchStatus.innerHTML = 'Shuttle Not Ready For Launch';
            launchStatus.style.color = 'red';

            if (Number(fuelLevel) < 10000) {

               fuelStatus.innerHTML = 'Fuel level too low for launch.'

            }

            else {

               fuelStatus.innerHTML = 'Fuel level high enough for launch.'

            }

            if (Number(cargoMass) > 10000) {

               cargoStatus.innerHTML = 'Cargo mass too heavy for launch.'

            }

            else {

               cargoStatus.innerHTML = 'Cargo mass low enough for launch.'

            }
         }

         else {

            faultyItems.style.visibility = 'hidden';
            launchStatus.innerHTML = 'Shuttle is Ready to Launch'
            launchStatus.style.color = 'green';

            fuelStatus.innerHTML = 'Fuel level high enough for launch.'
            cargoStatus.innerHTML = 'Cargo mass low enough for launch.'
            jsonFetcher();

         }
                
         event.preventDefault();

      }

   }

}

window.addEventListener ("load", function() {

   let form = document.getElementById("launchForm");

   form.addEventListener("submit", function() {

      formChecker();
      
   });



})