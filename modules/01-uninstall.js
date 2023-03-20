
import { spawn } from 'child_process'

// Replace "Program Name" with the name of the program you want to check for
const programName = "Wise Memory Optimizer 4.1.8"

const args = `Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\* | Where-Object { $_.DisplayName -eq '${programName}' } | Select-Object -ExpandProperty UninstallString`

const ps = spawn('powershell.exe', [args])
let programInstalled = false

ps.stdout.on('data', data => {
  const output = data.toString().trim()
spawn('C:\\"Program Files"\\Wise\\"Wise Memory Optimizer"\\unins000.exe', {shell: true})
  if (output === '1') programInstalled = true
})

ps.on('close', () => {
  if (programInstalled) console.log(`${programName} is installed.`)
  else console.log(`${programName} is not installed.`)
}); ps.on('error', err => console.error(err))
