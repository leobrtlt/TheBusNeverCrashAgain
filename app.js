const { exec } = require('child_process');

const processName = 'TheBusServer.exe'; 
const processPath = 'C:\\Users\\Administrator\\Desktop\\thebus\\TheBus\\Binaries\\Win64\\TheBusServer.exe';

function isProcessRunning(callback) {
    exec(`tasklist`, (err, stdout) => {
        if (err) {
            console.error('Error while check:', err);
            return callback(false);
        }
        callback(stdout.toLowerCase().includes(processName.toLowerCase()));
    });
}

function checkAndStartProcess() {
    isProcessRunning((running) => {
        if (running) {
            console.log(`${processName} is started, no crash detected.`);
        } else {
            console.log(`${processName} has crashed, lets start again...`);
            exec(`start "" "${processPath}" -log -newconsole -useperfthreads`, (error) => {
                if (error) {
                    console.error(`Error while starting ${processName}:`, error);
                } else {
                    console.log(`${processName} was started.`);
                }
            });
        }
    });
}

checkAndStartProcess();
setInterval(checkAndStartProcess, 15000); // check each 15 seconds
