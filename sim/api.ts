/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.robot {
    /**
     * Moves the sprite forward
     */
    //% weight=90
    //% blockId=sampleForward block="forward"
    export function forwardAsync() {
        return board().sprite.forwardAsync()
    }

    /**
     * Moves the sprite forward
     * @param compass turn to compass direction
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %compass"
    export function turnAsync(compass: Compass) {
        let b = board();

        if (compass == Compass.north)
            b.sprite.compass = Compass.north;
        else if (compass == Compass.east)
            b.sprite.compass = Compass.east;
        else if (compass == Compass.south)
            b.sprite.compass = Compass.south;
        else if (compass == Compass.west)
            b.sprite.compass = Compass.west;
        return pxsim.U.delay(400);
    }

    /**
     * Triggers when the robot bumps a wall
     */
    //% blockId=onBump block="bump"
    export function onBump() {
        let b = board();
        if(b.sprite.onBump == true){
            return true;
        } else {
            return false;
        }
    }
}

namespace pxsim.loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return pxsim.U.delay(ms)
    }
}

function logMsg(m:string) { console.log(m) }

namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function log(msg:string) {
        logMsg("CONSOLE: " + msg)
        // why doesn't that work?
        board().writeSerial(msg + "\n")
    }
}

namespace pxsim {
    /**
     * A ghost on the screen.
     */
    //%
    export class Sprite {
        /**
         * The X-coordiante
         */
        //%
        public x = (window.innerWidth - 10) / 2;
         /**
         * The Y-coordiante
         */
        //%
        public y = (window.innerHeight - 10) / 2;
        public compass:Compass = Compass.north;
        public onBump:boolean = false;
        
        constructor() {
        }
        
        private foobar() {}

        /**
         * Move the thing forward
         */
        //%
        public forwardAsync() {
            let b = board();
            let speed = 1;

            if (this.compass == Compass.north){
                if(b.object.objY + b.object.objHeight >= b.sprite.y && 
                    b.object.objX < b.sprite.x + b.image.width && b.object.objX + b.object.objWidth > b.sprite.x){
                    this.onBump = true;
                    this.x;
                    this.y;
                } else {
                    this.onBump = false;
                    this.x;
                    this.y -= speed;
                }
            } else if (this.compass == Compass.east){
                if(b.object.objX <= b.sprite.x + b.image.height / 2 && 
                    b.object.objY < b.sprite.y + b.image.width && b.object.objY + b.object.objHeight > b.sprite.y){
                    this.onBump = true;
                    this.x;
                    this.y;
                } else {
                    this.onBump = false;
                    this.x += speed;
                    this.y;
                }
            } else if (this.compass == Compass.south){
                if(b.object.objY <= b.sprite.y + b.image.height / 2 &&
                b.object.objX < b.sprite.x + b.image.width && b.object.objX + b.object.objWidth > b.sprite.x){
                    this.onBump = true;
                    this.x;
                    this.y;
                } else {
                    this.onBump = false;
                    this.x;
                    this.y += speed;
                }
            } else if (this.compass == Compass.west){
                if(b.object.objX + b.object.objWidth >= b.sprite.x - b.image.height / 2 && 
                b.object.objY < b.sprite.y + b.image.width && b.object.objY + b.object.objHeight > b.sprite.y){
                    this.onBump = true;
                    this.x;
                    this.y;
                } else {
                    this.onBump = false;
                    this.x -= speed;
                    this.y;
                }
            }

            board().updateView();
            return pxsim.U.delay(1)
        }
    }
}

namespace pxsim.sprites {

    export class CreateSprites {
        public objCreate:number = 0;
        public objX:number;
        public objY:number;
        public objWidth:number;
        public objHeight:number;

        constructor(){}

        public createSprite(objX:number, objY:number, objWidth:number, objHeight:number) {
            this.objCreate += 1;
            this.objX = objX;
            this.objY = objY;
            this.objWidth = objWidth;
            this.objHeight = objHeight;
            board().updateView();
        }
    }

        /**
         * Creates a new sprite
         * @param objX the sprites x position
         * @param objY the sprites y position
         * @param objWidth the sprites width
         * @param objHeight the sprites height
         */
        //% weight=90
        //% blockId="createSprite" block="Create new sprite|x: %objX|y: %objY|width: %objWidth|height: %objHeight"
    export function createSprite(objX:number, objY:number, objWidth:number, objHeight:number){
        return board().object.createSprite(objX, objY, objWidth, objHeight);
    }
}