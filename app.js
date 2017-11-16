var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '1f9ed36f-309d-4fef-afe8-401276d643a4',
    appPassword: 'cvhbcCHHE963:+])qgUFP34'
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    session.send("CronApp: Posso ajudar em algo?");

});

bot.dialog('CronApp', [
    function (session) {
        builder.Prompts.text(session, 'Olá! Qual seu nome?');
    },
    function (session, results) {
        session.endDialog(`Olá ${results.response}!`);
    }
]);


bot.on('conversationUpdate', function (message) {
    if (message.membersAdded && message.membersAdded.length > 0) {
        // Say hello
        var isGroup = message.address.conversation.isGroup;
        var txt = isGroup ? "Posso ajudar em algo?" : "Bem vindo ao grupo CronApp, qualquer duvida estamos a disposição!!  ";
        var reply = new builder.Message()
                .address(message.address)
                .text(txt);
        bot.send(reply);
    } else if (message.membersRemoved) {
        // See if bot was removed
        var botId = message.address.bot.id;
        for (var i = 0; i < message.membersRemoved.length; i++) {
            if (message.membersRemoved[i].id === botId) {
                // Say goodbye
                var reply = new builder.Message()
                        .address(message.address)
                        .text("Que pena esperamos que você volte para o CronApp!");
                bot.send(reply);
                break;
            }
        }
    }
});
