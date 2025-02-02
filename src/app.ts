let activities = document.getElementById('activities') as HTMLElement;
let period: string = 'day';
let periodHTML: string = 'daily';
updateActivities();


document.body.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if(target.id === "day" || target.id === "week" || target.id === "month") {
        period = target.id;
        periodHTML = target.innerHTML.toLowerCase();
        updateActivities();
    }
    
})

interface SpendTime {
    title: string;
    timeframes: {
        [key: string]: { //using an index signature
            current: number;
            previous: number;
        }
    }
  }
     
function updateActivities() {
    activities.innerHTML = '';
    fetch("data.json")
        .then(response => response.json() as Promise<SpendTime[]>)
        .then(timeData => {
            timeData.forEach(data => {
                let activityTitle: string = data.title.toLowerCase().replace(' ', '-');
                let current: number = data.timeframes[periodHTML].current;
                let previous: number = data.timeframes[periodHTML].previous;
                let currentHours: string = current === 1 ? 'hr' : 'hrs';
                let previousHours: string = previous === 1 ? 'hr' : 'hrs';
          
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

