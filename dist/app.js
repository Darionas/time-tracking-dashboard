"use strict";
const day = document.getElementById('day');
const week = document.getElementById('weekly');
const month = document.getElementById('monthly');
let activities = document.getElementById('activities');
let period = 'day';
let periodHTML = 'daily';
document.body.addEventListener('click', (e) => {
    period = e.target;
    periodHTML = e.target;
});
console.log(period);
class Activities {
    constructor(title, info, current, previous) {
        this.title = '';
        this.info = '';
        this.current = 0;
        this.previous = 0;
        this.title = title;
        this.info = info;
        this.current = current;
        this.previous = previous;
    }
}
fetch("data.json")
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
    .then(time => {
    console.log(time);
    time.forEach(time => handleData(time));
})
    .catch(error => console.error("Error fetching users:", error));
function handleData(time) {
    if (period) {
        period.addEventListener('click', () => {
            let activityTitle = time.title.toLowerCase().replace(' ', '-');
            console.log(activityTitle);
            let current = time.timeframes[periodHTML.innerHTML].current;
            let previous = time.timeframes[periodHTML.innerHTML].previous;
            let currentHours = current === 1 ? 'hr' : 'hrs';
            let previousHours = previous === 1 ? 'hr' : 'hrs';
            let template = `
                    <div class="activity">
                        <div class="activity__title">
                            <img class="activity__image" src="images/icon-${activityTitle}.svg" alt="${activityTitle}"/>
                        </div>
                        <div class="activity__data">
                            <p class="activity__desc">${time.title}</p>
                            <p class="activity__info"><img class="dots" src="images/icon-ellipsis.svg" alt="Ellipsis" /> </p>
                            <p class="activity__current">${current}${currentHours}</p>
                            <p class="activity__previous">Last ${period} ${previous}${previousHours}</p>
                        </div>
                    </div>
                `;
            activities === null || activities === void 0 ? void 0 : activities.insertAdjacentHTML('beforeend', template);
        });
    }
    if (week) {
        week.addEventListener('click', () => {
            console.log(time.timeframes[week.innerHTML]);
        });
    }
    if (month) {
        month.addEventListener('click', () => {
            console.log(time.timeframes[month.innerHTML]);
        });
    }
}
