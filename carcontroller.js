class CarController {
    constructor(type) {
        this.up = false;
        this.left = false;
        this.right = false;
        this.back = false;
        switch (type) {
            case "KEYS":
                this.#addKeyboardListeners();
                break;
            case "BOT":
                this.up = true;
                break;
        }
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
                    this.back = true;
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
                    this.back = false;
            }
            // console.table(this);
        }
    }
}