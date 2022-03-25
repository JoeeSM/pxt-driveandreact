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
        public bus: pxsim.EventBus;
        public sprite : Sprite;
        public object : sprites.createSprites;
        public canvas : HTMLCanvasElement;
        public ctx : CanvasRenderingContext2D;
        public image : HTMLImageElement;
        
        constructor() {
            super();
            this.bus = new pxsim.EventBus(runtime, this);
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.image = new Image();
            this.image.src = "/static/robotBoardNorth.png";
            this.canvas.width = window.innerWidth - 10;
            this.canvas.height = window.innerHeight - 10;
            this.ctx = this.canvas.getContext("2d");
            this.sprite = new Sprite();
            this.object = new sprites.createSprites();
            this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.canvas);

            return Promise.resolve();
        }       
        
        updateView() {
            this.ctx.clearRect(0, 0, this.canvas.width - 10, this.canvas.height - 10);
            if (this.sprite.compass == Compass.north){
                this.image.src = "/static/robotBoardNorth.png";
                this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
            } else if (this.sprite.compass == Compass.east){
                this.image.src = "/static/robotBoardEast.png";
                this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
            } else if (this.sprite.compass == Compass.south){
                this.image.src = "/static/robotBoardSouth.png";
                this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
            } else if (this.sprite.compass == Compass.west){
                this.image.src = "/static/robotBoardWest.png";
                this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
            } 

            if(this.object.objCreate == true){
                //console.log(this.object.objX.toString());
                this.ctx.fillRect(this.object.objX, this.object.objY, this.object.objWidth, this.object.objHeight);
            }            
        }
    }
}