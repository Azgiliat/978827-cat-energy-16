var form = document.querySelector("form");
var petName = form.querySelector("[name=name]");
var petWeight = form.querySelector("[name=weight]");
var email = form.querySelector("[name=email]");
var phone = form.querySelector("[name=phone]");

form.addEventListener("submit", function (evt) {
  if(petName.classList.contains("form-input-error")) {
    petName.classList.remove("form-input-error");
  }
  if(petWeight.classList.contains("form-input-error")) {
    petWeight.classList.remove("form-input-error");
  }
  if(email.classList.contains("form-input-error")) {
    email.classList.remove("form-input-error");
  }
  if(phone.classList.contains("form-input-error")) {
    phone.classList.remove("form-input-error");
  }

  if (!petName.value) {
    petName.classList.add("form-input-error");
    evt.preventDefault();
  }
  if (!petWeight.value) {
    petWeight.classList.add("form-input-error");
    evt.preventDefault();
  }
  if (!email.value) {
    email.classList.add("form-input-error");
    evt.preventDefault();
  }
  if (!phone.value) {
    phone.classList.add("form-input-error");
    evt.preventDefault();
  }
});
