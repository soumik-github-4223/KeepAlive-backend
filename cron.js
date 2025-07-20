const cron = require('node-cron');
const axios = require('axios');
const Url = require('./models/Url');

// Ping every 10 minutes
function startPinger() {
  cron.schedule('*/13 * * * *', async () => {
    const urls = await Url.find({});
    console.log(`Pinging ${urls.length} URLs...`);
    for (let { url } of urls) {
      try {
        await axios.get(url);
        console.log(`Pinged: ${url}`);
      } catch (err) {
        console.log(`Failed: ${url}`);
      }
    }
  });
}

module.exports = startPinger;
