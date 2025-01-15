function openMaps() {
    const googleMapsUrl = "https://maps.app.goo.gl/XABtgiDmbsj36PGR8"; // Replace YOUR+LOCATION with the desired location or coordinates
    window.open(googleMapsUrl, "_blank"); // Opens the link in a new tab
}

function rsvp() {
    debugger;
    const userResponse = confirm("Are you confirming your attendance?");
    if (userResponse) {
        const anwerYes = "https://wa.me/17786807893?text=Yes,%20I%20am%20coming."; 
        window.open(anwerYes, "_blank"); // Opens the link in a new tab
        // Add actions for Yes here
    } else {
        const answerNO = "https://wa.me/17786807893?text=Sorry,%20I%20couldn't%20make%20it"; 
        window.open(answerNO, "_blank"); // Opens the link in a new tab
    }
    
}

function pictures() {
    const picturesShare = "https://photos.app.goo.gl/kp5MvTd36MQaskpWA"; 
    window.open(picturesShare, "_blank");
}

function spotify(params) {
    const spotifyLink = "https://open.spotify.com/playlist/4wXx9SJKtHUzwZNTdA4BdL?si=k2C-thxNShy_doqgsZA7iA&pt=3fd712cc64219742020a39dce4d949a6&pi=k8VjtDy3Tp6-s"; 
    window.open(spotifyLink, "_blank");
}