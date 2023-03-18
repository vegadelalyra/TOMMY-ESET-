import { spawn } from 'child_process'

// Run the PowerShell command to uninstall the app
uninstallProgram('WiseMemoryOptimizer')

function uninstallProgram(program) {
  const uninstall = spawn(
    `wmic product where name=${program} call uninstall`, 
    { shell: true})

  uninstall.stdout.on('data', data => console.log(`stdout: ${data}`))
  uninstall.stderr.on('data', data => console.error(`stderr: ${data}`))
  uninstall.on('close', code => console.log(`exited code ${code}`))
}