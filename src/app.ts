const day = document.getElementById('day');
let activities = document.getElementById('activities') as HTMLElement;
let period: string = 'day';
let periodHTML: string = 'daily';
updateActivities();
//console.log(day);
day?.classList.add('colorPeriod');

document.querySelector('.user__activity-period')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if(target.id === "day" || target.id === "week" || target.id === "month") {
        period = target.id;
        periodHTML = target.innerText.toLowerCase();
        updateActivities();
    }
    
    document.querySelector('.colorPeriod')?.classList.remove('colorPeriod');
    target.classList.add('colorPeriod');

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
    /*---For better Accesebility is created tabindex--------*/
    /*There are 6 activities with itself and one more tab element and plus three activity periods (start at 0) */
    let num: number = timeData.length * 2 + 2;
    let i: number = num;
    let evensNum = Array.from({ length: Math.floor((num - 2) / 2) }, (_, i) => (i + 2) * 2); 
    let oddsNum = Array.from({ length: Math.floor((num - 3) / 2) + 1 }, (_, i) => (i * 2) + 3);
    let startOdds: number = 0;
    let startEvens: number = 0;
    /*-----------------------------*/
        
    timeData.forEach((data: SpendTime) => {
        let activityTitle: string = data.title.toLowerCase().replace(/\s+/g, '-');
        let current: number = data.timeframes[periodHTML].current;
        let previous: number = data.timeframes[periodHTML].previous;
        let currentHours: string = current === 1 ? 'hr' : 'hrs';
        let previousHours: string = previous === 1 ? 'hr' : 'hrs';
        
        let template = `
            <div class="activity__${activityTitle} activity__container" tabindex=${oddsNum[startOdds++]}>
                <div class="activity__title ${activityTitle}">
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
    })
}
