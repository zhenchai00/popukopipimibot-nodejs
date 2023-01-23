const api = require('./api.js');

exports.init = (Bot, log) => {
    Bot.onText(/\/help/, (msg) => {
        log.notice('[help] ' + __filename, 'Executed - ' + msg.from.username);
        return Bot.sendMessage(msg.chat.id, "Hi, @"+msg.from.username+" you can type /help");
    });

    Bot.onText(/\/start/, (msg) => {
        log.notice('[start] ' + __filename, 'Executed - ' + msg.from.username);
        return Bot.sendMessage(msg.chat.id, "Subscribe my OnlyFans!!! Thanks you!!! 😘");
    });

    Bot.onText(/\/ee/, (msg) => {
        log.notice('[random] ' + __filename, 'Executed - ' + msg.from.username);
        return Bot.sendMessage(msg.chat.id, "@"+msg.from.username+" Fuck you 🖕");
    });

    /**
     * The following block of code are about getting the information of Malaysia weather which provided by Malaysian
     * Meteorological Department APIs.
     * 
     * By using the command below may use '/met'. type --help will getting overall information of the command 
     */
    Bot.onText(/\/met/, (msg) => {
        log.notice('[met] ' + __filename, 'Executed - ' + msg.from.username + ' - ' + msg.text);
        let met = require('./api/met.api.js');
        let response = met.weather(msg.text);

        return Bot.sendMessage(msg.chat.id, "MET  \n\n" + JSON.stringify(response));
    });

    Bot.on('text', (msg) => {
        if (msg.text == 'fuck' || msg.text == 'diu') {
            log.notice('[random] ' + __filename, 'Executed - ' + msg.from.username);
            return Bot.sendMessage(msg.chat.id, "@"+msg.from.username+" Fuck you 🖕");
        } else if (msg.text == 'hi' || msg.text == 'hello') {
            log.notice('[random] ' + __filename, 'Executed - ' + msg.from.username);
            return Bot.sendMessage(msg.chat.id, "@"+msg.from.username+" Hi, you can type /help 🖕\n\n" + JSON.stringify(msg));
        }
    });

}