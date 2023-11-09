const input_day = document.getElementById('day');
const input_month = document.getElementById('month');
const input_year = document.getElementById('year');
const daysOut = document.getElementById('daysOut');
const monthsOut = document.getElementById('monthsOut');
const yearsOut = document.getElementById('yearsOut');
const btnSubmit = document.getElementById('btnSubmit');
const errorStyle = '0.5px solid var(--Light-red)';

function calcAgeOld() {
  const D = input_day.value;
  const M = input_month.value;
  const Y = input_year.value;
  const birthday = `${Y}-${M}-${D}`;

  if (validateDay() && validateMonth() && validateYear()) {
    console.log('Done');
  } else {
    return;
  }

  // Age Calculation
  let years = new Date().getFullYear() - new Date(birthday).getFullYear();
  let months = new Date().getMonth() - new Date(birthday).getMonth();
  let days = new Date().getDate() - Number(D);
  if (months < 0) {
    years = years - 1;
    months = months + 12;
  }

  if (days < 0) {
    days += getNoOfDays(Y, M - 1);
  }

  // Display Values
  daysOut.innerText = days;
  monthsOut.innerText = months;
  yearsOut.innerText = years;
}

function getNoOfDays(y, m) {
  return new Date(y, m, 0).getDate();
}

input_day.addEventListener('blur', () => {
  validateDay();
});


const validateDay = () => {
  const D = input_day.value;
  const M = input_month.value;
  const Y = input_year.value;
  if (D == '') {
    showMessage(input_day, 'This field is necessary', errorStyle);
    return false;
  } else if (!validDay(Y, M, D)) {
    showMessage(input_day, 'It is necessary a valid day', errorStyle);
    return false;
  } else {
    showMessage(input_day, '', '');
    return true;
  }
};

input_month.addEventListener('blur', () => {
  validateMonth();
})

const validateMonth = () => {
  const M = input_month.value;
  if (M == '') {
    showMessage(input_month, 'This field is necessary', errorStyle);
    return false;
  } else if (!validMonth(M)) {
    showMessage(input_month, 'It is necessary a valid day', errorStyle);
    return false;
  } else {
    showMessage(input_month, '', '');
    return true;
  }
};

input_year.addEventListener('blur', () => {
  validateYear();
});

const validateYear = () => {
  const Y = input_year.value;
  const M = input_month.value;
  const D = input_day.value;
  if (Y == '') {
    showMessage(input_year, 'This field is necessary', errorStyle);
    return false;
  } else if (!validYear(Y, M, D)) {
    showMessage(input_year, 'Must be in the past', errorStyle);
    return false;
  } else {
    showMessage(input_year, '', '');
    return true;
  }
};

function validDay(y, m, d) {
  if (d > getNoOfDays(y, m) || d < 1) return false;
  return true;
}

function validMonth(m) {
  if (m > 12 || m < 1) return false;
  return true;
}

function validYear(y, m, d) {
  const secondDate = new Date();
  const firstDate = new Date(`${y}-${m}-${d}`);
  if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
    return true;
  }
  return false;
}

function showMessage(elem, msg, border) {
  elem.style.border = border;
  elem.nextElementSibling.innerText = msg;
}

btnSubmit.addEventListener('click', calcAgeOld);