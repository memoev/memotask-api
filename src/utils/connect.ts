import mongoose from "mongoose";
import config from "config";
import log from "./logger";

const connect = async () => {
    const dbUri = config.get<string>('dbUri')

    try {
      await mongoose.connect(dbUri)
      log.info('Connected to MongoDb!');
    } catch (error) {
      log.error('There been an error: #%d', error);
      process.exit(1);
    }

    // return await mongoose.connect(dbUri)
    //   .then(() => {
    //     console.log('Connected to MongoDb!');
    //   })
    //   .catch((error) => {
    //     console.error('There been an error: #%d', error);
    //     process.exit(1);
    //   });
}

export default connect;