//Создай плагин настраиваемого таймера, который ведет обратный отсчет до предварительно определенной даты.
//Такой плагин может использоваться в блогах и интернет-магазинах, страницах регистрации событий,
//во время технического обслуживания и т. д.

//Плагин ожидает следующую HTML-разметку и показывает четыре цифры:
//дни, часы, минуты и секунды в формате XX:XX:XX:XX.
//Количество дней может состоять из более чем двух цифр.

//Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.refs = {
      days: document.querySelector(`${this.selector} [data-value="days"]`),
      hours: document.querySelector(`${this.selector} [data-value="hours"]`),
      mins: document.querySelector(`${this.selector} [data-value="mins"]`),
      secs: document.querySelector(`${this.selector} [data-value="secs"]`),
    };
  }
  timer() {
    if (this.targetDate > Date.now()) {
      this.intervalId = setInterval(() => {
        if (this.targetDate - 1001 < Date.now()) {
          clearInterval(intervalId);
        }
        const time = this.targetDate - Date.now();
        this.updateClockFace(time);
      }, 1000);
    }
  }
  updateClockFace(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.refs.days.textContent = `${days}`;
    this.refs.hours.textContent = `${hours}`;
    this.refs.mins.textContent = `${mins}`;
    this.refs.secs.textContent = `${secs}`;
  }
  pad(value) {
    return String(value).padStart(2, "0");
  }
}

const newCountDownTimer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("March 15, 2021"),
});

newCountDownTimer.timer();
