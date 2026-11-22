'use strict';

const dashboardContent = document.getElementById('dashboard__content-cardContainer');
let allData;

// add the markup for each item to the DOM
const appendItem = (item, timeframe) => {
    const timeframeLabels = {
        daily: 'day',
        weekly: 'week',
        monthly: 'month'
    }
    
    const activityCard = document.createElement('div');
    activityCard.className = 'activity__card';
    activityCard.innerHTML = `
        <div class="activity__image activity__${item.title.toLowerCase().replace(' ', '-')}">
            <img class="activity__icon" src="./images/icon-${item.title.toLowerCase().replace(' ', '-')}.svg" alt="${item.title} activity" />
        </div> 
        <div class="activity__content">
            <div class="activity__menu">
                <p class="activity__btn-title text__preset-5M">${item.title}</p>
                <button class="activity__btn" aria-label="${item.title} options menu">
                    <p class="oval"></p>
                    <p class="oval"></p>
                    <p class="oval"></p>
                </button>
            </div>
            <div class="activity__tracking-time">
                <p class="activity__hours text__preset-1">${item.timeframes[timeframe].current}hrs</p>
                <p class="activity__total-hours text__preset-6">Last ${timeframeLabels[timeframe]} - ${item.timeframes[timeframe].previous}hrs</p>
            </div>
        </div> 
        `        
        dashboardContent.appendChild(activityCard);
};

// define the current filter (daily, weekly, monthly)
let filterButtons = document.querySelectorAll('.timing__filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => {
            btn.classList.remove('timing__filter-btn--active');
            btn.removeAttribute('aria-current');
        });
            
        button.classList.add('timing__filter-btn--active');
        button.setAttribute('aria-current', 'page');
    
        setFilter(button.textContent.toLowerCase());
    });
});

let filter = 'daily';
function setFilter(newFilter) {
   filter = newFilter;
   dashboardContent.innerHTML = '';
   populateDOM(allData, filter);
}

// append the data to the DOM
function populateDOM(data, timeframe) {
    data.forEach(item => {
        appendItem(item, timeframe);
    });
}

// fetch the JSON data
fetch('./data.json')
.then((response) => {
    if(!response.ok) throw new Error(`Request failed: ${response.status}`);

    return response.json();
}).then((data) => {
    // handle the data
    allData = data;
    populateDOM(data, filter);
}).catch((error) => {
    console.error(error);
});
