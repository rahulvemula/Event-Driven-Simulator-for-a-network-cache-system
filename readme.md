# Probability - Project

## Team members
- Rahul Vemula
- Lahari Barad

## Prerequisites
1. npm/nodeJS

## Instructions to execute
1. Execute the below command first for all the packages to get installed.

    `npm install`

2. Inputs can be configured by editing the `config.json` file in inputs folder. cacheType can be given as only one of "LRU", "FIFO" and "LF"
Example:
```
{
    "config": {
        "totalRequests": 30000,
        "numFiles": 1000,
        "timeLimit": 600,
        "requestRate": 10.0,
        "networkBandwidth": 100,
        "accessLinkBandwidth": 15,
        "roundTrip": 0.4,
        "paretoAlpha": 2,
        "cacheSize": 1000,
        "cacheType": "LRU",
        "paretoSeed": 2
    }
}
```
3. Now, execute the below command to run the simulation process.

    `npm start`
4. Statistics of the simulation will be logged to the terminal.
5. A `stats.csv` file will be generated in the outputs folder which contains all the details of the simulation. 
