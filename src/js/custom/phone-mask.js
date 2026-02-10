const form = document.querySelector(".registration-form");
const inputPhone = document.getElementById("mobile");
const phoneMask = IMask(inputPhone, { mask: "+{420} 000 000 000" });
form.addEventListener("submit", function (e) {
  e.preventDefault();
  inputPhone.value = "+" + phoneMask.unmaskedValue;
  const formData = new FormData(form);
  
  for (let [key, value] of formData.entries()) {
    //  console.log(key + ":", value);
  }
  inputPhone.value = phoneMask.value;
});
