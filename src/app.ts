const day = document.getElementById('day');
const week = document.getElementById('weekly');
const month = document.getElementById('monthly');
let activities = document.getElementById('activities');
let period: any = 'day';
let periodHTML: any = 'daily';
//console.log(day, week, month);


document.body.addEventListener('click', (e: MouseEvent) => {
    period = (e.target as HTMLButtonElement);
    periodHTML = e.target as HTMLElement;
    //console.log(target);
})

console.log(period);

interface SpendTime {
    title: string;
    timeframes: {
        daily: {
            current: number;
            previous: number;
        }
    }
  }
  
  class Activities {
      title: string = '';
      info: string = '';
      current: number = 0;
      previous: number = 0;
      
      constructor(title: string, info: string, current: number, previous: number) {
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
      return response.json() as Promise<SpendTime[]>; // Type assertion
    })
    .then(time => {
    console.log(time);
      time.forEach(time => handleData(time));
    })
    .catch(error => console.error("Error fetching users:", error));
        

    function handleData(time: any) {
        if(period) {  
            period.addEventListener('click', () => {
                //console.log((e.target as HTMLElement).id);
                //console.log(time.timeframes[day.innerHTML]);
                let activityTitle: string = time.title.toLowerCase().replace(' ', '-');
                console.log(activityTitle)
                //let period: string = (e.target as HTMLElement).id;
                let current: number = time.timeframes[periodHTML.innerHTML].current;
                let previous: number = time.timeframes[periodHTML.innerHTML].previous;
                let currentHours: string = current === 1 ? 'hr' : 'hrs';
                let previousHours: string = previous === 1 ? 'hr' : 'hrs';
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
                activities?.insertAdjacentHTML('beforeend', template);
            })  
        }
        if(week) {  
            week.addEventListener('click', () => {
              console.log(time.timeframes[week.innerHTML]);
            })  
        }
        if(month) {  
            month.addEventListener('click', () => {
               console.log(time.timeframes[month.innerHTML]);
            })  
        }
    }
    