const form = document.querySelector('form');
const ipOutput = document.querySelector('.ip p');
const locationOutput = document.querySelector('.location p');
const timezoneOutput = document.querySelector('.timezone p');
const ispOutput = document.querySelector('.isp p');
const url = 'https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=at_Vx8BCxf89Gpt7f9SpfPMYe0rD0f1i&ipAddress=';
const mapLocation = async (ip) => {
    const response = await fetch(url + `${ip}`);
    const data = await response.json();
    return data;
}
const updateUi = (data) => {
    const {
        ip,
        location,
        isp
    } = data;
    ipOutput.textContent = `${ip}`;
    locationOutput.textContent = `${location.city}`;
    timezoneOutput.textContent = `${location.timezone} UTC`;
    ispOutput.textContent = `${isp}`;
    getMap(location.lat, location.lng);

};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ip = form.ip.value.trim();
    form.reset();
    mapLocation(ip).then(data => updateUi(data)).catch(err => console.log(err));
    //    localStorage.setItem('map', ip);
});

//if (localStorage.getItem('map')) {
//    mapLocation(localStorage.getItem('map')).then(data => updateUi(data)).catch(err => console.log(err));
//};

function getMap(lat, lng) {
    let map = L.map('map', {
        center: [lat, lng],
        zoom: 13
    });
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibW9oYW1lZC1tb2hhbWVkLXlvc3NlZiIsImEiOiJja2d1dmRwaXowb3NtMnNwZTJva2lyNWRhIn0.nHppJE5YbB0J2d5vwhengg'
    }).addTo(map);

    //    let icon = L.icon({
    //        iconUrl: '../images/icon-location.svg'
    //    })
    L.marker([lat, lng], {
        //        icon: icon
    }).addTo(map);
}
