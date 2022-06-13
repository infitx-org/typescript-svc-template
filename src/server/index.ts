import { Server } from 'http';
import { app } from './app';

let serverInstance: Server

const startServer = async (port: number) : Promise<void> => {
  return new Promise((resolve) => {
    serverInstance = app.listen(port, () => {
      console.log('Server is running on port', port);
      resolve();
    });
  })
}

const stopServer = async () : Promise<void> => {
  return new Promise(resolve => {
    serverInstance.close(() => {
      console.log('Server is stopped');
      resolve();
    });
  })
}

export default {
  startServer,
  stopServer
}
