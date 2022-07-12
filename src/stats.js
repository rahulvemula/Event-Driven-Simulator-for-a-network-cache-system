const { getConfig } = require("./config");
const { mean } = require("./files");
const fs = require('fs');

let responseTimes = [];
let cacheHits = [];
let totalCacheHits = 0;
let totalEventsProcessed = 0;
let totalRequestsProcessed = 0;
let startTime;
let endTime;
let cacheMissRate;

/**
 * Function to append value to response times array
 * @param {float} rt 
 */
module.exports.appendToResponseTimes = (rt) => {
    responseTimes.push(rt);
}

/**
 * Function to append value to cache hits array
 * @param {boolean} ch 
 */
module.exports.appendToCacheHits = (ch) => {
    cacheHits.push(ch);
}

/**
 * Function to increment cache hits
 * @param {number} ch
 */
module.exports.incrementCacheHits = (ch) => {
    totalCacheHits += ch;
}

/**
 * Function to get response times array
 * @returns {Array.<float>}
 */
module.exports.getResponseTimes = () => {
    return responseTimes;
}

/**
 * Function to increment total events processed
 */
module.exports.incrementTotalEvents = () => {
    totalEventsProcessed += 1;
}

module.exports.setTotalRequestsProcessed = (trp) => {
    totalRequestsProcessed = trp;
}

module.exports.startTimer = () => {
    startTime = Date.now();
}

module.exports.endTimer = () => {
    endTime = Date.now();
}

/**
 * Function to print the statistics of the simulation
 */
module.exports.printStats = () => {
    cacheMissRate = 1 - (totalCacheHits / totalRequestsProcessed);
    console.log(
        `Time taken for simulation : ${(endTime - startTime) / 1000}

Cache size: ${getConfig()["cacheSize"]}

No of files: ${getConfig()["numFiles"]}

Total requests : ${totalRequestsProcessed} 

Total Events processed : ${totalEventsProcessed}

Total Cache hits : ${totalCacheHits}

Cache Miss Rate : ${cacheMissRate}

Estimated Inbound Traffic Rate : ${cacheMissRate * parseFloat(getConfig()["requestRate"])} requests / second

Average Access Link Load: ${cacheMissRate * parseFloat(getConfig()["requestRate"]) * mean() / parseFloat(getConfig()["accessLinkBandwidth"])}
`);
}

/**
 * Function to generate csv for results
 */
module.exports.generateCSV = () => {
    let string = `Response Time,Cache hit, cache miss rate,${Object.keys(getConfig())}\n`;
    for(let i=0; i<responseTimes.length;i++){
        if(i==0)
            string += `${responseTimes[i]},${cacheHits[i]},${cacheMissRate},${Object.values(getConfig())}\n`;
        else
            string += `${responseTimes[i]},${cacheHits[i]}\n`;
    }
    fs.writeFile('outputs/stats.csv', string, function (err) {
        if (err) throw err;
        console.log('stats.csv is successfully created in outputs folder.\n');
      });
}
