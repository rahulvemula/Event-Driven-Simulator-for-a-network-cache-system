/**
 * Function to get the next item in exponential distribution
 * @param {float} lambda 
 * @returns {float}
 */
module.exports.nextExponential = function (lambda) {
    if ('number' !== typeof lambda) {
        throw new TypeError('nextExponential: lambda must be number.');
    }
    if (lambda <= 0) {
        throw new TypeError('nextExponential: ' +
            'lambda must be greater than 0.');
    }
    return - Math.log(1 - Math.random()) / lambda;
}

/**
 * Function to generate pareto distribution
 * @param {float} minimum 
 * @param {float} alpha 
 * @param {int} size 
 * @returns {Array.<float>} An array of generated pareto distribution
 */
 module.exports.generateParetoDistribution = (minimum, alpha, size) => {
    let res = [];
    for (let i = 0; i < size; i++) {
        var u = 1.0 - Math.random();
        res.push(minimum / Math.pow(u, 1.0 / alpha));
    }
    return res;
}

/**
 * Function to cumulative weights from array of weights
 * @param {Array<float>} weights 
 * @returns {Array<float>}
 */
module.exports.calculateCumulativeWeights = function (weights) {
    let cumWeights = [];
    for (i = 0; i < weights.length; i++) {
        cumWeights[i] = weights[i];
        cumWeights[i] += cumWeights[i - 1] || 0;
    }
    return cumWeights;
}

/**
 * Weighted random picking of an element from the items array according to cumulative weights
 * @param {Array.<*>} items 
 * @param {Array.<float>} cumulativeWeights 
 * @returns {*} item
 */
module.exports.cumulativeWeightedRandom = function (items, cumulativeWeights) {
    let i;

    // for (i = 0; i < weights.length; i++)
    //     weights[i] += weights[i - 1] || 0;

    let random = Math.random() * cumulativeWeights[cumulativeWeights.length - 1];

    for (i = 0; i < cumulativeWeights.length; i++)
        if (cumulativeWeights[i] > random)
            break;

    return items[i];
}