require('dotenv').config();

// init logging and set custom log
const log = require('npmlog');
Object.defineProperty(log, 'heading', { get: () => { return new Date().toUTCString() } })

// enable telegram bot instant
const TelegramBot = require('node-telegram-bot-api');
const Token = process.env.BOT_TOKEN;
const Bot = new TelegramBot(Token, {polling: true});

const command = require('./command.js');

command.init(Bot, log);