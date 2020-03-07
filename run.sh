#!/bin/sh

export CSV_PATH="$HOME/public_html/btc-usd.csv"
export PNG_PATH="$HOME/public_html/btc-usd.png"
export LOG_PATH="$HOME/public_html/bot.log"

# make sure it exists first per run
touch $LOG_PATH 
touch $CSV_PATH
touch $PNG_PATH
 
SLEEP_SECS=60

# utility function to log with timestamp
# XXX: probably add a verbose option
log() {
    echo $(date): "$@";
}

if [ ! -d "./venv" ]; then 
    log "venv not found in $(pwd)"
    exit 1
fi

log "Using $(pwd)/venv"

. venv/bin/activate

log "Starting ./run.sh, scraping every $SLEEP_SECS seconds..." >> $LOG_PATH

#!/bin/sh  
while true  
do      
    log "--------- NEW RUN ---------" >> $LOG_PATH

    log "running btc_bot" >> $LOG_PATH
    node btc_bot.js >> $LOG_PATH

    log "creating graph" >> $LOG_PATH
    python -W ignore write_graph.py >> $LOG_PATH

    # node send_slack.js >> $LOG_PATH

    log "Sleeping $SLEEP_SECS seconds..." >> $LOG_PATH
    sleep $SLEEP_SECS
done