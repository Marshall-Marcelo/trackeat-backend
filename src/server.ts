import { buildApp } from './app.js';
import { env } from './configs/env.js';
import { pool } from './configs/db.js';

const port = env.PORT;
const app = buildApp();

async function startServer() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Connected! DB Time:', result.rows[0].now);

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
    process.exit(1);
  }
}

startServer();
