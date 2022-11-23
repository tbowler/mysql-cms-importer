import Connection from './connection.js'; // not {User}, just User
import readFile from './readData.js';
import yargs from 'yargs/yargs';
const args = process.argv.slice(2);

const argv = yargs(process.argv.slice(2)).options({
  host: { type: 'string' },
  user: { type: 'string' },
  password: { type: 'string' },
  database: { type: 'string' },
  fileType: { type: 'string' },
  filePath: { type: 'string' },
}).argv;

const main = async () => {
  const connection = new Connection(argv.host, argv.user, argv.password, argv.database, argv.fileType);
  await connection.create();
  console.log('running file....');
  await readFile(connection, argv.filePath);
  connection.close();
  process.exit(1);
};

main();
