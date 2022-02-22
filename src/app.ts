import config from "config";
import connect from "./utils/connect";
import log from "./utils/logger";
import createServer from './utils/server';

const port = config.get<number>('port')
const app  = createServer();

app.listen(port, async () => {
    await connect();
    log.info(`Listening on port ${port}`);
})
