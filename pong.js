var settings = JSON.parse(localStorage.getItem('settings'));
var p1 = {
    up: false,
    down: false,
    score: 0
}
var p2 = {
    up: false,
    down: false,
    score: 0,
    angle: 10
}
var ball = {
    left: false,
    up: false,
    speed: 32,
    ySpeed: 100
}
var Time = {
    minutes: settings.timeLimit,
    secondsTen: 0,
    secondsOne: 0
}
function updatePlayer1Display() {
    var player1Display = window.getComputedStyle(document.getElementById('P1'));
    var player1Style = document.getElementById('P1').style;
    var gridRowStart = Number.parseInt(player1Display.gridRowStart)
    var gridRowEnd = Number.parseInt(player1Display.gridRowEnd)
    if(p1.up){
        if(gridRowStart > 1){
            player1Style.gridRowStart = gridRowStart - 1;
            player1Style.gridRowEnd = gridRowEnd - 1;
        }
    }
    else if(p1.down){
        if(gridRowEnd < 201){
            player1Style.gridRowStart = gridRowStart + 1;
            player1Style.gridRowEnd = gridRowEnd + 1;
        }
    }
}
function updatePlayer2Display() {
    var player2Display = window.getComputedStyle(document.getElementById('P2'));
    var player2Style = document.getElementById('P2').style;
    var gridRowStart = Number.parseInt(player2Display.gridRowStart);
    var gridRowEnd = Number.parseInt(player2Display.gridRowEnd);
    if(settings.cpu){
        var ballDisplay = window.getComputedStyle(document.getElementById('ball'));
        if(ball.left){
            if(gridRowStart > 90){
                p2.up = true;
                p2.down = false;
            }
            else if(gridRowStart < 90){
                p2.down = true;
                p2.up = false;
            }
            else{
                p2.up = false;
                p2.down = false;
            }
        }
        else{
            if(ballDisplay.gridColumnEnd > 150){
                const gap = Number.parseInt(ballDisplay.gridRowStart) - gridRowStart;
                if(gap > p2.angle){
                    p2.down = true;
                    p2.up = false;
                }
                if(gap < p2.angle){
                    p2.up = true;
                    p2.down = false;
                }
                if(gap === p2.angle){
                    p2.down = false;
                    p2.up = false;
                }
            }
        }
    }
    if(p2.up){
        if(gridRowStart > 1){
            player2Style.gridRowStart = gridRowStart - 1;
            player2Style.gridRowEnd = gridRowEnd - 1;
        }
    }
    else if(p2.down){
        if(gridRowEnd < 201){
            player2Style.gridRowStart = gridRowStart + 1;
            player2Style.gridRowEnd = gridRowEnd + 1;
        }
    }
}
function updateBallDisplayX() {
    var ballDisplay = window.getComputedStyle(document.getElementById('ball'));
    var ballStyle = document.getElementById('ball').style;
    if(ball.left){
        if(Number.parseInt(ballDisplay.gridColumnStart) === 18){
            if(Number.parseInt(ballDisplay.gridRowEnd) > Number.parseInt(window.getComputedStyle(document.getElementById('P1')).gridRowStart) && Number.parseInt(ballDisplay.gridRowStart) < Number.parseInt(getComputedStyle(document.getElementById('P1')).gridRowEnd)){
                paddle1.play();
                ballStyle.gridColumnStart = Number.parseInt(ballDisplay.gridColumnStart)+1;
                ballStyle.gridColumnEnd = Number.parseInt(ballDisplay.gridColumnEnd)+1;
                ball.left = false;
                updateBallSpeedY(Number.parseInt(ballDisplay.gridRowStart)-Number.parseInt(window.getComputedStyle(document.getElementById('P1')).gridRowStart))
                if(ball.speed > 3){
                    ball.speed--;
                    updateBallSpeedX();
                }
            }
            else{
                ballStyle.gridColumnStart = Number.parseInt(ballDisplay.gridColumnStart) - 1;
                ballStyle.gridColumnEnd = Number.parseInt(ballDisplay.gridColumnEnd) - 1;
            }
        }
        else if(Number.parseInt(ballDisplay.gridColumnStart) === 1){
                ballStyle.gridRowStart = 99;
                ballStyle.gridRowEnd = 102;
                ballStyle.gridColumnStart = 18;
                ballStyle.gridColumnEnd = 21;
                ball.left = false;
                ball.speed = 32;
                p2.score++;
                document.getElementById('score_2').innerHTML = p2.score;
                document.getElementById('P1').style.gridRowStart = 90;
                document.getElementById('P1').style.gridRowEnd = 110;
                document.getElementById('P2').style.gridRowStart = 90;
                document.getElementById('P2').style.gridRowEnd = 110;
                updateBallSpeedX();
                updateBallSpeedY(9);
                if(!settings.timeMode){
                    if(p2.score === settings.scoreLimit){
                        endGame();
                        if(settings.cpu){
                            document.getElementById('win').innerHTML = 'You Lose!';
                            defeat.play();
                        }
                        else{
                            document.getElementById('win').innerHTML = settings.p2name + ' Wins!';
                            victory.play();
                        }
                    }
                    else if(p2.score === settings.scoreLimit - 1 || p1.score === settings.scoreLimit - 1){
                        document.getElementById('win').innerHTML = 'Match Point!';
                        matchPointMessage = setTimeout(clearMessage, 1000);
                        goal.play();
                    }
                    else{
                        goal.play();
                    }
                }
                else{
                    goal.play();
                }
        }
        else{
            ballStyle.gridColumnStart = Number.parseInt(ballDisplay.gridColumnStart) - 1;
            ballStyle.gridColumnEnd = Number.parseInt(ballDisplay.gridColumnEnd) - 1;
            console.log(ballDisplay.gridColumnStart);
        }
    }
    else{
        if(Number.parseInt(ballDisplay.gridColumnEnd) === 282){
            if(Number.parseInt(ballDisplay.gridRowEnd) > Number.parseInt(window.getComputedStyle(document.getElementById('P2')).gridRowStart) && Number.parseInt(ballDisplay.gridRowStart) < Number.parseInt(getComputedStyle(document.getElementById('P2')).gridRowEnd)){
                paddle2.play();
                ballStyle.gridColumnStart = Number.parseInt(ballDisplay.gridColumnStart)-1;
                ballStyle.gridColumnEnd = Number.parseInt(ballDisplay.gridColumnEnd)-1;
                ball.left = true;
                updateBallSpeedY(Number.parseInt(ballDisplay.gridRowStart)-Number.parseInt(window.getComputedStyle(document.getElementById('P2')).gridRowStart))
                if(ball.speed > 3){
                    ball.speed--;
                    updateBallSpeedX();
                }
                if(settings.cpu){
                    p2.angle = Math.floor(Math.random()*18)+1;
                }
            }
            else{
                ballStyle.gridColumnStart = Number.parseInt(ballDisplay.gridColumnStart) + 1;
                ballStyle.gridColumnEnd = Number.parseInt(ballDisplay.gridColumnEnd) + 1;
            }
        }
        else if(Number.parseInt(ballDisplay.gridColumnEnd) === 300){
                ballStyle.gridRowStart = 99;
                ballStyle.gridRowEnd = 102;
                ballStyle.gridColumnStart = 279;
                ballStyle.gridColumnEnd = 282;
                ball.left = true;
                ball.speed = 32;
                p1.score++;
                document.getElementById('score_1').innerHTML = p1.score;
                document.getElementById('P1').style.gridRowStart = 90;
                document.getElementById('P1').style.gridRowEnd = 110;
                document.getElementById('P2').style.gridRowStart = 90;
                document.getElementById('P2').style.gridRowEnd = 110;
                updateBallSpeedX();
                updateBallSpeedY(9);
                if(!settings.timeMode){
                    if(p1.score === settings.scoreLimit){
                        endGame();
                        if(settings.cpu){
                            document.getElementById('win').innerHTML = 'You Win!';
                            victory.play();
                        }
                        else{
                            document.getElementById('win').innerHTML = settings.p1name + ' Wins!';
                            victory.play();
                        }
                    }
                    else if(p1.score === settings.scoreLimit - 1 || p2.score === settings.scoreLimit - 1){
                        document.getElementById('win').innerHTML = 'Match Point!';
                        matchPointMessage = setTimeout(clearMessage, 1000);
                        goal.play();
                    }
                    else{
                        goal.play();
                    }
                }
                else{
                    goal.play();
                }
        }
        else{
            ballStyle.gridColumnStart = Number.parseInt(ballDisplay.gridColumnStart) + 1;
            ballStyle.gridColumnEnd = Number.parseInt(ballDisplay.gridColumnEnd) + 1;
            console.log(ballDisplay.gridColumnStart);
        }
    }
}

