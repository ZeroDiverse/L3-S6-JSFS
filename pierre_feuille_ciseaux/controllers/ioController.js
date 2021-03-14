let users = [];
const choices = ["paper", "scissors", "rock"];

/**
 * This class controls the flow of socket io of the server
 */
class IoController {

    //Init the io socket
    constructor(io) {
        this.io = io;
    }

    /**
     * Register socket for the server
     * @param socket
     */
    registerSocket(socket) {
        socket.on('join', () => {
            this.join(socket)
        });

        socket.on('player-pick', (data) => {
            this.playerPicked(socket, data)
        })

        //TODO
        socket.on('restart', () => {
            if (socket.id === users[0].id) {
                delete users[0].picked
                users[0].status = 'waiting'
                socket.emit('next-round', {active: false})
                if (users[1].status === 'waiting') {
                    users.map(user => user.status = 'in game')
                    socket.emit('next-round', {active: true})
                    socket.broadcast.emit('next-round', {active: true})
                }
            } else if (socket.id === users[1].id) {
                delete users[1].picked
                users[1].status = 'waiting'
                socket.emit('next-round', {active: false})
                if (users[0].status === 'waiting') {
                    users.map(user => user.status = 'in game')
                    socket.emit('next-round', {active: true})
                    socket.broadcast.emit('next-round', {active: true})
                }
            } else {
                return 0;
            }
        })

        //TODO save to users and etc
        socket.on('addScore', () => {

        })

        socket.on('disconnect', async () => {
            this.leave(socket)
        });
    }

    /**
     * This method controls action when user joined
     * @param socket
     * @returns {*}
     */
    join(socket) {
        const user = {
            id: socket.id,
            status: 'waiting'
        };
        if (users.length >= 2) {
            return socket.emit('empty-place-remained', {active: false});
        }
        users.push(user);
        if (users.length === 2) {
            users.map(user => user.status = 'in game')
            socket.emit('welcome', {active: true});
            socket.broadcast.emit('game-can-start');
            //socket.emit('player-2-joined');
            return socket.emit('game-can-start');
        }
        if (users.length === 1) {
            users[0].status = 'waiting'
            socket.emit('welcome', {active: false});
        }
    }

    /**
     * This method is called when user pick the choice of game
     * @param socket
     * @param data
     */
    playerPicked(socket, data) {
        if (users[0] && users[1]) {
            users.map(user => {
                if (user.id === socket.id) {
                    user.picked = data.picked
                }
            })

            let result;

            if (users[0].picked && users[1].picked) {
                if (users[0].id === socket.id) {
                    socket.emit('set-opponent-picked', users[1].picked)
                    socket.broadcast.emit('opponent-picked', users[0].picked)
                    if (users[0].picked === users[1].picked) { //fair always
                        result = 0;
                    } else if (  //All win possibilities
                        (users[0].picked === choices[0] && users[1].picked === choices[2]) ||
                        (users[0].picked === choices[1] && users[1].picked === choices[0]) ||
                        (users[0].picked === choices[2] && users[1].picked === choices[1])
                    ) {
                        result = 1;
                    } else { //if it is not fair and not win is Lose!
                        result = -1;
                    }
                } else {
                    socket.emit('set-opponent-picked', users[0].picked)
                    socket.broadcast.emit('opponent-picked', users[1].picked)
                    if (users[0].picked === users[1].picked) { //fair always
                        result = 0;
                    } else if (  //All win possibilities
                        (users[1].picked === choices[0] && users[0].picked === choices[2]) ||
                        (users[1].picked === choices[1] && users[0].picked === choices[0]) ||
                        (users[1].picked === choices[2] && users[0].picked === choices[1])
                    ) {
                        result = 1;
                    } else { //if it is not fair and not win is Lose!
                        result = -1;
                    }
                }

                socket.emit('result', result)
                return socket.broadcast.emit('resultOpponent', -result);
            }
        }
    }

    /**
     * This method is called when user leave server => delete user from the users list
     * @param socket
     * @returns {*}
     */
    leave(socket) {
        const index = users.findIndex(user => user.id === socket.id);

        if (index !== -1) {
            //console.log(`Someone with id ${socket.id} is now disconnected`);
            return users.splice(index, 1)[0];
        }
    }

}

module.exports = io => new IoController(io);             // fonction qui crée un contrôleur à partir de io
