import { buildApp } from './app.js';
import { env } from './configs/env.js';
import morgan from 'morgan';
import { pool } from './configs/db.js';

const port = env.PORT;
const app = buildApp();

const environment = env.ENVIRONMENT;
app.use(environment === 'dev' ? morgan('dev') : morgan('tiny'));

async function startServer() {
  try {
    await pool.query('SELECT 1');
    console.log('Connected to DB');

    const server = app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });

    process.on('SIGTERM', () => {
      console.log('SIGERM signal received: closing HTTP server');
      server.close(async () => {
        await pool.end();
        console.log('Server closed');
      });
    });
  } catch (error) {
    console.error('Error Occured', error);
  }
}

startServer();
