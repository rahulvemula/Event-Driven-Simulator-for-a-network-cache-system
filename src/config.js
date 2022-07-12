let config = {};

/**
 * Function to initialize config from the input file
 * @param {Object} input 
 */
module.exports.initConfig = (input) => {
    config = input;
}

/**
 * Function to get the config
 * @returns {Object} config
 */
module.exports.getConfig = () => { return config }