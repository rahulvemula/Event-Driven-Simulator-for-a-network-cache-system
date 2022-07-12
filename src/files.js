const {cumulativeWeightedRandom, calculateCumulativeWeights} = require('./utils.js');

let fileStore = {
    files: [],
    cumulativeWeights: []
}

/**
 * Function to setup the file store according to the inputs
 * @param {int} n - Number of files
 * @param {Array.<float>} fileSizes - Array of file sizes of each file
 * @param {Array.<float>} weights - probability of each file
 * @param {float} totalWeight - Sum of probabilities of all files
 */
module.exports.setupFiles = (n, fileSizes, weights, totalWeight) => {
    for (let i = 0; i < n; i++) {
        fileStore.files.push({
            id: i,
            size: fileSizes[i],
            prob: weights[i] / totalWeight
        });
    }

    fileStore.cumulativeWeights = calculateCumulativeWeights(weights);
}

/**
 * Function to pick a random file based of each file's probability
 * @returns {Object} File
 */
module.exports.getSampleFile = () => {
    // Sample as determined by probability weights.
    let randomFile = cumulativeWeightedRandom(fileStore.files, fileStore.cumulativeWeights);

    if(!randomFile) {
        console.log("File undefined");
    }
    return randomFile;
}

/**
 * Function to calculate the mean of sizes of all the files
 * @returns {float} MeanFileSizes
 */
module.exports.mean = () => {
    return this.size()/fileStore.files.length;
}

/**
 * Function to calculate the sum of sizes of all the files
 * @returns {float} sumFileSizes
 */
module.exports.size = () => {
    let size = 0;
    for(let i=0; i<fileStore.files.length; i++){
        size += fileStore.files[i].size;
    }
    return size;
}