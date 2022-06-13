import { app } from './app';

function startServer (port: number) {
  app.listen(port, () => {
      console.log('Server is running on port', port);
  });
}

export default {
  startServer
}
