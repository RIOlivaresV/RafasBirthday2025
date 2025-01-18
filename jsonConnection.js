const CLIENT_ID = "813373129825-gia17moispgcoaepqarqeti5hp2vc8l5.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
const apiKey = "AIzaSyDqPoOIYy2eaRL05CMQ-AKCM608YF2e1TA";
const CS="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";
const sheetId = "1OnT-0SlW_4N_uvFNCulXNIQnure3BkvWmFq7qXrq_oA";
const sheetName = "RSVP";
let tokenClient={
  accessToken:"ya29.a0ARW5m77sCqJh7L1ip8gMaUaNyrSYE-UYqSFWTJNTjNaP2LngO8imgCejvtma2YdJ6lyZomAC1if-RqNkc-jbAp6eWE_buuAmOqEO9mQ0Q-u0h7VGcOAMCc-FaAFnC1RO1umiUUyCBu9sNg8sjLRp5KI_jPccDSlEb1SCgTnUewaCgYKAV0SARISFQHGX2MiVDZgTQ8S5d3c3yiCMK3vKA0177",
  refreshToken:"1//04jT4Qvr2T2loCgYIARAAGAQSNwF-L9IrtDqq1yh4g3-oI9HhuKMmXeSS4elNBNUdcaBLR8EB2UjY5ongQ99VCFDY2aCUF5Vg7HE"
};
let lastRow = "";
var listData;

window.onload = async function () {
  readSheet();
};

async function setSheet() {
  try {
    // Load Google API client
    await new Promise((resolve) => gapi.load("client", resolve));

    await gapi.client.load("sheets", "v4");
    console.log("Google Sheets API loaded:", gapi.client.sheets);

    // tokenClient.requestAccessToken();
  } catch (error) {
    console.error("Initialization error:", error.message);
  }
}

async function getNewAccessToken(refreshToken) {
  const url = "https://oauth2.googleapis.com/token";

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CS, // Obtain this from your Google Cloud Console
    refresh_token: tokenClient.refreshToken,
    grant_type: "refresh_token",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (response.ok) {
      const data = await response.json();
      return data.access_token; // Use this token for API calls
    } else {
      console.error("Error refreshing token:", await response.text());
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
}


// Function to Read Data
async function readSheet() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    lastRow = data.values ? data.values.length : 0; // Get the last row number
    console.log("Last row:", lastRow);

    if (data.values) {
      const flipContainer = document.getElementById("flip");
      flipContainer.innerHTML = ""; // Clear existing content
      listData = data.values.slice(1);
      createFlippingText(data.values.slice(1));
      console.log("Data read successfully:", data.values);
    } else {
      console.error("No data found in the sheet.");
    }
  } catch (error) {
    console.error("Error reading sheet:", error.message);
  }
}

// Function to Write Data
async function writeSheet(data) {
  const currentRow = lastRow + 1; // Add 1 for the next row
  const range = `${sheetName}!A${currentRow}:D${currentRow}`; // Target range
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}!A:D:append?valueInputOption=RAW`;
  const access_token=await ensureAccessToken();
  const body = {
    values: [data], // Example data
  };

  try {
    setSheet();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`, // Use the token here
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Data appended successfully:", result);
      return true;
    } else {
      const error = await response.json();
      console.error("Error appending data:", error.error.message);
      return false
    }
  } catch (error) {
    console.error("Fetch error:", error.message);
    return false
  }
}

async function ensureAccessToken() {
  accessToken = await getNewAccessToken();
  return accessToken;
}

function tokenExpired() {
  // Logic to check expiration (use expires_in or expiration timestamp)
  return false; // Replace with actual logic
}