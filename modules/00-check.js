import { handleOS } from "../handleOS.js"

// Check if ESET is already installed, if not, download and install

// Microsoft Store Apps && Windows Installer Apps 
const winInstallerApps = 'Get-WmiObject -Class Win32_Product | Select-Object Name, Version, Vendor'

// All apps including third parties apps
const allInstalledApps = 'Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate | Sort-Object DisplayName | Format-Table -AutoSize'

// Is ESET installed? 
// const a = handleOS(winInstallerApps).stdout
// console.log(a);