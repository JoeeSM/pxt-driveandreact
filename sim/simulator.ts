/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>

namespace pxsim {
    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        runtime.board = new Board();
    };

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    }

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public bus : pxsim.EventBus;
        public sprite : Sprite;
        public object : sprites.CreateSprites;
        public canvas : HTMLCanvasElement;
        public ctx : CanvasRenderingContext2D;
        public image : HTMLImageElement;
        public objArray : Array<sprites.CreateSprites>;
        public objTracker : number;
        
        constructor() {
            super();
            this.sprite = new Sprite();
            this.bus = new pxsim.EventBus(runtime, this);
            this.object = new sprites.CreateSprites();
            this.object.objAmount = 0;
            this.objTracker = 0;
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.image = new Image();
            this.image.src = "/static/robotBoardNorth.png";
            this.canvas.width = window.innerWidth - 10;
            this.canvas.height = window.innerHeight - 10;
            this.ctx = this.canvas.getContext("2d");
            this.objArray = new Array<sprites.CreateSprites>();
            this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
            this.sprite.width = this.image.width;
            this.sprite.height = this.image.height;
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.canvas);

            return Promise.resolve();
        }       
        
        updateView() {
            this.ctx.clearRect(0, 0, this.canvas.width - 10, this.canvas.height - 10);

            //Create and randomize each object for the amount specified
            for(this.objTracker; this.object.objAmount > this.objTracker; this.objTracker++){
                let objectExample = new sprites.CreateSprites();
                objectExample.randomizeSprite();

                //Attempted to specify spawn area for robot 
                do{
                    this.objArray.push(objectExample);
                } while (objectExample.objX < ((innerWidth / 2) - 40) - objectExample.objWidth && objectExample.objX > (innerWidth / 2) + 40 &&
                         objectExample.objY < ((innerHeight / 2) - 40) - objectExample.objHeight && objectExample.objY > (innerHeight / 2) + 40);
            }
            console.log(this.objArray.length.toString());

            if(this.objArray.length > 0){
                for(let i:number = 0; this.objArray.length > i; i++){
                    this.ctx.fillRect(this.objArray[i].objX, this.objArray[i].objY, this.objArray[i].objWidth, this.objArray[i].objHeight);
                }
                
            } 

            //rotate HTML canvas to draw robot image in correct orientation
            if (this.sprite.compass === Compass.north){
                this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
            } else if (this.sprite.compass === Compass.east){
                const angle = 90 * Math.PI / 180;
                this.ctx.save();
                this.ctx.translate(this.sprite.x, this.sprite.y);
                this.ctx.rotate(angle);
                this.ctx.drawImage(this.image, 0, 0 - this.image.height/2);
                this.ctx.restore();
            } else if (this.sprite.compass === Compass.south){
                const angle = 180 * Math.PI / 180;
                this.ctx.save();
                this.ctx.translate(this.sprite.x, this.sprite.y);
                this.ctx.rotate(angle);
                this.ctx.drawImage(this.image, 0 - this.image.width, 0 - this.image.height/2);
                this.ctx.restore();
            } else if (this.sprite.compass === Compass.west){
                const angle = 270 * Math.PI / 180;
                this.ctx.save();
                this.ctx.translate(this.sprite.x, this.sprite.y);
                this.ctx.rotate(angle);
                this.ctx.drawImage(this.image, 0 - this.image.width, 0 - this.image.height/2);
                this.ctx.restore();
            } 
        }
    }
}