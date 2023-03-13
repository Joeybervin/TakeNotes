var mongoose = require('mongoose');

mongoose.set("strictQuery", true);

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect(process.env.MONGODB_URI, options)
.then(() => {
  console.info('*** Database connection: Success ***');
})
.catch((err) => {
  console.log(`error, failed to connect to the database because --> ${err}`);
});
