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
        public image : HTMLImageElement;
        public ctx : CanvasRenderingContext2D;
        
        constructor() {
            super();
            this.bus = new pxsim.EventBus(runtime, this);
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.ctx = this.canvas.getContext("2d");
            var img = new HTMLImageElement;
            img.src = '/static/robotBoard.png';
            img.onload = () => {
                this.ctx.drawImage(img, this.canvas.width / 2, this.canvas.height / 2);
            }
            this.sprite = new Sprite()
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.canvas);

            return Promise.resolve();
        }       
        
        updateView() {
            //this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            //this.ctx.drawImage(this.image, this.sprite.x, this.sprite.y);
        }
    }
}