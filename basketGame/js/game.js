///start menu
document.querySelector('#difChoose').onmousemove = function (e) {
    let x = e.pageX - e.target.offsetLeft;
    let y = e.pageY - e.target.offsetTop;
    e.target.style.setProperty('--x', x + 'px');
    e.target.style.setProperty('--y', y + 'px');
};
///

let score = 0;
let livesCount = 3;

let number1 = 0; // numbers for item
let number2 = 0;
let flag = 0; // Flag for uslEdit

const screenWidth = window.screen.width;

let difLevel = 10;  //dificulty level(timer speed)

/////////////////////////////////////////////////

difChoose.onclick = function() {   //When dificult level is chosen 
    let dificulty = document.getElementsByName("dificult");
    for(let i = 0; i < dificulty.length; i++) {
        if(dificulty[i].checked) {
            difLevel = 25-(i*3 + 2);
            break;
        }
    }

    gameStart();
}
//////////////////////////////////
///// Game start

function gameStart() {
    startMenu.style.display = "none";
    game.style.display = "block";
    //score = 0;
    //livesCount = 3;
    newItem();

    //////
    let timer = setInterval(function () {  ///Timer, interval, chto xotite
        y += 3;
        item.style.top = y + 'px';
    
        if (y >= 750) {  /// y coordinate limiter for Item
            if(flag == 1) {
                livesCount--;
                if(livesCountChange() == 1) {
                    clearInterval(timer);
                }
            }
            
            y = 0;
            newItem();
        }
    
        if (collisionDetector(hero, item) == 1) {   //collision detector
            if(flag == 1) {
                //alert('*');
                y = 0;
                newItem();
                score++;
                if(score >= 2) {
                    document.location.href = "win.html";
                }
                scor.innerHTML = score;   
            } else {
               //alert('*');
               livesCount--;
               if(livesCountChange() == 1) {
                    clearInterval(timer);
                }
               y = 0;
               newItem();
               scor.innerHTML = score; 
            }
        }
        
    }, difLevel);
}

// some functions
//////////////////////////////////////////////////////////////////////

function randomInt(min, max) {
    //alert(Math.floor(Math.random() * (max-min) + min);
    return Math.floor(Math.random() * (max - min) + min);
}

function newItem() {
    item.style.top = 0 + 'px';
    item.style.left = randomInt(0, 1300) + 'px';

    number1 = randomInt(1, 9);
    number2 = randomInt(1, 9);
    answer = randomInt(0, 2);

    item.innerHTML = number1 + '+' + number2;

    uslEdit();
}

function uslEdit() {
    if (answer == 1) {
        usl.innerHTML = number1 + number2;
        flag = 1;
    } else {
        usl.innerHTML = randomInt(1, 18);
        flag = 0;
    }

}

function collisionDetector(a, b) {
    /*  xP and yP for player
        xI and yI for Item*/

    //alert(xI);

    let obj1 = a.getBoundingClientRect();
    let obj2 = b.getBoundingClientRect();
    if (obj1.x + obj1.width >= obj2.x && obj1.x <= obj2.x + obj2.width && obj1.y + obj1.height >= obj2.y && obj1.y <= obj2.y + obj2.height) {
        return true;
    }
    else {
        return false;
    }
}

function livesCountChange() {
    if(livesCount <= 0) {
        lives.innerHTML = "";
        document.location.href = "lose.html";
    }

    lives.innerHTML = "";

    for(let i = 0; i < livesCount; i++) {
        lives.innerHTML += "❤";
    }
}

///////////////////////////////////////
// Game

newItem();
livesCountChange();

let y = 0; // y coordinate for item
let x0 = 0 // x coordinate for item

let x = 500; // x coordinate for player

hero.style.left = x + 'px';

////


//
function key1(e) {
    if (e.keyCode == 39 && x <= screenWidth-10) {
        x += 18;
        hero.style.left = x + "px";
    }
    if (e.keyCode == 37 && x >= 0) {
        x -= 18;
        hero.style.left = x + "px";
    }
}

document.addEventListener('keydown', key1, false);

