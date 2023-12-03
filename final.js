// -- Code to Satisfy the "Timing Function Requirement of Final"
const movingBox = document.getElementById("moving-box");
const DIV_WIDTH = movingBox.offsetWidth;
let x = 0;
let direction = 'right';

const moveBox = function(){
    // Direction Will Determine how to Define the X Position
    // Moving Right Case Statement
    if (direction === 'right'){
        // If Box Is at Right Side of Screen, Change Direction
        if ((x + DIV_WIDTH) == screen.width) {
            direction = 'left';
            x--;
        }
        else{
            x++;
        }
    // Moving Left Case Statement
    } else {
        if (x == 0){
            direction = 'right';
            x++;
        } else { 
            x--;
        }

    }
    movingBox.style.transform=`translatex(${x}px)`;
    requestAnimationFrame(moveBox);
}
requestAnimationFrame(moveBox);

// The Following Code will Satisfy the Fetch Requirement, Form Requirement, and Input Validation Requirement. 
// Create a Hook For the Sbumit Button
const zipSubmit = document.getElementById('submit');
const zipcode = document.getElementById('zipcode');
const weatherDisplay = document.getElementById('weather-display');

// Note To Self On API
// -- Utilized Creek Beaver Email
const API_KEY = '0f84efdae2121b335ee019f920759b50';



// Event Listener for Button Click
zipSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    // Validate the Zip Code -- Satisfies the Form Field and Validations
    const zipBool = validateInput(zipcode.value);
    // Valid Zip Code Input
    if (zipBool){
        // Make a Call to Get Latitude and Longitude for Zipe Code
        const GEO_URL =`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode.value},US&appid=${API_KEY}`;
        console.log(GEO_URL);
        fetch(GEO_URL)
        .then(response =>{
            return response.json();
        })
        // Parse the Lattitude and Longitude and Make a Call to Get the Weather, 
        .then(data =>{
            const lat = data['lat'];
            const lon = data['lon'];
            const WEATHER_URL =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
            fetch(WEATHER_URL)
            .then(response => {
                return response.json();
            })
            .then(data =>{
                const temp= data['main']['temp'];
                weatherDisplay.innerText = `The Current Temp In Provided Zip Code is: ${temp}`;
            })
        });
        
        
    // Invalid Zip Code Case Statement
    } else {
        weatherDisplay.innerText = 'Invalid Zip Code, Please Try Again';
    }

    const url = ``
});

// Function Utilized to Validate a Zip Code Input Via Regular Expression
function validateInput(zipInput){
    const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    return zipRegex.test(zipInput);
}

// The following will be done to set the local storage requirement. 
const storageDiv = document.getElementById('local-storage');
const storageList = document.getElementById('local-storage-list');
const localSubmit = document.getElementById('local-submit');

// This array is how I'm going to manage the Local Storage Keys
let storageKeys = ['key1', 'key2'];

// Set Some Dummy Values and clear the Initial Cache
localStorage.clear();
localStorage.setItem("key1", "value1");
localStorage.setItem("key2", "value2");

// Function will Be used to display the Local storage to the page. 
function displayLocalStorage(keyArr){
    // Clear the Initial Data in the Div
    while (storageList.firstChild){
        storageList.removeChild(storageList.firstChild);
    }
    for (let i=0; i<keyArr.length; i++){
        const value = localStorage.getItem(keyArr[i]);
        const displayText = `Key: ${keyArr[i]} | Value: ${value}`;
        const node = document.createElement('li');
        node.innerText = displayText;
        storageList.append(node);
    }
}

localSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    // Grab the Values from the Form
    const key = document.getElementById('key').value.trim();
    const value = document.getElementById('value').value.trim();
    if (key.length == 0 || value.length == 0){
        alert('Give me Something to work with here');
    }
    // Validate if the Key already Exists
    // If Data Exists, Revise the Data
    if (storageKeys.includes(key)){
        localStorage.setItem(key, value);
    // Else, Create New Data
    } else{
        // Store the Date to Local Storage
        localStorage.setItem(key, value);
        storageKeys.push(key);
    }

    displayLocalStorage(storageKeys);
});

// Need This initial Call to Ensure the Initial Local Storage is displayed. 
displayLocalStorage(storageKeys);
