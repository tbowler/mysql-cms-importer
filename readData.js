import _ from 'lodash';
import moment from 'moment';
import Promise from 'bluebird';
import LineByLineReader from 'line-by-line';

const readFile = (connection, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const start = moment();
      let totalLines = 0;
      let rowsImported = 0;
      const lr = new LineByLineReader(filePath);
      lr.on('error', function (err) {
        // 'err' contains error object
        console.error(err);
        reject(err);
      });
      
      lr.on('line', async function (line) {
        // pause emitting of lines...
        lr.pause();

        if (totalLines > 0) {
          await connection.runInsertQuery(line);
          rowsImported = rowsImported + 1;
        }
        totalLines = totalLines + 1;

        lr.resume();
      });
      
      lr.on('end', function () {
        // All lines are read, file is closed now.
        console.log(`Rows Imported: ${rowsImported}`);
        const complete = moment();
        const result = moment(complete).diff(moment(start), 'seconds');
        console.log( `Process took: ${result} seconds`);
        resolve();
      });
    } catch (error) {
      console.error('Problem reading file in');
      console.error(error);
      reject(error);
    }
  });
}

export default readFile
