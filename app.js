window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
            fetch(api)
            .then(response =>{  //this makes it so it only runs when data is gathered
                return response.json();
            })
            .then(data => {
                const { temperature, summary, icon } = data.currently;
                //Set Dom Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //change temp to C or F
                        temperatureSection.addEventListener('click', () =>{
                            if(temperatureSpan.textContent === "F"){
                                temperatureSpan.textContent = "C";
                            } else {
                                temperatureSpan.textContent = "F";
                            }
                        });
            });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //replace - with _ in darksky
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});