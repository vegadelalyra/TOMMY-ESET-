import { spawn } from 'child_process'

// Replace "Program Name" with the name of the program you want to check for
const programName = "eset"
isInstalled(programName) // test

export function isInstalled(programName, programInstalled = false) {   
  // PowerShell command to get the names of all installed apps
  const args = 'Get-ChildItem HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall | ForEach-Object { Get-ItemProperty $_.PsPath } | Select-Object DisplayName'
  let ps = spawn('powershell.exe', ['-Command', args]), appNames  

  ps.stdout.on('data', data => appNames += data.toString())

  ps.on('close', () => {
    appNames = appNames.split('\r').slice(2).filter(n => n.trim() != '')
    // UNCOMMENT THIS LINE TO LOG ALL INSTALLED APPS 
    console.log('Programs installed in your Windows:', ...appNames, '\n')
    
    const condition = appNames.some(
      n => n.toLowerCase().includes(programName.toLowerCase()))
    
    if (condition) programInstalled = true
    if (programInstalled) console.log(`${programName} is installed.`)
    else console.log(`${programName} is not installed.`)
  }); ps.on('error', err => console.error(err)) 
}