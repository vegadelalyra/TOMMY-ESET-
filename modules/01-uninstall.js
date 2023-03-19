import { spawn } from 'child_process';

const programName = 'ESET Security';

const uninstallCommand = `Get-WmiObject -Class Win32_Product | Where-Object { $_.Name -eq "${programName}" } | ForEach-Object { $_.Uninstall() }`;

const powershell = spawn('powershell.exe', ['-Command', uninstallCommand]);

powershell.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

powershell.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

powershell.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
