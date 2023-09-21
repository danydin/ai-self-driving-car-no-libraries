class neuronNetwork{
    constructor(neuronCounts){ // how mnay nodes per layer
        this.levels = [];
        for (let i=0;i<neuronCounts.length-1;i++){
            this.levels.push(new Layer(
                neuronCounts[i],neuronCounts[i+1]
                ));
        }
    }

    static algorithmNeurons(givenInputs, layer){
        let outputs = Layer. /
    }

}

class Layer {
    constructor(inputsNodes, outputNodes) {
        this.inputs = new Array(inputsNodes); 
        this.outputs = new Array(outputNodes);
        this.biases = new Array(outputNodes); // the number for each output which decide if this output/node will 'fire' or stay deactivated

        this.nodesWeight = []; // each nodeWeight will decide if to fire or not depends on its value (between -1 adn 1) 
        for (let i=0 ; i<inputHeads; i++) {
            this.nodesWeight[i] = new Array(outputNodes); // set the amounts of connections to the amounts of output heads basically for each output head we set a connection
        }
        
        Level.#randomize(); // set the biases to random values
    }

    // static method becuase we want to seralize the object afterwards 
    static #randomize(layer) {
        for(let i=0 ; i<layer.inputs.length;i++){
            for(let j=0 ; j<layerouts.length ; j++){
                layer.nodesWeight[i][j] = Math.randon() * 2 - 1; // generate random number between -1 and 1
            }
        }

        for (let i=0 ; i<layer.biases.length; i++){
             layer.biases[i] = Math.randon() * 2 - 1;
        }
    }

    // now we need to compute the output for each node based on the weights and biases from the randomize method  
    static calculateOutputs(givenInputs, layer) {
        for (let i=0 ; i<layer.inputs.length ; i++){
            level.inputs[i] = givenInputs[i];    
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

