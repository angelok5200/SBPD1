const readline = require('readline');
const { commands } = require('../commands/commands');
const { createDisk } = require('../commands/helpers');
const { encode } = require('../secure/secure');
const { join } = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

module.exports = {
    line,
    cliLine,
    password,
    write,
};

const write = (content) => rl.write(content);

const line = (path) => new Promise(resolve => rl.question(path, data => resolve(data)));

const password = () => new Promise(resolve => {
    readline.emitKeypressEvents(rl.input);
    if (rl.input.isTTY) rl.input.setRawMode(true);

    let password = '';
    let done = false;
    readline.cursorTo(rl.output, 0, 0);
    readline.clearScreenDown(rl.output);
    rl.write('Password: ');
    rl.input.on('keypress', (chunk, key) => {
        if(!done){
            if(key.name === 'return') {
                done = true;
                resolve(password);
            }
            else if(password && key.name === 'backspace') password = password.substring(null, password.length - 1);
            else {
                rl.write('\n' + 'Password: ');
                password += key.name;
            }
        }
    });
})

const cliLine = async (state) => {
    const answer = await line(state.file ? '' : state.currentDir + ':$ ');
    const [command, ...params] = answer.split(' ');
    const commandFunc = commands[command];
    if(!commandFunc && !state.file) console.log('Incorrect command "' + command + '"');
    else if(state.file){
        state.disk = JSON.parse(JSON.stringify(createDisk(state.disk, state.currentDir, params[0], state.user, 'file')));
        const diskPath = join(__dirname, '..', '..', 'Disk:B');
        encode(diskPath, newState.disk);
        delete state.file;
        delete state.content;
    }
    else {
        try {
            commandFunc(state, params);
            if(command === 'vi') write('\n' + state.content);
        }catch (e){
            console.log(e);
        }
    }
    await cliLine(state);
}

