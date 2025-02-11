const buttons = document.querySelector('.user__activity-button');
let activities = document.querySelector('.activities') as HTMLElement;
let period: string = 'day';
let periodHTML: string = 'daily';
updateActivities();

buttons?.classList.add('user__activity-button--selected');

document.querySelector('.user__activity-period')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if(target.id === "day" || target.id === "week" || target.id === "month") {
        period = target.id;
        periodHTML = target.innerText.toLowerCase();
        updateActivities();
    }
    
    document.querySelector('.user__activity-button--selected')?.classList.remove('user__activity-button--selected');
    target.classList.add('user__activity-button--selected');

});


interface SpendTime {
    title: string;
    timeframes: {
        [key: string]: { //using an index signature
            current: number;
            previous: number;
        }
    }
  }
     
async function updateActivities() {
    try {
        const response = await fetch("data.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        const timeData: SpendTime[] = await response.json();
        renderActivities(timeData);
    } catch (error) {
        console.error("Error fetching activities:", error);
    }
}

function renderActivities(timeData: any) {
    activities.innerHTML = '';
    timeData.forEach((data: SpendTime) => {
        let activityTitle: string = data.title.toLowerCase().replace(/\s+/g, '-');
        let current: number = data.timeframes[periodHTML].current;
        let previous: number = data.timeframes[periodHTML].previous;
        let currentHours: string = current === 1 ? 'hr' : 'hrs';
        let previousHours: string = previous === 1 ? 'hr' : 'hrs';
        
        let template = `
            <div class="activity activity--${activityTitle}">
                <div class="activity__title activity__title--${activityTitle}">
                    <img class="activity__image" src="images/icon-${activityTitle}.svg" alt="${activityTitle}"/>
                </div>
                <div class="activity__data">
                    <h3 class="activity__desc">${data.title}</h3>
                    <button class="activity__info"><img class="dots" src="images/icon-ellipsis.svg" alt="" aria-label="More options for ${activityTitle}" /></button>
                    <p class="activity__current">${current}${currentHours}</p>
                    <p class="activity__previous">Last ${period} - ${previous}${previousHours}</p>
                </div>
            </div>
          `;
        activities.insertAdjacentHTML('beforeend', template);
    })
}
