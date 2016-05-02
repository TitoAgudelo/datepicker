var doc = document.currentScript.ownerDocument;

function createComponent() {
  var prototype = Object.create(HTMLElement.prototype);

  prototype.createdCallback = function() {
    var shadow = this.createShadowRoot();
    var template = doc.querySelector('#main-template');
    shadow.appendChild(template.content.cloneNode(true));
  };

  document.registerElement('datetime-picker', {
    prototype
  });
}

createComponent();

var currentDate = new Date();
var initialMonth = currentDate.getMonth();
var initialYear = currentDate.getFullYear();

datetimePicker = {
  currentYear: initialYear,
  currentMonth: initialMonth,
  declare: {},

  init() {

  },

  getDaysForMonth(year, month) {
    // https://github.com/chmln/flatpickr/blob/gh-pages/src/flatpickr.js#L185
    var year = year || currentYear,
        month = month || currentMonth;

    if (month === 1 && ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0) )
        return 29;

    return this.declare.prototype.data.daysInMonth[month];
  },

  getNextMonthAndYear() {
    // https://github.com/chmln/flatpickr/blob/gh-pages/src/flatpickr.js#L317
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
        firstDayOfWeek: 0
    }
};

datetimePicker.getDaysForMonth(initialYear, initialMonth);
datetimePicker.init();