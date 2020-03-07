# Cryptobot 

## Quickstart

0. clone the repo: 

```
git clone github.com/gzhao408/cryptobot
```

1. Go to coinmarketcap.com and make an account. 

2. Go to your slack and make a new incoming webhoook.

3. Create a file called `config.js` with the following contents: 

```js
const SLACK_WEBHOOK = 'YOUR WEBHOOK HERE'
const CMC_PRO_API_KEYS = ['YOUR API KEYS HERE']

module.exports = {
  SLACK_WEBHOOK,
  CMC_PRO_API_KEYS
}

```

4. we rely on env variable `CSV_PATH` to dump our BTC price data. export it now: e.g. `export CSV_PATH="$HOME/public_html/btc-usd.csv"` or you could just use the e2e script `./run.sh` documented later
5. run `npm install` and `node btc_bot.js`. It should start appending the price of bitcoin to the csv.

## Scraper

Need python3 env to run all our graphing stuff, easiest way with:

```
python3 -m venv venv
pip install -r requirements.txt
```

Simple e2e test:

```
# executes script on interval
./run.sh
```

* Run `node btc_bot.js` to dump to csv
* Creates the graph with `write_graph.py` from csv
* Sends the graph to Slack with `send_slack.js`, on the crossing of some threshold. Or, simply query the public directory GET: `$HOME/public_html/$PNG_PATH`

NOTE: If you're running on the OCF, install node via nvm.