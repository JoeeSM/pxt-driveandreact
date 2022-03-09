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
        public bus: EventBus;
        public baseBoard: Board;
        public sprite : Sprite;
        public canvas : HTMLCanvasElement;
        public image : HTMLImageElement;
        public ctx : CanvasRenderingContext2D;
        
        constructor() {
            super();
            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.ctx = this.canvas.getContext("2d");
            this.image = <HTMLImageElement>document.getElementById("sprite");
            this.bus = new EventBus(runtime, this.baseBoard);
            this.sprite = new Sprite()
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.canvas);

            return Promise.resolve();
        }       
        
        updateView() {
            //this.ctx.drawImage(this.image, 0, 0, this.sprite.x, this.sprite.y);
        }
    }
}