// Quick DB connectivity test using pg and dotenv. Prints only OK/FAILED to avoid leaking secrets.
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });
const { Client } = require('pg');

async function main() {
  const conn = process.env.DATABASE_URL;
  if (!conn) {
    console.error('DATABASE_URL not set');
    process.exit(2);
  }

  const client = new Client({ connectionString: conn });
  try {
    await client.connect();
    await client.query('SELECT 1');
    console.log('DB CONNECT: OK');
    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('DB CONNECT: FAILED', err.message);
    process.exit(1);
  }
}

main();
