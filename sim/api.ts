/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.robot {
    /**
     * Moves the sprite forward
     */
    //% weight=90
    //% blockId=sampleForward block="forward"
    export function forwardAsync() {
        return board().sprite.forwardAsync();
    }

    /**
     * Moves the sprite forward
     * @param compass turn to compass direction
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %compass"
    export function turnAsync(compass: Compass) {
        let b = board();

        if (compass === Compass.north)
            b.sprite.compass = Compass.north;
        else if (compass === Compass.east)
            b.sprite.compass = Compass.east;
        else if (compass === Compass.south)
            b.sprite.compass = Compass.south;
        else if (compass === Compass.west)
            b.sprite.compass = Compass.west;
        return pxsim.U.delay(400);
    }

    /**
     * Moves the sprite backwards
     * @param meters how far to reverse
     */
    //% weight=85
    //% blockId=reverse block="reverse %meters meters"
    export function reverseAsync(meters:number){
        return board().sprite.reverseAsync(meters);
    }

    /**
     * Triggers when the robot bumps a wall
     */
    //% blockId=onBump block="bump"
    export function onBump() {
        let b = board();
        if(b.sprite.onBump === true){
            console.log("bump");
            return true;
        } else {
            return false;
        }
    }

    /**
     * returns the direction the sprite is facing
     */
    //% blockId=direction block="direction %compass"
    export function direction(compass:Compass){
        let b = board();
        if (b.sprite.compass === compass){
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
        public compass:Compass;
        public onBump:boolean;
        public width:number;
        public height:number;
        
        constructor() {
            this.compass = Compass.north;
            this.onBump = false;
        }
        
        private foobar() {}

        /**
         * Move the thing forward and detect objects.
         */
        //%
        public forwardAsync() {
            let b = board();
            let speed = 1;

            function collisionDetection(objArray:Array<sprites.CreateSprites>, sprite:Sprite){
                 for (let i:number = 0; objArray.length > i; i++){
                     if(objArray[i].objX + objArray[i].objWidth >= sprite.x - b.sprite.width &&
                        objArray[i].objX <= sprite.x + sprite.width && 
                        objArray[i].objY + objArray[i].objHeight >= sprite.y &&
                        objArray[i].objY <= sprite.y + sprite.height ||
                        b.sprite.x + b.sprite.width >= innerWidth - 10 || 
                        b.sprite.x <= 10 ||
                        b.sprite.y + b.sprite.height >= innerHeight - 10 || 
                        b.sprite.y <= 10){
                            return true;
                    } 
                }
                return false;
            }

            switch (b.sprite.compass){
                case Compass.north:
                    b.sprite.width = b.image.width;
                    b.sprite.height = b.image.height;
                    if(b.objArray.length > 0){
                        if(collisionDetection(b.objArray, b.sprite)){
                                this.onBump = true;
                                this.x;
                                this.y;
                            } else {
                                this.onBump = false;
                                this.x;
                                this.y -= speed;
                            }
                    } else {
                        this.onBump = false;
                        this.x;
                        this.y -= speed;
                    }
                break;

                case Compass.east:
                    b.sprite.width = b.image.height;
                    b.sprite.height = b.image.width;
                    if(b.objArray.length > 0){
                            if(collisionDetection(b.objArray, b.sprite)){
                                this.onBump = true;
                                this.x;
                                this.y;
                            } else {
                                this.onBump = false;
                                this.x += speed;
                                this.y;
                            }
                    } else {
                        this.onBump = false;
                        this.x += speed;
                        this.y;
                    }
                break;

                case Compass.south:
                    b.sprite.width = b.image.width;
                    b.sprite.height = b.image.height;
                    if(b.objArray.length > 0){
                            if(collisionDetection(b.objArray, b.sprite)){
                                this.onBump = true;
                                this.x;
                                this.y;
                            } else {
                                this.onBump = false;
                                this.x;
                                this.y += speed;
                            }
                    } else {
                        this.onBump = false;
                        this.x;
                        this.y += speed;
                    }
                break;

                case Compass.west:
                    b.sprite.width = b.image.height;
                    b.sprite.height = b.image.width;
                    if(b.objArray.length > 0){
                            if(collisionDetection(b.objArray, b.sprite)){
                                this.onBump = true;
                                this.x;
                                this.y;
                            } else {
                                this.onBump = false;
                                this.x -= speed;
                                this.y;
                            }
                    } else {
                        this.onBump = false;
                        this.x -= speed;
                        this.y;
                    }
                break;
            }

            board().updateView();
            return pxsim.U.delay(1);
        }

        /**
         * Move the thing backwards.
         */
        //%
        public reverseAsync(meters : number){
            let b = board();

            if(b.sprite.compass === Compass.north){
                b.sprite.y += meters;
                this.onBump = false;
            } else if (b.sprite.compass === Compass.east){
                b.sprite.x -= meters;
                this.onBump = false;
            } else if (b.sprite.compass === Compass.south){
                b.sprite.y -= meters;
                this.onBump = false;
            } else if (b.sprite.compass === Compass.west){
                b.sprite.x += meters;
                this.onBump = false;
            }

            board().updateView();
            return pxsim.U.delay(400);

        }
    }
}

namespace pxsim.sprites {

    export class CreateSprites {
        public objAmount:number;
        public objX:number;
        public objY:number;
        public objWidth:number;
        public objHeight:number;

        constructor(){}

        public createSprite(objAmount:number) {
            this.objAmount = objAmount;
            board().updateView();
        }

        public randomizeSprite(){
            this.objWidth = Math.floor(Math.random() * (50 - 10) + 10);
            this.objHeight = Math.floor(Math.random() * (50 - 10) + 10);
            this.objX = Math.floor(Math.random() * (innerWidth - 10) + this.objWidth);
            this.objY = Math.floor(Math.random() * (innerHeight - 10) + this.objHeight);
        }
    }

        /**
         * Creates a new sprite
         * @param objAmount amount of random objects to be drawn
         */
        //% weight=90
        //% blockId="createSprite" block="Amount of blocks: %objAmount"
    export function createSprite(objAmount:number){
        return board().object.createSprite(objAmount);
    }
}