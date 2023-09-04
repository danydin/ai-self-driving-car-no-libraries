class Layer {
    constructor(inputsNodes, outputNodes) {
        this.inputs = new Array(inputsNodes); 
        this.outputs = new Array(outputNodes);
        this.biases = new Array(outputNodes); // the number here for each output will decide if it will 'fire' or not

        this.connectionsPerNodes = []; // amount of connections/neurons from each input to each output 
        for (let i=0 ; i<inputHeads; i++) {
            this.connectionsPerNodes[i] = new Array(outputNodes); // set the amounts of connections to the amounts of output heads basically for each output head we set a connection
        }
        
        Level.#randomize(); // set the biases to random values
    }

    // static method because we need to seralize it 
    static #randomize(layer) {

    }
}

