import { spawn } from 'child_process'

// test
delete_EsetLocal()

// delete the local eset folder
export async function delete_EsetLocal() {
    // get all the windows users on the device
    const users = await new Promise(resolve => {
        let ls = spawn('powershell.exe', ['Get-ChildItem -Name C:\\Users']), list = ''
        ls.stdout.on('data', (data) => list += data)
        ls.stderr.on('data', (data) => console.error(`stderr: ${data}`))
        ls.on('close', () => { 
            list = list.split('\r\n').filter(x => x).splice(1) 
            resolve(list)
        })    
    }); console.log(...users)
    const deleteFolder = path => spawn('powershell.exe', ['-Command', `Remove-Item -Path "${path}" -Recurse`]) 

    // if only one user, deletes the local eset folder once
    const oneUser = () => {
        const path = `C:\\Users\\${process.env.USERNAME}\\AppData\\Local\\ESET` 
        return deleteFolder(path)
    }; if (users.length == 1) return oneUser()
    
    // Remove the ESET folder from each user
    users.forEach(user => {
        const path = `C:\\Users\\${user}\\AppData\\Local\\ESET`
        return deleteFolder(path)
    })
}

/*
$basepath = "C:\Users\$env:USERNAME\AppData\Local\"
New-Item -ItemType Directory -Path "$basepath\ESET"
New-Item -ItemType Directory -Path "$basepath\ESET\subfolder1"
New-Item -ItemType Directory -Path "$basepath\ESET\subfolder2"
New-Item -ItemType Directory -Path "$basepath\ESET\subfolder3"
 create eset folder for testing
*/