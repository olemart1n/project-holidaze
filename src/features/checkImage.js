// code taken from the internet

// function checkImage(url) {
//     var request = new XMLHttpRequest();
//     request.open("GET", url, true);
//     request.send();
//     request.onload = function () {
//         status = request.status;
//         if (request.status == 200) {
//             //if(statusText == OK)
//             console.log("image exists");
//         } else {
//             console.log("image doesn't exist");
//         }
//     };
// }

function checkImage(url) {
    fetch(url).then((data) => {
        if (data.status === 200) return true;
        return;
    });
}
export default checkImage;
