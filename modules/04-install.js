import { exec } from 'child_process'

const appName = 'Eset' // Replace this with the name of the app you want to check for
exec(`where ${appName}`, (error, stdout, stderr) => {
  if (error || stderr) return console.error(`Error checking for ${appName}: ${error || stderr}`)
  
  if (stdout.trim()) console.log(`${appName} installer is on this laptop.`)
  else console.log(`${appName} installer is not on this laptop.`)
})

// Executing Eset Security Installer 
const appPath = 'C:\\Users\\VegadelaLyra\\Documents\\ESET\\eset_internet_security_live_installer.exe'

const appProcess = exec(appPath)

appProcess.stdout.on('data', data => console.log(`stdout: ${data}`))
appProcess.stderr.on('data', data => console.error(`stderr: ${data}`))
appProcess.on('close', code => console.log(`child process exited with code ${code}`))