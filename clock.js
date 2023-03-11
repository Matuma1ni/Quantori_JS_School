const clock = document.querySelector('#clock');
const date = document.querySelector('#date');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const changeTime = () => {
    const now = new Date();
    const month = now.getMonth(); // # of month
    const dayNum = now.getDate();
    const day = now.getDay() - 1; // # of week day, starts from 1
    const hour = now.getHours();
    const minute = now.getMinutes(); 
    const htmlTime = `${hour}:${minute}`; 
    const htmlDay = `${days[day]}, ${dayNum} ${months[month]}`;
    clock.innerHTML = htmlTime;
    date.innerHTML = htmlDay;
};
changeTime();
setInterval(changeTime, 1000);
