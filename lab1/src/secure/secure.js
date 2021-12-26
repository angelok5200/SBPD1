const { readFileSync, writeFileSync } = require('fs');
const v8 = require('v8');

const users = {
    'pasword': 'user',
    'helya28': 'adminh',
    '1234567': 'admin',
}

const encode = (filePath, content) => {
    writeFileSync(filePath, v8.serialize(content));
}

const decode = (filePath) => {
    return v8.deserialize(readFileSync(filePath));
}

module.exports = {
    encode,
    decode,
    users,
}
