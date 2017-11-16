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
    builder.Prompts.text(session, 'Olá! Qual seu nome?');
    session.endDialog(`Olá ${results.response}!`);

});





