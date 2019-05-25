var orderButtons = document.querySelectorAll(".product-card__button");
var orderButtonsAdditional = document.querySelectorAll(".additional-product__button");
var overlay = document.querySelector(".overlay");
var orderWindow = document.querySelector(".order");
var orderWindowCloseButton = document.querySelector(".order__close");
var i = 0;

orderWindowCloseButton.addEventListener("click", function(evt) {
  overlay.classList.add("modal");
  overlay.classList.remove("modal-show");
  orderWindow.classList.add("modal");
  orderWindow.classList.remove("modal-show");
});

for (i; i < orderButtons.length; i++) {
  orderButtons[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    overlay.classList.toggle("modal");
    overlay.classList.toggle("modal-show");
    orderWindow.classList.toggle("modal");
    orderWindow.classList.toggle("modal-show");
  });
}

for (i=0; i < orderButtonsAdditional.length; i++) {
  orderButtonsAdditional[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    overlay.classList.toggle("modal");
    overlay.classList.toggle("modal-show");
    orderWindow.classList.toggle("modal");
    orderWindow.classList.toggle("modal-show");
  });
}
