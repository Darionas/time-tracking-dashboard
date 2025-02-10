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
    /*---For better Accesebility is created tabindex--------*/
    /*There are 6 activities with itself and one more tab element and plus three activity periods*/
    let num: number = timeData.length * 2 + 3;
    console.log(timeData.length);
    let i: number = num;
    let evensNum: number[] = Array.from({ length: Math.floor((15 - 4) / 2) + 1 }, (_, i) => 4 + i * 2); 
    let oddsNum: number[] = Array.from({ length: Math.floor((15 - 5) / 2) + 1 }, (_, i) => 5 + i * 2);
   
    let startOdds: number = 0;
    let startEvens: number = 0;
    
    console.log(evensNum);
    console.log(oddsNum);
    
    /*-----------------------------*/
        
    timeData.forEach((data: SpendTime) => {
        let activityTitle: string = data.title.toLowerCase().replace(/\s+/g, '-');
        let current: number = data.timeframes[periodHTML].current;
        let previous: number = data.timeframes[periodHTML].previous;
        let currentHours: string = current === 1 ? 'hr' : 'hrs';
        let previousHours: string = previous === 1 ? 'hr' : 'hrs';
        
        let template = `
            <div class="activity activity--${activityTitle}" tabindex=${evensNum[startEvens++]}>
                <div class="activity__title activity__title--${activityTitle}">
                    <img class="activity__image" src="images/icon-${activityTitle}.svg" alt="${activityTitle}"/>
                </div>
                <div class="activity__data">
                    <p class="activity__desc">${data.title}</p>
                    <button class="activity__info" tabindex=${oddsNum[startOdds++]}><img class="dots" src="images/icon-ellipsis.svg" alt="" aria-label="More options for ${activityTitle}" /> </button>
                    <p class="activity__current">${current}${currentHours}</p>
                    <p class="activity__previous">Last ${period} - ${previous}${previousHours}</p>
                </div>
            </div>
          `;
        activities.insertAdjacentHTML('beforeend', template);
    })
}
