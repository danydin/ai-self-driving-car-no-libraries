class CarController {
    constructor() {
        this.up = false;
        this.left = false;
        this.right = false;
        this.down = false;
        // private method #
        this.#addKeyboardListeners();
    }
    #addKeyboardListeners() {
        document.onkeydown=(event)=>{
            switch (event.key) {
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.up = true;
                    break;
                case "ArrowDown":
                    this.down = true;
            }
            // console.table(this);
        }

        document.onkeyup=(event)=>{
            switch (event.key) {
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.up = false;
                    break;
                case "ArrowDown":
                    this.down = false;
            }
            // console.table(this);
        }
    }
}