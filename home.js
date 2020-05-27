function generateSettings(){
    if(localStorage.getItem('settings') === null){
        var settings = {
            cpu: true,
            timeMode: false,
            scoreLimit: 7,
            timeLimit: 5,
            p1name: 'Player 1',
            p2name: 'Player 2',
            difficulty: 1
        }
        localStorage.setItem('settings', JSON.stringify(settings));
    }
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);
    document.body.style.backgroundColor = 'rgb('+red+','+green+','+blue+')'
    console.log(getComputedStyle(document.body).backgroundColor)
}