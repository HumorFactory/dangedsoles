var enemy_wrapper = document.getElementById("enemy-wrapper");
var fullbarct = document.getElementById("fullbarct");
var quarbarct = document.getElementById("quarbarct");

var enemy_theme =  new Audio("media/Audio/enemy-theme.ogg");
function start_game() {
  enemy_theme.play();
  enemy_wrapper.innerHTML = '<img src="DancingHollow.gif">';
  full_bar_sequencer();
  quarter_bar_sequencer();
}

function full_bar_sequencer() {
  setTimeout(function () {
    full_bar_sequencer();
  }, 1600);
  fullbarct.innerHTML = parseInt(fullbarct.innerHTML) + 1;
}

function quarter_bar_sequencer() {
  setTimeout(function () {
    quarter_bar_sequencer();
  }, 400);
  quarbarct.innerHTML = parseInt(quarbarct.innerHTML) + 1;
}