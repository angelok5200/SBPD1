const { encode } = require('../secure/secure');
const initData = require('./initData.json');
const { existsSync } = require('fs');

const initDisk = (filePath) => {
    if(existsSync(filePath)) return;
    encode(filePath, initData);
}

module.exports = {
    initDisk,
}
