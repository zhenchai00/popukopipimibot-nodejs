exports.init = (Bot, log) => {
    Bot.onText(/\/start/,(msg) => {
        log.notice('[start]', 'Executed - ' + msg.from.username);
        return Bot.sendMessage(msg.chat.id, "Subscribe my OnlyFans!!! Thanks you!!! 😘");
    });
    Bot.onText(/\/ee/,(msg) => {
        log.notice('[start]', 'Executed - ' + msg.from.username);
        return Bot.sendMessage(msg.chat.id, "@"+msg.from.username+" Fuck you 🖕");
    });
}