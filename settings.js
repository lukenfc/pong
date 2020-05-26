var settings;
function loadSettings(){
    if(!settings){
        settings = JSON.parse(localStorage.getItem('settings'));
    }
    if(settings.cpu){
        document.getElementById('select-1player').style.backgroundColor = 'white';
        document.getElementById('select-2player').style.backgroundColor = 'gray'
        document.getElementById('player2-name').style.display = 'none';
        document.getElementById('difficulty').style.display = 'flex';
    }
    else{
        document.getElementById('select-1player').style.backgroundColor = 'gray';
        document.getElementById('select-2player').style.backgroundColor = 'white';
        document.getElementById('player2-name').style.display = 'flex';
        document.getElementById('difficulty').style.display = 'none'
    }
    if(settings.difficulty === 1){
        document.getElementById('difficulty1').style.backgroundColor = 'white';
        document.getElementById('difficulty2').style.backgroundColor = 'gray';
        document.getElementById('difficulty3').style.backgroundColor = 'gray';
    }
    else if(settings.difficulty === 2){
        document.getElementById('difficulty1').style.backgroundColor = 'gray';
        document.getElementById('difficulty2').style.backgroundColor = 'white';
        document.getElementById('difficulty3').style.backgroundColor = 'gray';
    }
    else{
        document.getElementById('difficulty1').style.backgroundColor = 'gray';
        document.getElementById('difficulty2').style.backgroundColor = 'gray';
        document.getElementById('difficulty3').style.backgroundColor = 'white';
    }
    if(settings.timeMode){
        document.getElementById('select-timeMode').style.backgroundColor = 'white';
        document.getElementById('select-scoreMode').style.backgroundColor = 'gray';
        document.getElementById('number').innerHTML = settings.timeLimit;
        document.getElementById('prefix').innerHTML = 'Time Limit:';
        if(settings.timeLimit > 1){
            document.getElementById('unit').innerHTML = "Minutes";
        }
        else{
            document.getElementById('unit').innerHTML = "Minute";
        }
    }
    else{
        document.getElementById('select-timeMode').style.backgroundColor = 'gray';
        document.getElementById('select-scoreMode').style.backgroundColor = 'white';
        document.getElementById('number').innerHTML = settings.scoreLimit;
        document.getElementById('prefix').innerHTML = 'Score Limit:';
        if(settings.scoreLimit > 1){
            document.getElementById('unit').innerHTML = "Points";
        }
        else{
            document.getElementById('unit').innerHTML = "Point";
        }
    }
    document.getElementById('p1-name').setAttribute('placeholder',settings.p1name);
    document.getElementById('p2-name').setAttribute('placeholder',settings.p2name);
}
function select1Player(){
    settings.cpu = true;
    loadSettings();
}
function select2Player(){
    settings.cpu = false;
    loadSettings();
}
function selectDifficulty(n){
    settings.difficulty = n;
    loadSettings();
}
function selectScoreMode(){
    settings.timeMode = false;
    loadSettings();
}
function selectTimeMode(){
    settings.timeMode = true;
    loadSettings();
}
function increment(){
    if(settings.timeMode){
        settings.timeLimit++;
    }
    else{
        settings.scoreLimit++;
    }
    loadSettings();
}
function decrement(){
    if(settings.timeMode){
        if(settings.timeLimit > 1){
            settings.timeLimit--;
        }
    }
    else{
        if(settings.scoreLimit > 1){
            settings.scoreLimit--;
        }
    }
    loadSettings();
}
function saveSettings(){
    if(document.getElementById('p1-name').value){
        settings.p1name = document.getElementById('p1-name').value;
    }
    if(document.getElementById('p2-name').value){
        settings.p2name = document.getElementById('p2-name').value;
    }
    localStorage.setItem('settings',JSON.stringify(settings));
}