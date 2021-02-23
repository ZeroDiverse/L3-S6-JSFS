export const MoveState = { LEFT : 0, RIGHT : 1, NONE : 2};

export const DEFINE = {
    SRC_IMG: "images/balle.png",
    SIZE: 48
}

export function alea(n) {
    return Math.floor(Math.random() * Math.floor(n));
}

export function alea_delta(n) {
    var x = Math.floor(Math.random() * Math.floor(n));
    var y = Math.floor(Math.random() * Math.floor(n));

    if (alea(1))
        x = -x;       

    if (alea(1))
        y = -y;

    if(x == 0 && y == 0) 
        return [5,5]

    return [x,y];
}