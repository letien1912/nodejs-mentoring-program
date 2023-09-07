const os = require('os')
const {exec} = require('child_process');
const fs = require('fs');

const activityMonitorLog = "activityMonitor.log"
const INTERVAL_LOG_CONSOLE = 100;
const INTERVAL_LOG_FILE = 1000;

if (!fs.existsSync(activityMonitorLog)) fs.writeFileSync(activityMonitorLog, '');

const command = os.type() === 'Windows_NT'
  ? 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"'
  : 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1'


const executeCommand = () => new Promise(resolve => {
  exec(command, (error, stdout) => {
    resolve(stdout.trim());
  });
})

setInterval(() => {
  executeCommand().then(data => {
    process.stdout.write('\r');
    process.stdout.write('\x1b[32m' + data);
  })
}, INTERVAL_LOG_CONSOLE)


setInterval(() => {
  executeCommand().then(data => {
    fs.appendFileSync(activityMonitorLog, `${Math.floor(new Date().getTime() / 1000)} : ${data}\n`);
  })
}, INTERVAL_LOG_FILE)
