const getDirObj = (disk, currentDir, file = '') => {

    (currentDir + file).split('/').filter(Boolean).forEach(name => {
        try {
            disk = disk.files[name];
        } catch (e) {
            throw new Error('Unknown path');
        }
    });
    return disk;
}

const delLoop = (disk, keys, count = 0) => {
    if (keys.length - 1 === count) return {...disk, files: {...disk.files, [keys[count]]: undefined}};
    return {
        ...disk, files: {
            ...disk.files, [keys[count]]: delLoop(disk.files, keys, count + 1
            )
        }
    }
}

const deletedDisk = (disk, currentDir, file = '') => {
    const fileNames = (currentDir + file).split('/').filter(Boolean);
    return delLoop(disk, fileNames, 0);
}

const crtLoop = (disk, keys, count = 0, user = 'admin', type = 'directory') => {
    if (keys.length - 1 === count) return {
        ...disk, files: {
            ...disk.files, [keys[count]]: {
                type,
                rights: {
                    read: Object.keys({admin: true, [user]: true}),
                    write: Object.keys({admin: true, [user]: true}),
                    delete: Object.keys({admin: true, [user]: true}),
                },
                files: type === 'directory' ? {} : undefined,
                content: type === 'file' ? '' : undefined,
            }
        }
    };
    return {
        ...disk, files: {
            ...disk.files, [keys[count]]: delLoop(disk.files, keys, count + 1, user, type
            )
        }
    }
}

const createDisk = (disk, currentDir, file = '', user = 'admin', type = 'directory') => {
    const fileNames = (currentDir + file).split('/').filter(Boolean);
    return crtLoop(disk, fileNames, 0, user, type);
}

module.exports = {
    getDirObj,
    delLoop,
    deletedDisk,
    crtLoop,
    createDisk,
}
