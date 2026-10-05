const form = document.querySelector('.contact-form');
const fields = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  message: document.getElementById('message')
};

const formStatus = document.querySelector('.form-status');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function setError(fieldName, message) {
  const field = fields[fieldName];
  const errorField = field.parentElement.querySelector('.error-message');

  field.classList.add('invalid');
  errorField.textContent = message;
}

function clearError(fieldName) {
  const field = fields[fieldName];
  const errorField = field.parentElement.querySelector('.error-message');

  field.classList.remove('invalid');
  errorField.textContent = '';
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    let valid = true;
    formStatus.textContent = '';
    formStatus.classList.remove('error');

    Object.keys(fields).forEach((fieldName) => {
      clearError(fieldName);
    });

    if (!fields.name.value.trim()) {
      setError('name', 'Please enter your name.');
      valid = false;
    }

    if (!fields.email.value.trim()) {
      setError('email', 'Please enter your email address.');
      valid = false;
    } else if (!validateEmail(fields.email.value.trim())) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!fields.message.value.trim()) {
      setError('message', 'Please enter your message.');
      valid = false;
    }

    if (!valid) {
      formStatus.textContent = 'Please fix the highlighted fields and try again.';
      formStatus.classList.add('error');
      return;
    }

    formStatus.textContent = 'Thanks! Your message has been sent successfully.';
    form.reset();
  });
}
