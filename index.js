/**
 * @file index.js
 * @summary Entry file, responsible for instantiating the server
 * @description This file is responsible for starting and creating multiple instances of a node js server.
 * The instances are created based on the environment and the number of CPU cores available in the machine.
 * If the environment is "DEVELOPMENT", only one instance of the app will be created.
 * */
const cluster = require("cluster");
const { cpus } = require("os");
const { commonConstants } = require("./src/constants");

// bind root directory to a global variable to ease the access of module paths while development
global.__basesrcdir = __dirname + "/src";
global.__basedir = __dirname;

const bootScript = "./server.js";

const { IS_CLUSTERING_ENABLED } = commonConstants;

if (IS_CLUSTERING_ENABLED && cluster.isMaster) {
    const cpuCount = cpus().length;
    // fork node processes

    for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
    }

    // listen for dying workers
    cluster.on("exit", (worker, code) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            process.stdout.write(`worker ${worker.id} crashed. Starting a new worker... \n`);
            cluster.fork();
        }
    });

    process.on("SIGUSR2", () => {
        // delete cached modules
        delete require.cache[require.resolve(bootScript)];
        const workerProcesses = Object.keys(cluster.workers);

        workerProcesses.forEach(worker => {
            process.stdout.write(`Killing ${worker} \n`);
            cluster.workers[worker].disconnect();
            cluster.workers[worker].on("disconnect", () => {
                process.stdout.write(`Shutdown complete for ${worker} \n`);
            });
            const newWorker = cluster.fork();

            newWorker.on("listening", () => {
                process.stdout.write(`New worker: ${worker} is listening now. \n`);
            });
        });
    });
} else {
    // clustering is not enabled OR process is worker, require server file to create server
    require(bootScript);
}
