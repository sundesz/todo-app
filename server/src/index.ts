import http from 'http';
import app from './app';
import { connectToDatabase } from './db';

import { PORT } from './config';

const server = http.createServer(app);

const start = async () => {
  await connectToDatabase();
  server.listen(PORT, () => console.log(`Server is running at ${PORT}`));
};

void start();



// I got this error when using docker for postgres
// ConnectionError [SequelizeConnectionError]: getaddrinfo EAI_AGAIN postgresdb
//     at Client._connectionCallback (/home/sandesh/Documents/react/todo-app/server/node_modules/sequelize/lib/dialects/postgres/connection-manager.js:189:24)
//     at Client._handleErrorWhileConnecting (/home/sandesh/Documents/react/todo-app/server/node_modules/pg/lib/client.js:305:19)
//     at Client._handleErrorEvent (/home/sandesh/Documents/react/todo-app/server/node_modules/pg/lib/client.js:315:19)
//     at Connection.emit (node:events:394:28)
//     at Socket.reportStreamError (/home/sandesh/Documents/react/todo-app/server/node_modules/pg/lib/connection.js:52:12)
//     at Socket.emit (node:events:394:28)
//     at emitErrorNT (node:internal/streams/destroy:157:8)
//     at emitErrorCloseNT (node:internal/streams/destroy:122:3)
//     at processTicksAndRejections (node:internal/process/task_queues:83:21) {
//   parent: Error: getaddrinfo EAI_AGAIN postgresdb
//       at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:71:26) {
//     errno: -3001,
//     code: 'EAI_AGAIN',
//     syscall: 'getaddrinfo',
//     hostname: 'postgresdb'
//   },
//   original: Error: getaddrinfo EAI_AGAIN postgresdb
//       at GetAddrInfoReqWrap.onlookup [as oncomplete] (node:dns:71:26) {
//     errno: -3001,
//     code: 'EAI_AGAIN',
//     syscall: 'getaddrinfo',
//     hostname: 'postgresdb'
//   }
// }
