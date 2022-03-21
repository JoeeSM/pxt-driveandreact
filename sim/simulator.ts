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
            this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.canvas);

            return Promise.resolve();
        }       
        
        updateView() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);


            /*
            
            This does nothing, only need above, rest is done in API?
            
            let destinationX = this.sprite.x;
            let destinationY = this.sprite.y;
            let prevX = this.imageX;
            let prevY = this.imageY;
            const delayLength = 100;

            for(prevX; destinationX > prevX; prevX++){
                this.imageX = this.imageX+1;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, prevX, prevY);
                pxsim.U.delay(delayLength);
            }
            for(prevX; destinationX < prevX; prevX--){
                this.imageX = this.imageX-1;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, prevX, prevY);
                pxsim.U.delay(delayLength);
            }
            for(prevY; destinationY > prevY; prevY++){
                this.imageY = this.imageY+1;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, prevX, prevY);
                pxsim.U.delay(delayLength);
            }
            for(prevY; destinationY < prevY; prevY--){
                this.imageY = this.imageY-1;
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.image, prevX, prevY);
                pxsim.U.delay(delayLength);
            }

            if(destinationX > this.imageX){
                this.imageX = this.imageX+1;
            } else if (destinationX < this.imageX){
                this.imageX= this.imageX-1;
            }
            if(destinationY > this.imageY){
                this.imageY = this.imageY+1;
            } else if (destinationY < this.imageY){
                this.imageY = this.imageY-1;
            }*/


            
        }
    }
}