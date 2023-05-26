const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Read the JSON data from a file
const rawData = fs.readFileSync('scada.json');
const data = JSON.parse(rawData);

// Extract the headers from the first object
const headers = Object.keys(data[0]);

// Create a CSV writer
const csvWriter = createCsvWriter({
  path: 'scada_data.csv',
  header: headers.map(header => ({ id: header, title: header }))
});

// Write the JSON data to CSV
csvWriter.writeRecords(data)
  .then(() => {
    console.log('CSV file has been written successfully.');
  })
  .catch(error => {
    console.error('Error writing CSV file:', error);
  });

// Count the number of objects in the JSON data
const count = data.length;
console.log(`The JSON data contains ${count} objects.`);
