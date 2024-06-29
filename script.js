

document.addEventListener("DOMContentLoaded", function() {
    fetchExchangeRatesAndDisplay();

    function fetchExchangeRatesAndDisplay() {
        const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; 

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                displayExchangeRates(data.rates);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                displayError('Failed to load exchange rates. Please try again later.');
            });
    }

    /**
     * Display fetched exchange rates on the webpage
     * @param {Object} rates 
     */
    function displayExchangeRates(rates) {
        const exchangeRatesContainer = document.getElementById('exchange-rates-container');
        for (const [currency, rate] of Object.entries(rates)) {
            const card = createExchangeRateCard(currency, rate);
            exchangeRatesContainer.appendChild(card);
        }
    }

    /**
     * Create a Bootstrap card element for an exchange rate
     * @param {string} currency - Currency code
     * @param {number} rate - Exchange rate
     * @returns {HTMLElement} - The created card element
     */
    function createExchangeRateCard(currency, rate) {
        const card = document.createElement('div');
        card.className = 'card col-md-3';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = currency;

        const cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.textContent = `Exchange Rate: ${rate}`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);

        return card;
    }

    /**
     * Display an error message on the webpage
     * @param {string} message - The error message to display
     */
    function displayError(message) {
        const exchangeRatesContainer = document.getElementById('exchange-rates-container');
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger';
        errorMessage.textContent = message;
        exchangeRatesContainer.appendChild(errorMessage);
    }
});
