const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

/**
 * @param {Array} files 
 */
function findKeys (files) {
    const emitter = new EventEmitter();
    files.forEach(element => {
        fs.readFile(element, 'utf8', (err, con) => {
            if (err) {
                return emitter.emit('error', err);
            }

            emitter.emit('fileRead', con);

            let conObject = JSON.parse(con);
            emitter.emit('keys', Object.keys(conObject))
        })
    });
    return emitter;
}

findKeys(['./node/异步/invoices.json', './node/异步/plays.json'])
    .on('fileRead', file => console.log('file1', file))
    .on('keys', keys => console.log('keys1', keys))
    .on('error', err => console.log('err1', err.message));

// 任何对象可观察
class FindKeys extends EventEmitter {
    constructor (files) {
        super();
        this.files = [];
        if (files && Array.isArray(files)) {
            this.files = [...files];
        }
    }
 
    addFile (file) {
        this.files.push(file);
        return this;
    }

    find () {
        this.files.forEach(element => {
            fs.readFile(element, 'utf8', (err, con) => {
                if (err) {
                    return this.emit('error', err);
                }
    
                this.emit('fileRead', con);
    
                let conObject = JSON.parse(con);
                this.emit('keys', Object.keys(conObject))
            })
        });
        return this;
    }
}

let findKeysObject = new FindKeys();

findKeysObject
    .addFile('./node/异步/invoices.json')
    .addFile('./node/异步/plays.json')
    .find()
    .on('fileRead', file => console.log('file', file))
    .on('keys', keys => console.log('keys', keys))
    .on('error', err => console.log('err', err.message));
    console.log(findKeysObject);