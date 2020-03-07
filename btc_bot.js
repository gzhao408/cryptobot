const rp = require('request-promise');
const fs = require('fs')
var csvWriter = require('csv-write-stream')

const {CMC_PRO_API_KEYS} = require('./config.js')
const RAND_KEY = CMC_PRO_API_KEYS[Math.floor(Math.random() * CMC_PRO_API_KEYS.length)]

const CSV_PATH = process.env.CSV_PATH;

var writer = null;
if (!fs.existsSync(CSV_PATH))
  writer = csvWriter({ headers: ["price", "timestamp"]});
else
  writer = csvWriter({sendHeaders: false});


const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '1',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': RAND_KEY
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response => {
  var timestamp = response.status.timestamp;
  var price = response.data[0].quote.USD.price;
  console.log('[', timestamp, '] Bitcoin Price:', price);

  writer.pipe(fs.createWriteStream(CSV_PATH, {flags: 'a'}))
  writer.write({price: price, timestamp: timestamp})
  writer.end()

}).catch((err) => {
  console.log('API call error:', err.message);
});
