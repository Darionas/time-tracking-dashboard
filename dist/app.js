"use strict";
let activities = document.getElementById('activities');
let period = 'day';
let periodHTML = 'daily';
updateActivities();
document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.id === "day" || target.id === "week" || target.id === "month") {
        period = target.id;
        periodHTML = target.innerHTML.toLowerCase();
        updateActivities();
    }
});
function updateActivities() {
    activities.innerHTML = '';
    fetch("data.json")
        .then(response => response.json())
        .then(timeData => {
        timeData.forEach(data => {
            let activityTitle = data.title.toLowerCase().replace(' ', '-');
            let current = data.timeframes[periodHTML].current;
            let previous = data.timeframes[periodHTML].previous;
            let currentHours = current === 1 ? 'hr' : 'hrs';
            let previousHours = previous === 1 ? 'hr' : 'hrs';
            let template = `
                    <div class="activity">
                        <div class="activity__title">
                            <img class="activity__image" src="images/icon-${activityTitle}.svg" alt="${activityTitle}"/>
                        </div>
                        <div class="activity__data">
                            <p class="activity__desc">${data.title}</p>
                            <p class="activity__info"><img class="dots" src="images/icon-ellipsis.svg" alt="Ellipsis" /> </p>
                            <p class="activity__current">${current} ${currentHours}</p>
                            <p class="activity__previous">Last ${period} - ${previous} ${previousHours}</p>
                        </div>
                    </div>
                  `;
            activities.insertAdjacentHTML('beforeend', template);
        });
    })
        .catch(error => console.error("Error fetching activities:", error));
}
if (!activities) {
    console.error("Element with id 'activities' not found.");
}
