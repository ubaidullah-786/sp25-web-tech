'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('checkout-form');
  const successMessage = document.getElementById('success-message');

  const fullName = document.getElementById('full-name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const zip = document.getElementById('zip');
  const cardNumber = document.getElementById('card-number');
  const expiryDate = document.getElementById('expiry-date');
  const cvv = document.getElementById('cvv');

  const fullNameError = document.getElementById('full-name-error');
  const emailError = document.getElementById('email-error');
  const phoneError = document.getElementById('phone-error');
  const addressError = document.getElementById('address-error');
  const cityError = document.getElementById('city-error');
  const zipError = document.getElementById('zip-error');
  const cardNumberError = document.getElementById('card-number-error');
  const expiryDateError = document.getElementById('expiry-date-error');
  const cvvError = document.getElementById('cvv-error');

  fullName.addEventListener('input', validateFullName);
  email.addEventListener('input', validateEmail);
  phone.addEventListener('input', validatePhone);
  address.addEventListener('input', validateAddress);
  city.addEventListener('input', validateCity);
  zip.addEventListener('input', validateZip);
  cardNumber.addEventListener('input', validateCardNumber);
  expiryDate.addEventListener('input', validateExpiryDate);
  cvv.addEventListener('input', validateCVV);

  cardNumber.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.slice(0, 16);
    e.target.value = value;
  });

  expiryDate.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.substring(0, 6);
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    e.target.value = value;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isAddressValid = validateAddress();
    const isCityValid = validateCity();
    const isZipValid = validateZip();
    const isCardNumberValid = validateCardNumber();
    const isExpiryDateValid = validateExpiryDate();
    const isCVVValid = validateCVV();

    if (
      isFullNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isAddressValid &&
      isCityValid &&
      isZipValid &&
      isCardNumberValid &&
      isExpiryDateValid &&
      isCVVValid
    ) {
      form.style.display = 'none';
      successMessage.style.display = 'block';

      form.reset();
    }
  });

  function validateFullName() {
    const nameRegex = /^[A-Za-z ]+$/;
    const value = fullName.value.trim();

    if (value === '') {
      showError(fullName, fullNameError, 'Full name is required');
      return false;
    } else if (!nameRegex.test(value)) {
      showError(
        fullName,
        fullNameError,
        'Please enter a valid name (letters only)'
      );
      return false;
    } else {
      hideError(fullName, fullNameError);
      return true;
    }
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = email.value.trim();

    if (value === '') {
      showError(email, emailError, 'Email is required');
      return false;
    } else if (!emailRegex.test(value)) {
      showError(email, emailError, 'Please enter a valid email address');
      return false;
    } else {
      hideError(email, emailError);
      return true;
    }
  }

  function validatePhone() {
    const phoneRegex = /^[0-9]{10,15}$/;
    const value = phone.value.trim();

    if (value === '') {
      showError(phone, phoneError, 'Phone number is required');
      return false;
    } else if (!phoneRegex.test(value)) {
      showError(
        phone,
        phoneError,
        'Please enter a valid phone number (10-15 digits)'
      );
      return false;
    } else {
      hideError(phone, phoneError);
      return true;
    }
  }

  function validateAddress() {
    const value = address.value.trim();

    if (value === '') {
      showError(address, addressError, 'Address is required');
      return false;
    } else {
      hideError(address, addressError);
      return true;
    }
  }

  function validateCity() {
    const value = city.value.trim();

    if (value === '') {
      showError(city, cityError, 'City is required');
      return false;
    } else {
      hideError(city, cityError);
      return true;
    }
  }

  function validateZip() {
    const zipRegex = /^[0-9]{5,10}$/;
    const value = zip.value.trim();

    if (value === '') {
      showError(zip, zipError, 'ZIP code is required');
      return false;
    } else if (!zipRegex.test(value)) {
      showError(zip, zipError, 'Please enter a valid ZIP code');
      return false;
    } else {
      hideError(zip, zipError);
      return true;
    }
  }

  function validateCardNumber() {
    const cardRegex = /^[0-9]{16}$/;
    const value = cardNumber.value.replace(/\s/g, '');

    if (value === '') {
      showError(cardNumber, cardNumberError, 'Credit card number is required');
      return false;
    } else if (!cardRegex.test(value)) {
      showError(
        cardNumber,
        cardNumberError,
        'Please enter a valid 16-digit card number'
      );
      return false;
    } else {
      hideError(cardNumber, cardNumberError);
      return true;
    }
  }

  function validateExpiryDate() {
    const expiryRegex = /^(0[1-9]|1[0-2])\/20[2-9][0-9]$/;
    const value = expiryDate.value.trim();

    if (value === '') {
      showError(expiryDate, expiryDateError, 'Expiry date is required');
      return false;
    } else if (!expiryRegex.test(value)) {
      showError(
        expiryDate,
        expiryDateError,
        'Please enter a valid future expiry date (MM/YYYY)'
      );
      return false;
    } else {
      const [month, year] = value.split('/');
      const expiryMonth = parseInt(month, 10);
      const expiryYear = parseInt(year, 10);

      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      if (
        expiryYear < currentYear ||
        (expiryYear === currentYear && expiryMonth < currentMonth)
      ) {
        showError(
          expiryDate,
          expiryDateError,
          'Expiry date must be in the future'
        );
        return false;
      } else {
        hideError(expiryDate, expiryDateError);
        return true;
      }
    }
  }

  function validateCVV() {
    const cvvRegex = /^[0-9]{3}$/;
    const value = cvv.value.trim();

    if (value === '') {
      showError(cvv, cvvError, 'CVV is required');
      return false;
    } else if (!cvvRegex.test(value)) {
      showError(cvv, cvvError, 'Please enter a valid 3-digit CVV');
      return false;
    } else {
      hideError(cvv, cvvError);
      return true;
    }
  }

  function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  }

  function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.style.display = 'none';
  }
});
