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
        public canvas : HTMLCanvasElement;
        public ctx : CanvasRenderingContext2D;
        public image : HTMLImageElement;
        public prevX: number;
        public prevY: number;
        
        constructor() {
            super();
            this.bus = new pxsim.EventBus(runtime, this);
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.image = new Image();
            this.image.src = "/static/robotBoard.png";
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.ctx = this.canvas.getContext("2d");
            this.sprite = new Sprite();
            this.sprite.x = this.canvas.width / 2 - this.image.width / 2;
            this.sprite.y = this.canvas.height / 2 - this.image.height / 2;
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.canvas);
            this.prevX = this.sprite.x;
            this.prevY = this.sprite.y;
            this.ctx.drawImage(this.image, this.prevX, this.prevY);

            return Promise.resolve();
        }       
        
        updateView() {
            let destinationX = this.sprite.x;
            let destinationY = this.sprite.y;
            const delayLength = 100;

            for(let i = this.prevX; destinationX > i; i++){
                this.prevX = this.prevX+1;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, this.prevX, this.prevY);
                pxsim.U.delay(delayLength);
            }
            for(let i = this.prevX; destinationX < i; i--){
                this.prevX = this.prevX-1;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, this.prevX, this.prevY);
                pxsim.U.delay(delayLength);
            }
            for(let i = this.prevY; destinationY > i; i++){
                this.prevY = this.prevY+1;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, this.prevX, this.prevY);
                pxsim.U.delay(delayLength);
            }
            for(let i = this.prevY; destinationY < i; i--){
                this.prevY = this.prevY-1;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, this.prevX, this.prevY);
                pxsim.U.delay(delayLength);
            }

            /*if(destinationX > this.prevX){
                this.prevX = this.prevX+1;
            } else if (destinationX < this.prevX){
                this.prevX= this.prevX-1;
            }
            if(destinationY > this.prevY){
                this.prevY = this.prevY+1;
            } else if (destinationY < this.prevY){
                this.prevY = this.prevY-1;
            }*/


            
        }
    }
}