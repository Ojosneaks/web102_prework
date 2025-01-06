/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

function addGamesToPage(games) {
    // Loop over each game in the games array
    for (let i = 0; i < games.length; i++) {
        // Create a new div element for each game
        let gameCard = document.createElement("div");

        // Add the class 'game-card' to the new div element
        gameCard.className = "game-card";

        // Set the innerHTML using a template literal to display game info
        // Assuming each game object has properties: title, image, and description
        gameCard.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img" />
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
        `;

        // Append the newly created game card to the games container on the page
        document.getElementById("games-container").appendChild(gameCard);
    }
}



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<strong>Total Contributions:</strong> ${totalContributions.toLocaleString()}`;

// grab the amount raised card
const raisedCard = document.getElementById("total-raised");

// use reduce() to calculate the total amount raised by summing the pledged amounts
const totalAmountRaised = GAMES_JSON.reduce((acc, game) => {
    return acc + game.pledged;
}, 0);

// set the inner HTML of the raised card using toLocaleString for formatting
raisedCard.innerHTML = `<strong>Total Amount Raised:</strong> $${totalAmountRaised.toLocaleString()}`;

// grab number of games card
const gamesCard = document.getElementById("num-games");

// set its inner HTML to the length of the GAMES_JSON array
const totalGames = GAMES_JSON.length;
gamesCard.innerHTML = `<strong>Total Games:</strong> ${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// Show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // Filter games with pledged < goal
    const listOfUnfundedGames = GAMES_JSON.filter( (game) => {
        return game.pledged < game.goal;
    });

    //clear the games
    deleteChildElements(gamesContainer);

    // Add the filtered games to the page
    addGamesToPage(listOfUnfundedGames);
    // Check how many games are unfunded using console.log
    console.log(`Number of unfunded games: ${listOfUnfundedGames.length}`);
}

// Show only games that are fully funded
function filterFundedOnly() {
    // Filter games with pledged >= goal
    const listOfFundedGames = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // Clear the games container
    
    deleteChildElements(gamesContainer);

    // Add the filtered games to the page
    addGamesToPage(listOfFundedGames);
}

// Show all games
function showAllGames() {
    // Clear the games container
    deleteChildElements(gamesContainer);

    // Add all games to the page
    addGamesToPage(GAMES_JSON);
}

// Select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", () => {
    filterUnfundedOnly();
});

fundedBtn.addEventListener("click", () => {
    filterFundedOnly();
});

allBtn.addEventListener("click", () => {
    showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// Use filter to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// Create a string that explains the number of unfunded games using the ternary operator
const unfundedDescription = numUnfundedGames > 0
  ? `There are ${numUnfundedGames} unfunded games. We need your help to fund these amazing projects!`
  : `All games are fully funded! Thank you for your support.`;

// Create a new DOM element containing the template string
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = unfundedDescription;

// Append the new element to the description container
descriptionContainer.appendChild(descriptionElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;

const firstGameFirstWord = firstGame.name.split(' ')[0];
const secondGameFirstWord = secondGame.name.split(' ')[0];

console.log(`First Word of Most Funded Game: ${firstGameFirstWord}`);
console.log(`First Word of Second Most Funded Game: ${secondGameFirstWord}`);


// create a new element to hold the name of the top pledge game, then append it to the correct element
// Create and append the name of the top-funded game
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name; // Add the name of the first game
firstGameContainer.appendChild(firstGameElement);

// Create and append the name of the second most-funded game
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name; // Add the name of the second game
secondGameContainer.appendChild(secondGameElement);

// do the same for the runner up item