function updateBallDisplayY(){
    var ballDisplay = window.getComputedStyle(document.getElementById('ball'));
    var ballStyle = document.getElementById('ball').style;
    if(ball.up){
        if(Number.parseInt(ballDisplay.gridRowStart) === 1){
            wall.changeTime(0);
            wall.play();
            ballStyle.gridRowStart = Number.parseInt(ballDisplay.gridRowStart) + 1;
            ballStyle.gridRowEnd = Number.parseInt(ballDisplay.gridRowEnd) + 1;
            ball.up = false;
        }
        else{
            ballStyle.gridRowStart = Number.parseInt(ballDisplay.gridRowStart) - 1;
            ballStyle.gridRowEnd = Number.parseInt(ballDisplay.gridRowEnd) - 1;
        }
    }
    else{
        if(Number.parseInt(ballDisplay.gridRowEnd) === 200){
            wall.changeTime(0);
            wall.play();
            ballStyle.gridRowStart = Number.parseInt(ballDisplay.gridRowStart) - 1;
            ballStyle.gridRowEnd = Number.parseInt(ballDisplay.gridRowEnd) - 1;;
            ball.up = true;
        }
        else{
            ballStyle.gridRowStart = Number.parseInt(ballDisplay.gridRowStart) + 1;
            ballStyle.gridRowEnd = Number.parseInt(ballDisplay.gridRowEnd) + 1;
        }
    }
}

