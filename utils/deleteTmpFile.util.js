const fs = require('fs');

const deleteTmpFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(`Error : the file at ${filePath} coulnd't be deleted successfully`)
            return ;
        }

        console.log(`Success : the file at ${filePath} was deleted successfully`)
        return

    })
}

module.exports = { deleteTmpFile };