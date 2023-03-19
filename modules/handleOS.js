import { spawnSync } from 'child_process'

export const handleOS = cmd => spawnSync(cmd, { shell: true })

// outro
// handleOS('start notepad')
// setTimeout(() => process.exit(), 100)