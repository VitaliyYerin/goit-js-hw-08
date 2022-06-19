import throttle from "lodash.throttle";

const form = document.querySelector('.feedback-form');
const FORM_STORAGE_KEY = 'feedback-form-state';
const formEl = {};

populateFormInput();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(addFormInput, 500));

function addFormInput(e) {
  formEl[e.target.name] = e.target.value;
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formEl));
}

function onFormSubmit(e) {
  e.preventDefault();
  const {email, message} = e.currentTarget.elements;
  if (email.value === '' || message.value === '') {
    return alert('Fill in all fields please')
  }
  console.log(formEl);
  e.currentTarget.reset();
  localStorage.removeItem(FORM_STORAGE_KEY);
}

function populateFormInput() {
  const formStringValue = localStorage.getItem(FORM_STORAGE_KEY);
  if (formStringValue) {
    const formObjectValue = JSON.parse(formStringValue);
    for (const key in formObjectValue) {
      formEl[key] = formObjectValue[key];
    }
    form.elements.email.value = formEl.email ? formEl['email'] : '';
    form.elements.message.value = formEl.message ? formEl['message'] : '';
  }
}
