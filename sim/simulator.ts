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
        public object : sprites.CreateSprites;
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
            this.object = new sprites.CreateSprites();
            this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.canvas);

            return Promise.resolve();
        }       
        
        updateView() {
            this.ctx.clearRect(0, 0, this.canvas.width - 10, this.canvas.height - 10);

            //if(this.object.objCreate == true){
            //    this.ctx.fillRect(this.object.objX, this.object.objY, this.object.objWidth, this.object.objHeight);
            // }   

            for(let i:number = 0; this.object.objCreate > i; i++){
                console.log(this.object.objCreate.toString());
                this.ctx.fillRect(this.object.objX, this.object.objY, this.object.objWidth, this.object.objHeight);
            }

            if (this.sprite.compass == Compass.north){
                this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
            } else if (this.sprite.compass == Compass.east){
                const angle = 90 * Math.PI / 180;
                this.ctx.save();
                this.ctx.translate(this.sprite.x, this.sprite.y);
                this.ctx.rotate(angle);
                this.ctx.drawImage(this.image, 0, 0 - this.image.height/2);
                this.ctx.restore();
            } else if (this.sprite.compass == Compass.south){
                const angle = 180 * Math.PI / 180;
                this.ctx.save();
                this.ctx.translate(this.sprite.x, this.sprite.y);
                this.ctx.rotate(angle);
                this.ctx.drawImage(this.image, 0 - this.image.width, 0 - this.image.height/2);
                this.ctx.restore();
            } else if (this.sprite.compass == Compass.west){
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