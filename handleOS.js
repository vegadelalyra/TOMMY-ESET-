import { spawn } from 'child_process'

export const handleOS = cmd => spawn(cmd, { shell: true })

// outro
setTimeout(() => process.exit(), 100)
// handleOS('start notepad')
