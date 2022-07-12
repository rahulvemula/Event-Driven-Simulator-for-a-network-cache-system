const fs = require('fs');
const { initConfig, getConfig } = require('./src/config.js');
const { PriorityQueue } = require('./src/priorityQueue.js');
const { NewRequestEvent, FileRecievedEvent } = require('./src/events.js');
const { setupFiles, getSampleFile, verifyFiles } = require('./src/files.js');
const { setupCache } = require('./src/cache.js');
const { printStats, incrementTotalEvents, setTotalRequestsProcessed, startTimer, endTimer, generateCSV } = require('./src/stats.js');
const { generateParetoDistribution } = require('./src/utils.js')

const inputFileName = "config.json";

var inputConfig = JSON.parse(fs.readFileSync('inputs/' + inputFileName, 'utf8'));
initConfig(inputConfig.config);

//console.log(JSON.stringify(inputConfig, null, 2));

// File i has a size Si, which is a sample drawn from a Pareto distribution (heavy tail),
// F_S, with mean μ (e.g., μ= 1 MB).
let paretoAlpha = getConfig()["paretoAlpha"];
let num_files = getConfig()["numFiles"];
let paretoSeed = getConfig()["paretoSeed"];
let totalRequests = getConfig()["totalRequests"];
let time_limit = getConfig()["timeLimit"];

let pQueue = new PriorityQueue({
    compare: (e1, e2) => {
        return e1.time < e2.time ? -1 : 1;
    }
});

// Sample from pareto distribution for the file_sizes, mean should be ~1
let file_sizes = generateParetoDistribution(paretoSeed, paretoAlpha, num_files);

// Sample from pareto distribution for the file probabilities,
// We then calculate the file probability as probabilitie[i]/sum(probabilities)
let probabilities = generateParetoDistribution(paretoSeed, paretoAlpha, num_files);
let totalProbability = probabilities.reduce((partialSum, a) => partialSum + a, 0);

let currentTime = 0;
let requestsProcessed = 0;

setupFiles(num_files, file_sizes, probabilities, totalProbability);
let cache = setupCache(getConfig()["cacheType"], parseFloat(getConfig()["cacheSize"])); //This should setup the cache according to the cache stratergy

pQueue.enqueue(new NewRequestEvent(currentTime, getSampleFile()));

startTimer();

while (requestsProcessed < totalRequests || currentTime < time_limit) {
    let event = pQueue.dequeue();
    currentTime = event.time;
    event.process(pQueue, cache, currentTime);
    incrementTotalEvents();
    if (event instanceof FileRecievedEvent)
        requestsProcessed += 1
}

endTimer();

setTotalRequestsProcessed(requestsProcessed);
printStats();
generateCSV();