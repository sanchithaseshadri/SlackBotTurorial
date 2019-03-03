const SlackBot = require('slackbots');
const axios = require('axios');


const bot = new SlackBot({
    token: 'xoxb-567059771718-565507168227-dCgAgM7MWluPm1pFDc75BIpi',
    name: 'firstbot',
});

// create start handler
bot.on('start', () => {
    const params = {
        icon_emoji : ':smiley:'
    }
    // post a welcome-like initial message to the general channel
    bot.postMessageToChannel(
        'general',
        'laugh at me, i am the first of my kind',
        params
    );
});

// error handler 
bot.on('error', (err) => {
    console.log(err);
});

bot.on('message', (data) => {
    // make sure data is a message
    if (data.type !== 'message') {
        return;
    }

    console.log(data);
    handleMessage(data.text); // handle the text only 
});

function handleMessage(message) {
    // tell some jokes 
    if(message.includes(' seinfeld')) {
        seinfeldJoke();
    }
}

// tell a seinfeld joke
function seinfeldJoke() {
    // axios returns a promise
    axios.get("https://seinfeld-quotes.herokuapp.com/quotes")
    .then(res => {
        // return this to slack 
        const randomJokeIndex = Math.floor(Math.random() * res.data.quotes.length);
        console.log(res.data.quotes[randomJokeIndex].quote); // interested in the quotes property
        const jokes = res.data.quotes;
        params = {
            icon_emoji: ':laughing:'
        };
        bot.postMessageToChannel(
            'general',
            `${jokes[randomJokeIndex].quote}`,
            params
        );
    })
}