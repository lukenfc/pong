
function generateSettings(){
    if(localStorage.getItem('settings') === null){
        var settings = {
            cpu: true,
            timeMode: false,
            scoreLimit: 7,
            timeLimit: 5,
            p1name: 'Player 1',
            p2name: 'Player 2',
            difficulty: 1,
        }
        localStorage.setItem('settings', JSON.stringify(settings));
    }
}