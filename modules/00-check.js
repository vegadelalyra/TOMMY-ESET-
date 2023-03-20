import { spawn } from 'child_process'

  // Replace "Program Name" with the name of the program you want to check for
  const programName = "Eset Security"
  isInstalled(programName)
  // test

export function isInstalled(programName) {   
  // Shell command Get-ItemProperty plus the proper arguments to check wether the given program is installed
  const args = `Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Where-Object { $_.DisplayName -eq '${programName}' } | Measure-Object | Select-Object -ExpandProperty Count`
  
  // spawn the child process and start action
  const ps = spawn('powershell.exe', [args])
  let programInstalled = false
  
  // stdout.data, close and err event-handlers
  ps.stdout.on('data', data => {
    const output = data.toString().trim()
    if (output === '1') programInstalled = true
  })
  
  ps.on('close', () => {
    if (programInstalled) console.log(`${programName} is installed.`)
    else console.log(`${programName} is not installed.`)
  }); ps.on('error', err => console.error(err)) 
}