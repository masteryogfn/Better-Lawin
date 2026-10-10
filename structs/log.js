function backend() {
    let msg = "";

    for (let i in backend.arguments) {
        msg += `${i == "0" ? "" : " "}${backend.arguments[i]}`;
    }

    console.log(`\x1b[32mLAWIN - BACKEND\x1b[0m: ${msg}`);
}

function bot() {
    let msg = "";

    for (let i in bot.arguments) {
        msg += `${i == "0" ? "" : " "}${bot.arguments[i]}`;
    }

    console.log(`\x1b[33mLAWIN - BOT\x1b[0m: ${msg}`);
}

function xmpp() {
    let msg = "";

    for (let i in xmpp.arguments) {
        msg += `${i == "0" ? "" : " "}${xmpp.arguments[i]}`;
    }

    console.log(`\x1b[34mLAWIN - XMPP\x1b[0m: ${msg}`);
}

function error() {
    let msg = "";

    for (let i in error.arguments) {
        msg += `${i == "0" ? "" : " "}${error.arguments[i]}`;
    }

    console.log(`\x1b[31mLAWIN - ERROR\x1b[0m: ${msg}`);
}

// I DONT KNOW WHY I ADDED DEBUG IM PROBS NOT EVEN GNA USE IT...

function debug() {
    let msg = "";

    for (let i in debug.arguments) {
        msg += `${i == "0" ? "" : " "}${debug.arguments[i]}`;
    }
    
    console.log(`\x1b[35mLAWIN - DEBUG\x1b[0m: ${msg}`)
}

module.exports = {
    backend,
    bot,
    xmpp,
    error,
    debug
}