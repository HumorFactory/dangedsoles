var enemy_wrapper = document.getElementById("enemy-wrapper");
var weapon_wrapper = document.getElementById("weapon-wrapper");
var current_enemy = "hollow";
var current_weapon = "stick";
var enemy_integer = 1;
var weapon_integer = 1;
var current_enemy_health = 0;
var soles_count = 0;
var click_count = 0;

var enemy_theme = new Audio("Media/Audio/enemy-theme.ogg");
var alert = new Audio("Media/Audio/ALERT.mp3");
var statistics_view = `<div id="shop-wrapper"><button id="shop-button" onclick="open_shop();">SHOP</button></div><div id="statistics-wrapper"><p class="stats"><span id="click_count">0</span>  Clicks</p><p class="stats"><span id="soles_count">0</span>  Soles</p></div>`;
var enemyHurtArray = [new Audio("Media/Audio/Ow1.mp3"), new Audio("Media/Audio/Ow2.mp3"), new Audio("Media/Audio/Ow3.mp3"), new Audio("Media/Audio/Ow4.mp3")];
// enemy list
var EnemyList = {
    1: {
        "name": "Hollow",
        "image_dancing": "Media/images/DancingHollow.gif",
        "image_hurt": "Media/images/HurtHollow.png",
        "health": 50,
        "alive": true,
        "soles": 10, //Soles
    },
    2: {
        "name": "Big Night Fish",
        "image_dancing": "Media/images/DancingFish.gif",
        "image_hurt": "Media/images/HurtFish.png",
        "health": 100,
        "alive": true,
        "soles": 20,
    },
    3: {
        "name": "Ghost",
        "image_dancing": "Media/images/DancingGhost.gif",
        "image_hurt": "Media/images/HurtGhost.png",
        "health": 500,
        "alive": true,
        "soles" : 100,
    },
    4:{
        "name": "Dead Army",
        "image_dancing": "Media/images/DancingDeadArmy.gif",
        "image_hurt": "Media/images/HurtDeadArmy.png",
        "health":2500,
        "alive":true,
        "soles": 500,
    },
    5:{
        "name": "Eyez",
        "image_dancing":"Media/images/DancingEyez.gif",
        "image_hurt": "Media/images/HurtEyez.png",
        "health": 5000,
        "alive":true,
        "soles": 1000,
    },

}
// weapons list
var WeaponList = {
    1: {
        "name": "Stick",
        "image_default": "Media/images/stick.png",
        "image_hitting": "Media/images/stick.gif",
        "damage": 1,
    },
    2:{
        "name": "Sharpened Stick",
        "image_default": "Media/images/SharpenedStick.png",
        "image_hitting": "Media/images/SharpenedStick.gif",
        "damage": 2, 
    },
    3:{
        "name": "Banished Saber",
        "image_default": "Media/images/BanishedSaber.png",
        "image_hitting": "Media/images/BanishedSaber.gif",
        "damage": 5,
    },
    4:{
        "name": "Knight's short sword",
        "image_default": "Media/images/Kightsshortsword.png",
        "image_hitting": "Media/images/Knightsshortsword.gif",
        "damage": 10,
    }
}
// game functionality
function start_game() {
    document.getElementById("start-screen").remove();
    // theme_loop("play");
    summon_enemy("hollow");
    summon_weapon("stick");
    
    document.getElementById("enemy-container").insertAdjacentHTML("beforebegin", statistics_view);

    full_bar_sequencer();
    quarter_bar_sequencer();
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
    if(enemy_integer % 4 === 0 ) {
        alert.play();
        document.getElementById("warning-message").innerHTML = "WARNING: BOSS FIGHT INCOMING!";
        setInterval(function () {
            document.getElementById("warning-message").innerHTML = "";
        }, 5000);
    }
    current_enemy = name;
    current_enemy_health = EnemyList[enemy_integer].health;
    enemy_wrapper.innerHTML += `<div id="current-enemy"><button class="damage-button" id="damage-enemy" onclick="damageEnemy()"><img id="enemy-image" src="${EnemyList[enemy_integer].image_dancing}"></button></span><img class="weapon" id="weapon-image" src="${WeaponList[weapon_integer].image_default}"></div>`;
    document.getElementById("enemy-container").insertAdjacentHTML("beforebegin", `<progress id="enemy-health" value="${EnemyList[enemy_integer].health}" max="${EnemyList[enemy_integer].health}"></progress><p id="health-label"><span id="current-health">${current_enemy_health}</span>/${EnemyList[enemy_integer].health}</p> <p id="enemy-name">${EnemyList[enemy_integer].name}</p><div id="warning"><p id="warning-message"></p></div>`)
}

function summon_weapon(name) {
    current_weapon = name;
    weapon_wrapper.innerHTML += `<img class="weapon" id="weapon-image" src="${WeaponList[weapon_integer].image_default}">`;
}

function damageEnemy() {

        enemyHurtArray[Math.floor(Math.random() * 4)].play();
        ++click_count;
        document.getElementById("click_count").innerHTML = numberWithCommas(click_count);
        document.getElementById("weapon-image").src = WeaponList[weapon_integer].image_hitting;
        setTimeout(function () {
            document.getElementById("weapon-image").src = WeaponList[weapon_integer].image_default;
        }, 400);


        document.getElementById("enemy-image").src = EnemyList[enemy_integer].image_hurt;
        setTimeout(function () {
            document.getElementById("enemy-image").src = EnemyList[enemy_integer].image_dancing;
        }, 200);

        current_enemy_health -= WeaponList[weapon_integer].damage;
        document.getElementById("enemy-health").value = current_enemy_health;
        document.getElementById("current-health").innerHTML = current_enemy_health;
        
        if(document.getElementById("enemy-health").value <= 0) {
            enemy_wrapper.innerHTML = "";
            document.getElementById("enemy-health").remove();
            document.getElementById("health-label").remove();
            document.getElementById("enemy-name").remove();
            var death = new Audio("Media/Audio/Souls.mp3");
            death.play();
            soles_count += EnemyList[enemy_integer].soles;
            document.getElementById("soles_count").innerHTML = numberWithCommas(soles_count);
            enemy_integer++;
            summon_enemy(EnemyList[enemy_integer]);

        } else {
            return 0;
        }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function open_shop() {
    document.getElementById("shop-container").style.visibility = "visible";
    document.getElementById("shop-container-background").style.visibility = "visible";
}

function close_shop() {
    document.getElementById("shop-container").style.visibility = "hidden";
    document.getElementById("shop-container-background").style.visibility = "hidden";
}