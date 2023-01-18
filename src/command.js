exports.init = (Bot, log) => {
    Bot.onText(/\/help/, (msg) => {
        log.notice('[help]', 'Executed - ' + msg.from.username);
        return Bot.sendMessage(msg.chat.id, "Hi, @"+msg.from.username+" you can type /help");
    });

    Bot.onText(/\/start/, (msg) => {
        log.notice('[start]', 'Executed - ' + msg.from.username);
        return Bot.sendMessage(msg.chat.id, "Subscribe my OnlyFans!!! Thanks you!!! 😘");
    });

    Bot.onText(/\/ee/, (msg) => {
        log.notice('[random]', 'Executed - ' + msg.from.username);
        return Bot.sendMessage(msg.chat.id, "@"+msg.from.username+" Fuck you 🖕");
    });

    Bot.on('text', (msg) => {
        console.log(msg.text);
        if (msg.text == 'fuck' || msg.text == 'diu') {
            log.notice('[random]', 'Executed - ' + msg.from.username);
            return Bot.sendMessage(msg.chat.id, "@"+msg.from.username+" Fuck you 🖕");
        } else {
            log.notice('[random]', 'Executed - ' + msg.from.username);
            return Bot.sendMessage(msg.chat.id, "@"+msg.from.username+" Hi, you can type /help 🖕");
        }
    });
}