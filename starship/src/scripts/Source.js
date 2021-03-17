export const BULLET_WIDTH = 10
export const BULLET_HEIGHT = 2

export const STARSHIP_WIDTH = 40
export const STARSHIP_HEIGHT = 40
export const STARSHIP_POSITION_X = 40

export const SAUCER_WIDTH = 40
export const SAUCER_HEIGHT = 40

export const EXPLOSION_TIME = 2

export const MoveState = { NONE : 0, UP : 1, DOWN : 2 };
export const LifeState = { DISACTIVE : 0, ACTIVE : 1 };
export const ShootState = { NONE : 0, SHOOTED : 1 };

export const getRandomInt = (min, max) => {    
    	return Math.floor(Math.random() * (max - min + 1)) + min;
}