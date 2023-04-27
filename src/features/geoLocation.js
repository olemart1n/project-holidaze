navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });

function success(position) {
    console.log(position);
}

function error() {}
