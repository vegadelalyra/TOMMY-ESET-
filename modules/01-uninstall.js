import { spawn } from 'child_process'

// Replace "Program Name" with the name of the program you want to check for
const programName = "Eset Security"
uninstallProgram(programName)
// test

export function uninstallProgram(programName) {  
  // Shell command Get-ItemProperty plus the proper arguments to uninstall the given program
  const args = `Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Where-Object { $_.DisplayName -eq '${programName}' } | Select-Object -ExpandProperty UninstallString`
  
  // spawn child process and start action
  const ps = spawn('powershell.exe', [args])

  // stdout.data and err event-handlers
  ps.stdout.on('data', data => {
    const output = data.toString().trim().replace('/I', '/X')
    spawn(output + ' /norestart /passive', {shell: true})
    console.log(output)
  }); ps.stderr.on('data', err => console.error(err)) 
}