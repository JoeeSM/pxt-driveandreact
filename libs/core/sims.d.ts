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
     * Moves the sprite backwards
     * @param meters how far to reverse
     */
    //% weight=85
    //% blockId=reverse block="reverse %meters meters"
    //% shim=robot::reverseAsync promise
    function reverse(meters: number): void;

    /**
     * Triggers when the robot bumps a wall
     */
    //% blockId=onBump block="bump"
    //% shim=robot::onBump
    function onBump(): boolean;

    /**
     * returns the direction the sprite is facing
     */
    //% blockId=direction block="direction %compass"
    //% shim=robot::direction
    function direction(compass: Compass): boolean;

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
         * Move the thing forward and detect objects.
         */
        //%
        //% shim=.forwardAsync promise
        public forward(): void;

        /**
         * Move the thing backwards.
         */
        //%
        //% shim=.reverseAsync promise
        public reverse(meters: number): void;

    }
declare namespace sprites {
    /**
     * Creates a new sprite
     * @param objAmount amount of random objects to be drawn
     */
    //% weight=90
    //% blockId="createSprite" block="Amount of blocks: %objAmount"
    //% shim=sprites::createSprite
    function createSprite(objAmount: number): void;

}

// Auto-generated. Do not edit. Really.
