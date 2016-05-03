/*** 
  author: Tito Agudelo 
  datepicker
 ***/
'use strict';
var self = this,
    config = {};
document.onreadystatechange = function(e)
{
    if (document.readyState === 'complete')
    {
        //dom is ready, window.onload fires later
        document.querySelector("[data-open]").addEventListener( 'click' , self.datetimePicker.init);
        document.querySelector("[data-open]").addClass += " active";
    }
};


// declare initial variables for DOM
var currentDate = new Date(),
    initialMonth = currentDate.getMonth(),
    initialYear = currentDate.getFullYear(),

    // declare conatiners
    calendarContainer = document.querySelector("[data-calendar]"),
    navigation = document.querySelector("[data-nav]"),
    days = document.querySelector("[data-days]"),

    // variables for month navigation
    prevMonthNav = document.createElement('span'),
    nextMonthNav = document.createElement('span'),
    currentNav = document.createElement('span'),
    currentMonth = document.createElement('span'),
    currentYear = document.createElement('span');


var datetimePicker = {
  currentYear: initialYear,
  currentMonth: initialMonth,
  declare: {},

  init() {
    self.datetimePicker.buildNavMonth(self.currentMonth);
    self.datetimePicker.buildDays();
  },

  buildNavMonth(month) {
    prevMonthNav.className = "datepicker-prev-month";
    prevMonthNav.innerHTML = '<i class="icon icon-prev"></i>';

    nextMonthNav.className = "datepicker-next-month";
    nextMonthNav.innerHTML = '<i class="icon icon-next"></i>';

    currentMonth.className = "datepicker-current-month";
    currentMonth.innerHTML = this.declare.prototype.data.months.longhand[this.currentMonth];   
    currentYear.className = "datepicker-current-year";
    currentYear.innerHTML = this.currentYear;

    currentNav.className = "datepicker-date";
    currentNav.appendChild(currentMonth);
    currentNav.appendChild(currentYear);

    navigation.appendChild(prevMonthNav);
    navigation.appendChild(currentNav);
    navigation.appendChild(nextMonthNav);

  },

  buildDays() {

    var firstOfMonth = ( new Date(this.currentYear, this.currentMonth, 1).getDay() - this.declare.prototype.data.firstDayOfWeek + 7 )%7,
        numDays = this.getDaysForMonth(this.currentMonth),
        prevMonthDays = this.getDaysForMonth( ( this.currentMonth - 1 + 12)%12 ),
        dayNumber = prevMonthDays + 1 - firstOfMonth,
        className,
        cur_date,
        date_is_disabled,
        date_outside_minmax,
        config = {};

    self.days.innerHTML = '';

    config.minDate =
      this.uDate(config.minDate === "today" ? new Date() : config.minDate, true);

    config.maxDate = this.uDate(config.maxDate, true);

    // prepend days from the ending of previous month
    for( ; dayNumber <= prevMonthDays; dayNumber++ ){
        var d = document.createElement("span");
        d.className="disabled datepicker-day";
        d.innerHTML=dayNumber;
        self.days.appendChild(d);
    }

    // Start at 1 since there is no 0th day
    for (dayNumber = 1; dayNumber <= 42 - firstOfMonth; dayNumber++) {

      if (dayNumber <= numDays) // avoids new date objects for appended dates
        cur_date = new Date(this.currentYear, this.currentMonth, dayNumber);

      date_outside_minmax =
        (config.minDate && cur_date < config.minDate ) ||
        (config.maxDate && cur_date > config.maxDate);

      date_is_disabled = dayNumber > numDays || date_outside_minmax;

      className = date_is_disabled ? "disabled datepicker-day" : "slot datepicker-day";

      if (!date_is_disabled && this.equalDates(cur_date, currentDate) )
        className += ' today';

      if (!date_is_disabled && this.equalDates(cur_date, self.selectedDateObj) )
        className += ' selected';

      let cell = document.createElement("span");

      cell.className = className;
      cell.innerHTML = (dayNumber > numDays ? dayNumber % numDays : dayNumber);
      self.days.appendChild(cell);
    }
  },

  uDate (date, timeless){
    timeless = timeless||false;

    if (date === 'today'){
        date = new Date();
        timeless=true;
    }

    else if (typeof date === 'string'){

        if ( Date.parse(date) )
            return new Date(date);

        else if (self.config.noCalendar && /\d\d[:\s]\d\d/.test(date))
            return new Date(`${currentDate.toDateString()} ${date}`);

        return null;
    }

    if(timeless && date)
        date.setHours(0,0,0,0);

    return date;
  },

  equalDates (date1, date2){
    if(date1 && date2) {
      return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
    }

  },

  getDaysForMonth(month) {
    var year = this.currentYear,
        month = month || this.currentMonth;

    if (month === 1 && ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0) )
        return 29;

    return this.declare.prototype.data.daysInMonth[month];
  },

  getNextMonthAndYear() {
    var month = this.currentMonth++;
    if (month == 13) {
      year++;
      month = 1;
    }

    return {
      year: year,
      month: month
    };
  },

  getPreviousMonthAndYear() {
    // same as getNextMonthAndYear()
    var month = this.currentMonth--;
    if (month == 0) {
      year--;
      month = 12;
    }

    return {
      year: year,
      month: month
    };
  }
};

datetimePicker.declare.prototype = {
    data: {
        weekdays: {
            shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        months: {
            shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            longhand: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 1
    }
};

//datetimePicker.getDaysForMonth(initialYear, initialMonth);
//datetimePicker.init();
