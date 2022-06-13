import { Server } from 'http';
import { app } from './app';

let serverInstance: Server

function startServer (port: number) {
  serverInstance = app.listen(port, () => {
      console.log('Server is running on port', port);
  });
}

function stopServer () {
  serverInstance.close(() => {
    console.log('Server is stopped');
  });
}

export default {
  startServer,
  stopServer
}
