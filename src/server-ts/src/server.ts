import ServerManager from "./classes/ServerManager";
import * as packageJs from '../package.json'


const serverManager = ServerManager.getInstance();

const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => res.send(`Server Version: ${packageJs.version}`))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))