var menu_open = document.querySelector(".main-nav__list--open");
var open_button = document.querySelector(".main-nav__button");
var main_menu = document.querySelector(".main-nav__list");

menu_open.classList.toggle("main-nav__list--open");
open_button.addEventListener("click", function() {
  main_menu.classList.toggle("menu-show");
  main_menu.classList.toggle("menu-show-animation");
  main_menu.classList.toggle("menu-close-animation");
  main_menu.classList.toggle("menu-close");
});
