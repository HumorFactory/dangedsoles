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
<<<<<<< Updated upstream
  }, 400);
  quarbarct.innerHTML = parseInt(quarbarct.innerHTML) + 1;
=======
    }, 400);
}

function theme_loop(status) {
    if(status == "play") {
        enemy_theme.play();
        setTimeout(function () {
            theme_loop("play");
        }, 227000);
    } else if(status=="stop") {
        enemy_theme.stop();
    } else {
        console.log("You must specify a status in theme_loop(status);")
    }
}

function summon_enemy(name) {
    current_enemy = name;
    enemy_wrapper.innerHTML += `<div id="current-enemy"><button class="damage-button" id="damage-enemy" onclick="damageEnemy()"><img id="enemy-image" src="${EnemyList[enemy_integer].image_dancing}"></button><p>${EnemyList[enemy_integer].name}</p></span></div>`;
    document.getElementById("enemy-container").insertAdjacentHTML("beforebegin", `<progress id="enemy-health" value="${EnemyList[enemy_integer].health}" max="${EnemyList[enemy_integer].health}"></progress>`) 
}

function summon_weapon(name) {
    current_weapon = name;
    weapon_wrapper.innerHTML += `<img class="weapon" id="weapon-image" src="${WeaponList[weapon_integer].image_default}">`;
}

function damageEnemy() {

        enemyHurtArray[Math.floor(Math.random() * 5)].play();
        document.getElementById("weapon-image").src = WeaponList[weapon_integer].image_hitting;
        setTimeout(function () {
            document.getElementById("weapon-image").src = WeaponList[weapon_integer].image_default;
        }, 400);


        document.getElementById("enemy-image").src = EnemyList[enemy_integer].image_hurt;
        setTimeout(function () {
            document.getElementById("enemy-image").src = EnemyList[enemy_integer].image_dancing;
        }, 200);

        document.getElementById("enemy-health").value -= 1;
        
        if(document.getElementById("enemy-health").value <= 0) {
            enemy_wrapper.innerHTML = "";
            document.getElementById("enemy-health").remove();
            var death = new Audio("media/audio/Souls.mp3");
            death.play();
            enemy_integer++;
            summon_enemy(EnemyList[enemy_integer]);

        } else {
            return 0;
        }
>>>>>>> Stashed changes
}