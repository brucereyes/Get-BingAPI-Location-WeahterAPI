// declaration of global variables

let weather = {};
let data = {};
let count = 0;

const searchLocation = () => {
  // taking value from input

  let value = document.getElementById("input").value;
  document.getElementById("input").value = "";

  //  fetching data from bing map location api

  fetch(
    `https://dev.virtualearth.net/REST/v1/Locations/${value}?maxResults=1&key=AhsyF8BorvchK-tPgkCi9CGphjnHS7HVu_pVhvQzSLl_URMtV9yzR-Q7xXfrb9lI`
  )
    .then((res) => res.json())
    .then((Apidata) => {
      data = Apidata.resourceSets[0].resources[0];

      // fetching data from weather api

      let navigate = `lat=${data.point.coordinates[0]}&lon=${data.point.coordinates[1]}`;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?${navigate}&appid=d4f833131ea6da8bf9a113b6691ad0fd&units=imperial`
      )
        .then((res) => res.json())
        .then((result) => {
          weather = result;

          count++;
          display();
        });
    });
};

function display() {
  // removing class none from container

  if (count !== 0) {
    document.getElementById("container").className = "";
  }

  // displaying data

  document.getElementById("name").innerHTML = data.name;
  document.getElementById("state").innerHTML = data.address.adminDistrict;
  document.getElementById("district").innerHTML = data.address.locality;
  document.getElementById("country").innerHTML = data.address.countryRegion;
  document.getElementById("lat").innerHTML = data.point.coordinates[0];
  document.getElementById("long").innerHTML = data.point.coordinates[1];

  document.getElementById("temp").innerHTML = weather.main.temp + "F";
  document.getElementById("feels").innerHTML = weather.main.feels_like;
  document.getElementById("humidity").innerHTML = weather.main.humidity;
  document.getElementById("pressure").innerHTML = weather.main.pressure;
  document.getElementById("description").innerHTML =
    weather.weather[0].description;
}
