var mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI;

mongoose.set("strictQuery", true);

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect(mongoUri, options)
.then(() => {
  console.info('*** Database connection: Success ***');
})
.catch((err) => {
  console.log(mongoUri)
  console.log(`error, failed to connect to the database because --> ${err}`);
});



