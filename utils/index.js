const { deleteTmpFile } = require('./deleteTmpFile.util');
const {  generateRandomValue } = require('./generateRandomValue.util') ;
const { generateToken } = require('./generateToken.util') ;
const { inputValidation } = require('./inputValidation.util');
const {  pageInfos } = require('./pageInfos.util') ;
const {  timeSinceLastUpdate } = require('./timeSinceLastUpdate.util');
const { whiteSpace } = require('./whiteSpace.util');

module.exports = {
    deleteTmpFile,
    inputValidation,
    generateRandomValue,
    generateToken,
    pageInfos,
    timeSinceLastUpdate,
    whiteSpace,
    
};

