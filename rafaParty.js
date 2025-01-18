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

async function confirmAttendance() {
    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").checked;
    const color = document.getElementById("color").value;

    if (!name) {
        alert("Please enter your name.");
        return;
    }

    const rowData = [
        name,
        attendance,
        new Date().toString(),
        color
    ];
    // Append the data to the Google Sheet
    if (await writeSheet(rowData)) {
        clearFormAndCloseDialog();
        readSheet();
        alert("Thank you for confirming your attendance!");
    } 
    else{
        alert("Something Wrong happened");
    }

    // Close the dialog
    
}

function clearFormAndCloseDialog() {
    // Close the dialog
    document.getElementById("dialog").close();

    // Clear input values
    document.getElementById("name").value = ""; // Clear text input
    document.getElementById("attendance").checked = false; // Uncheck checkbox
    document.getElementById("color").value = "#000000"; // Reset color picker to default
}

function createFlippingText(flippingItems) {
    const flipContainer = document.getElementById("flip");
  
    // Clear any existing children
    flipContainer.innerHTML = "";
  
    // Add items to the container
    flippingItems.forEach((item) => {
      const outerDiv = document.createElement("div");
      const innerDiv = document.createElement("div");
  
      innerDiv.style.backgroundColor = item[3] || "#4ec7f3"; // Default color
      innerDiv.textContent = item[0]; // Display text
  
      outerDiv.appendChild(innerDiv);
      flipContainer.appendChild(outerDiv);
    });
  
    // Start the animation
    simulateFlippingAnimation(flipContainer, flippingItems);
  }
  
  function simulateFlippingAnimation(flipContainer, items) {
    let currentIndex = 0;
    const interval = 5000; // Time between flips in milliseconds
  
    // Ensure the flipContainer is ready for single-item display
    flipContainer.style.height = "60px"; // Match item height
    flipContainer.style.alignItems = "center";
    flipContainer.style.justifyContent = "center";
    flipContainer.style.transition = "background-color 1s ease, color 1s ease";
  
    // Initial setup
    flipContainer.textContent = items[0][0];
    flipContainer.style.backgroundColor = items[0][3];
    flipContainer.style.color = "white";
  
    // Flipping loop
    setInterval(() => {
      currentIndex = currentIndex==items.length ? 0 : currentIndex+ 1;
  
      // Update text and background color
      flipContainer.textContent = items[currentIndex][0];
      flipContainer.style.backgroundColor = items[currentIndex][3];
    }, interval);
  }
  
  
  
