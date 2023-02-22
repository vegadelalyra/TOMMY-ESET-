import { exec } from 'child_process'

// Replace "Your App Name" with the name of the app you want to uninstall
const appName = "Wise Memory Optimizer"

// Run the PowerShell command to uninstall the app
exec(`powershell.exe Get-AppxPackage *${appName}* | Remove-AppxPackage`, 
(err, stdout, stderr) => {
  if (err) return console.error(`Error: ${err}`)
  return console.log(`Successfully uninstalled ${appName}`)
})