const rp = require('request-promise');

const { SLACK_WEBHOOK } = require('./config.js')

const slackOptions = {
    method: 'POST',
    uri: SLACK_WEBHOOK,
    body: {
        // hardcoded for now lol
        text: "text: " + process.env.PNG_PATH,
        fallback: "fallback: " + process.env.PNG_PATH,
        image_url: process.env.PNG_PATH,
        thumb_url: process.env.PNG_PATH,
    },
    json: true,
}
rp(slackOptions).then(response => {
    console.log('Sent to Slack', response);
}).catch((err) => {
    console.log('Slack send error:', err.message);
});