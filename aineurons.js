class neuralNetwork{
    constructor(neuronCounts){ // how mnay nodes per layer
        this.levels = [];
        for (let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(new Layer(
                neuronCounts[i],neuronCounts[i+1]
                ));
        }
    }

    // what we're doing here is putting the output of the last layer/level as the INPUT for the next layer/level
    static calculateOutputs(givenInputs, layer){
        let outputs = Layer.calculateOutputs(
            givenInputs, layer.levels[0]);
            for (let i=1;i<layer.levels.length;i++){
                outputs = Layer.calculateOutputs(
                    outputs, layer.levels[i]);
            }
        return outputs;
    }
}

class Layer {
    constructor(inputsNodesCount, outputNodesCount) {
        this.inputs = new Array(inputsNodesCount); 
        this.outputs = new Array(outputNodesCount);
        this.biases = new Array(outputNodesCount); // the number for each output which decide if this output/node will 'fire' or stay deactivated

        this.nodesWeight = []; // each nodeWeight will decide if to fire or not depends on its value (between -1 adn 1) 
        for (let i=0 ; i<inputsNodesCount; i++) {
            this.nodesWeight[i] = new Array(outputNodesCount); // set the amounts of connections to the amounts of output heads basically for each output head we set a connection
        }
        
        Layer.#randomize(this); // set the biases to random values
    }

    // static method becuase we want to seralize the object afterwards 
    static #randomize(layer) {
        for(let i=0 ; i<layer.inputs.length;i++){
            for(let j=0 ; j<layer.outputs.length ; j++){
                layer.nodesWeight[i][j] = Math.random() * 2 - 1; // generate random number between -1 and 1
            }
        }

        for (let i=0 ; i<layer.biases.length; i++){
             layer.biases[i] = Math.random() * 2 - 1;
        }
    }

    // values that comes from the sesnors offsets
    static calculateOutputs(givenInputs, layer) {
        for (let i=0 ; i<layer.inputs.length ; i++){
            layer.inputs[i] = givenInputs[i];    
        }

        for (let i=0; layer.outputs.length; i++){ // 1:44:21 video picture explanation
            let sum = 0
            for (let j=0 ; j<layer.inputs.length ; j++){
                sum += layer.inputs[j] * layer.nodesWeight[j][i]; // pic explanation 1:44:41 
            }
        }
        if (sum >  layer.biases[i]){
            layer.outputs[i] = 1; 
        } else {
            layer.outputs[i] = 0;
        }
        return layer.outputs;
    }

}