var p1Update;
var p2Update;
var ballXUpdate;
var ballYUpdate;
var matchPointMessage;
var passTime;
var paddle1;
var paddle2;
var wall;
var goal;
var victory;
var defeat;
var beep;
var seconds = settings.timeLimit*60;

function play() {
    if(!settings.cpu){
        document.addEventListener('keydown', function(event){
            switch(event.key){
                case 'w': 
                    p1.up = true;
                    p1.down = false;
                break;
                case 's':
                    p1.up = false;
                    p1.down = true;
                break;
                case 'p': 
                    p2.up = true;
                    p2.down = false;
                break;
                case 'l':
                    p2.up = false;
                    p2.down = true;
                break;
                default: return
            }
        });
        document.addEventListener('keyup', function(event){
            switch(event.key){
                case 'w': 
                    p1.up = false;
                break;
                case 's':
                    p1.down = false;
                break;
                case 'p': 
                    p2.up = false;
                break;
                case 'l':
                    p2.down = false;
                break;
                default: return
            }
        });
    }
    else{
        document.addEventListener('keydown', function(event){
            switch(event.key){
                case 'w': 
                    p1.up = true;
                    p1.down = false;
                break;
                case 's':
                    p1.up = false;
                    p1.down = true;
                break;
                default: return
            }
        });
        document.addEventListener('keyup', function(event){
            switch(event.key){
                case 'w': 
                    p1.up = false;
                break;
                case 's':
                    p1.down = false;
                break;
                default: return
            }
        });
    }
    ball.speed = 32;
    p1Update = setInterval(updatePlayer1Display, 7);
    if(settings.cpu){
        if(settings.difficulty === 1){
            p2Update = setInterval(updatePlayer2Display, 11);
        }
        else if(settings.difficulty === 2){
            p2Update = setInterval(updatePlayer2Display, 8);
        }
        else{
            p2Update = setInterval(updatePlayer2Display, 6);
        }
    }
    else{
        p2Update = setInterval(updatePlayer2Display, 7);
    }
    ballXUpdate = setInterval(updateBallDisplayX, ball.speed/3);
    ballYUpdate = setInterval(updateBallDisplayY, ball.ySpeed);

    document.getElementById('ball').style.backgroundColor = 'white';
    document.getElementById('start').style.display = 'none';
    document.getElementById('quit-button').style.display = 'block';
    document.getElementById('start').setAttribute('onclick','endGame()');
    document.getElementById('win').innerHTML = '';

    if(settings.timeMode){
        passTime = setInterval(clockTick, 1000);
        document.getElementById('time-text').innerHTML = Time.minutes+':'+Time.secondsTen+Time.secondsOne;
    }

    paddle1 = new sound("paddle.m4a");
    paddle2 = new sound("paddle.m4a");
    wall = new sound("wall.m4a");
    goal = new sound("goal.m4a");
    victory = new sound("victory.m4a");
    defeat = new sound("defeat.m4a");
    beep = new sound("beep.m4a");
}
function endGame(){
    clearInterval(p1Update);
    clearInterval(p2Update);
    clearInterval(ballXUpdate);
    clearInterval(ballYUpdate);
    document.getElementById('ball').style.backgroundColor = 'black';
    document.getElementById('ball').style.gridRowStart = 99;
    document.getElementById('ball').style.gridRowEnd = 102;
    document.getElementById('ball').style.gridColumnStart = 149;
    document.getElementById('ball').style.gridColumnEnd = 152;
    document.getElementById('start').innerHTML = 'Play!';
    document.getElementById('start').setAttribute('onclick','play()');
}
function wait(){
    var bool = false;
    function reverseBool(){
        bool = true;
    }
    var timeout = setTimeout(reverseBool,1000);
    while(!bool){
        console.log('hello');
    };
    clearTimeout(timeout);
}
function updateBallSpeedX(){
    clearInterval(ballXUpdate)
    ballXUpdate = setInterval(updateBallDisplayX, ball.speed/3);
}
function updateBallSpeedY(n){
    var input = n - 9;
    if(input < 0){
        ball.up = true;
        input *= -1;
    }
    else{
        ball.up = false;
    }
    clearInterval(ballYUpdate);
    if(input !== 0){
        const yValue = ball.speed/3 + (48 - 4*input);
        ballYUpdate = setInterval(updateBallDisplayY, yValue);
    }
}
function clearMessage(){
    document.getElementById('win').innerHTML = '';
    clearTimeout(matchPointMessage);
}
function clockTick(){
    if(Time.secondsOne === 0){
        if(Time.secondsTen === 0){
            if(Time.minutes === 0){
                if(p1.score > p2.score){
                    clearInterval(passTime);
                    document.getElementById('time').style.display = 'none';
                    endGame();
                    if(settings.cpu){
                        document.getElementById('win').innerHTML = 'You Win!';
                        victory.play();
                    }
                    else{
                        document.getElementById('win').innerHTML = settings.p1name + ' Wins!';
                        victory.play();
                    }
                }
                else if(p2.score > p1.score){
                    clearInterval(passTime);
                    document.getElementById('time').style.display = 'none';
                    endGame();
                    if(settings.cpu){
                        document.getElementById('win').innerHTML = 'You Lose!';
                        defeat.play();
                    }
                    else{
                        document.getElementById('win').innerHTML = settings.p2name + ' Wins!';
                        victory.play();
                    }
                }
                else{
                    settings.timeMode = false;
                    settings.scoreLimit = p1.score + 1;
                    var ballStyle = document.getElementById('ball').style;
                    ballStyle.gridRowStart = 99;
                    ballStyle.gridRowEnd = 102;
                    ballStyle.gridColumnStart = 279;
                    ballStyle.gridColumnEnd = 282;
                    ball.left = true;
                    ball.speed = 32;
                    document.getElementById('time').style.display = 'none';
                    document.getElementById('P1').style.gridRowStart = 90;
                    document.getElementById('P1').style.gridRowEnd = 110;
                    document.getElementById('P2').style.gridRowStart = 90;
                    document.getElementById('P2').style.gridRowEnd = 110;
                    updateBallSpeedX();
                    updateBallSpeedY(9);
                    document.getElementById('win').innerHTML = 'Sudden Death!';
                    matchPointMessage = setTimeout(clearMessage, 1000);
                    clearInterval(passTime);
                }
            }
            else{
                Time.minutes--;
                Time.secondsTen = 5;
                Time.secondsOne = 9;
            }
        }
        else{
            Time.secondsTen--;
            Time.secondsOne = 9;
        }
    }
    else{
        Time.secondsOne--;
    }
    seconds--;
    if(seconds < 6 && seconds > -1){
        beep.changeTime(0);
        beep.play();
    }
    document.getElementById('time-text').innerHTML = Time.minutes+':'+Time.secondsTen+Time.secondsOne;
}
function sound(src){
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute('preload','auto');
    this.sound.setAttribute('controls','none');
    this.sound.style.display = 'none'
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
    this.changeTime = function(n){
        this.sound.currentTime = n;
    }
}