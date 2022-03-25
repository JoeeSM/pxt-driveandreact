// Auto-generated from simulator. Do not edit.
declare namespace robot {
    /**
     * Moves the sprite forward
     */
    //% weight=90
    //% blockId=sampleForward block="forward"
    //% shim=robot::forwardAsync promise
    function forward(): void;

    /**
     * Moves the sprite forward
     * @param compass turn to compass direction
     */
    //% weight=85
    //% blockId=sampleTurn block="turn %compass"
    //% shim=robot::turnAsync promise
    function turn(compass: Compass): void;

    /**
     * Triggers when the robot bumps a wall
     * @param handler 
     */
    //% blockId=onBump block="on bump"
    //% shim=robot::onBump
    function onBump(handler: () => void): void;

}
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //%
    //% shim=console::log
    function log(msg: string): void;

}
    /**
     * A ghost on the screen.
     */
    //%
    declare class Sprite {
        /**
         * The X-coordiante
         */
        //%
        //% shim=.x
        public x: number;

        /**
         * The Y-coordiante
         */
        //%
        //% shim=.y
        public y: number;

        /**
         * Move the thing forward
         */
        //%
        //% shim=.forwardAsync promise
        public forward(): void;

    }
declare namespace sprites {
    /**
     * Creates a new sprite
     * @param objX the sprites x position
     * @param objY the sprites y position
     * @param objWidth the sprites width
     * @param objHeight the sprites height
     */
    //% weight=90
    //% blockId="createSprite" block="Create new sprite|x: %objX|y: %objY|width: %objWidth|height: %objHeight"
    //% shim=sprites::createSprite
    function createSprite(objX: number, objY: number, objWidth: number, objHeight: number): void;

}

// Auto-generated. Do not edit. Really.
