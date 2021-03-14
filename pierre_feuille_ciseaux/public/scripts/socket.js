/* Socket io */

const socket = io();

socket.emit('join');     // join the game

socket.on('welcome', (data) => {
    if (!data.active) {
        hideGame()
        waitStatusText.innerHTML = `Welcome player 1 to the game. Waiting for player 2 to join...`
    } else {
        showGame()
        waitStatusText.innerHTML = `Game can start. Please pick your weapon!!!`
    }
});       // abonnement au message 'welcome' du serveur


socket.on('empty-place-remained', (data) => {
    if (!data.active) {
        hideGame();
        waitStatusText.classList.remove('out')
        waitStatusText.innerHTML = `There are already 2 players in the room, empty place remained`
    }
})


socket.on('game-can-start', () => {
    showGame();
    waitStatusText.innerHTML = `Game can start. Please pick your weapon!!!`
});

socket.on('set-opponent-picked', (opponentPick) => {
    choiceModifier(opponentPicked, opponentPickedImg, opponentPick);
})

socket.on('opponent-picked', (opponentPick) => {
    choiceModifier(opponentPicked, opponentPickedImg, opponentPick);
})

socket.on('result', (result) => displayResult(result));

socket.on('next-round', (data) => {
    if(data.active){
        showGame()
        waitStatusText.innerHTML = `Game can start. Please pick your weapon!!!`
    }
    else {
        hideGame()
        waitStatusText.innerHTML = `Welcome player 1 to the game. Waiting for player 2 to join...`
    }
})

socket.on('resultOpponent', (opponentResult) => displayResult(opponentResult));
