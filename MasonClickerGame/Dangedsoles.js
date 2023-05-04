var enemy_wrapper = document.getElementById("enemy-wrapper");
var weapon_wrapper = document.getElementById("weapon-wrapper");
var current_enemy = "hollow";
var current_weapon = "stick";

var enemy_theme = new Audio("media/Audio/enemy-theme.ogg");

var enemyHurtArray = [new Audio("media/Audio/Ow1.mp3"), new Audio("media/Audio/Ow2.mp3"), new Audio("media/Audio/Ow3.mp3"), new Audio("media/Audio/Ow4.mp3")];
var EnemyList = {
    "hollow": {
        "image_dancing": "Media/images/DancingHollow.gif",
        "image_hurt": "Media/images/HurtHollow.png",
        "health": 100,
        "alive": true,
    },
    "fish": {
        "image_dancing": "Media/images/DancingFish.gif",
        "image_hurt": "Media/images/HurtFish.png",
        "health": 200,
        "alive": true,
    },
    "ghost_man": {
        "image_dancing": "Media/images/DancingFish.gif",
        "image_hurt": "Media/images/HurtFish.png",
        "health": 5000,
        "alive": true,
    }
}

var WeaponList = {
    "stick": {
        "image_default": "Media/images/stick.png",
        "image_hitting": "Media/images/stick.gif",
        "damage": 1,
    }
}

function start_game() {
    document.getElementById("start-screen").remove();
    // theme_loop("play");
    summon_enemy("hollow");
    summon_weapon("stick");
    
    full_bar_sequencer();
    quarter_bar_sequencer();

    
}

function full_bar_sequencer() {
    setTimeout(function () {
    full_bar_sequencer();
    }, 1600);
}

function quarter_bar_sequencer() {
    setTimeout(function () {
    quarter_bar_sequencer();
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
    enemy_wrapper.innerHTML += `<div id="current-enemy"><button class="damage-button" id="damage-enemy" onclick="damageEnemy()"><img id="enemy-image" src="${EnemyList[name].image_dancing}"></button>`;
    document.getElementById("enemy-container").insertAdjacentHTML("beforebegin", `<progress id="enemy-health" value="${EnemyList[name].health}" max="${EnemyList[name].health}"></progress>`) 
}

function summon_weapon(name) {
    current_weapon = name;
    weapon_wrapper.innerHTML += `<img class="weapon" id="weapon-image" src="${WeaponList[name].image_default}">`;
}

function damageEnemy() {

        enemyHurtArray[Math.floor(Math.random() * 5)].play();
        document.getElementById("weapon-image").src = WeaponList[current_weapon].image_hitting;
        setTimeout(function () {
            document.getElementById("weapon-image").src = WeaponList[current_enemy].image_default;
        }, 400);


        document.getElementById("enemy-image").src = EnemyList[current_enemy].image_hurt;
        setTimeout(function () {
            document.getElementById("enemy-image").src = EnemyList[current_enemy].image_dancing;
        }, 200);

        document.getElementById("enemy-health").value -= 20;
        
        if(document.getElementById("enemy-health").value <= 0) {
            enemy_wrapper.innerHTML = "";
            document.getElementById("enemy-health").remove();
            var death = new Audio("media/audio/purchase.mp3");
            death.play();
            summon_enemy("fish");

        } else {
            return 0;
        }
}
