"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const buttons = document.querySelector('.user__activity-button');
let activities = document.querySelector('.activities');
let period = 'day';
let periodHTML = 'daily';
updateActivities();
buttons === null || buttons === void 0 ? void 0 : buttons.classList.add('user__activity-button--selected');
(_a = document.querySelector('.user__activity-period')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
    var _a;
    const target = e.target;
    if (target.id === "day" || target.id === "week" || target.id === "month") {
        period = target.id;
        periodHTML = target.innerText.toLowerCase();
        updateActivities();
    }
    (_a = document.querySelector('.user__activity-button--selected')) === null || _a === void 0 ? void 0 : _a.classList.remove('user__activity-button--selected');
    target.classList.add('user__activity-button--selected');
});
function updateActivities() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("data.json");
            if (!response.ok)
                throw new Error("Failed to fetch data");
            const timeData = yield response.json();
            renderActivities(timeData);
        }
        catch (error) {
            console.error("Error fetching activities:", error);
        }
    });
}
function renderActivities(timeData) {
    activities.innerHTML = '';
    let num = timeData.length * 2 + 2;
    let i = num;
    let evensNum = Array.from({ length: Math.floor((num - 2) / 2) }, (_, i) => (i + 2) * 2);
    let oddsNum = Array.from({ length: Math.floor((num - 3) / 2) + 1 }, (_, i) => (i * 2) + 3);
    let startOdds = 0;
    let startEvens = 0;
    timeData.forEach((data) => {
        let activityTitle = data.title.toLowerCase().replace(/\s+/g, '-');
        let current = data.timeframes[periodHTML].current;
        let previous = data.timeframes[periodHTML].previous;
        let currentHours = current === 1 ? 'hr' : 'hrs';
        let previousHours = previous === 1 ? 'hr' : 'hrs';
        let template = `
            <div class="activity activity--${activityTitle}" tabindex=${oddsNum[startOdds++]}>
                <div class="activity__title activity__title--${activityTitle}">
                    <img class="activity__image" src="images/icon-${activityTitle}.svg" alt="${activityTitle}"/>
                </div>
                <div class="activity__data">
                    <p class="activity__desc">${data.title}</p>
                    <p class="activity__info"><img class="dots" src="images/icon-ellipsis.svg" alt="" role="button" tabindex=${evensNum[startEvens++]} aria-label="More options for ${activityTitle}" /> </p>
                    <p class="activity__current">${current}${currentHours}</p>
                    <p class="activity__previous">Last ${period} - ${previous}${previousHours}</p>
                </div>
            </div>
          `;
        activities.insertAdjacentHTML('beforeend', template);
    });
}
