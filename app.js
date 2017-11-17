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

var userStore = [];

var menuItems = { 
    "CronApp": {
        item: "cronapp"
    },
    "Blockly": {
        item: "blockly"
    },
    "Craudio dos computers": {
        item: "craudio"
    },
    "Cronapinho": {
        item: "cronapinho"
    },
}

var bot = new builder.UniversalBot(connector, [
    function(session){
        session.send("O blockly é o futuro pois 'programadores são pagos pra encontrar solução'.");
        session.beginDialog("cronapp");
    }
]);

bot.dialog("cronapp", [
    function(session){
        builder.Prompts.choice(session, "Menu CronApp:", menuItems);
    },
    function(session, results){
        if(results.response){
            session.beginDialog(menuItems[results.response.entity].item);
        }
    }
])
.triggerAction({
    // The user can request this at any time.
    // Once triggered, it clears the stack and prompts the main menu again.
    matches: /^main menu$/i,
    confirmPrompt: "Isso cancelará seu pedido. Você tem certeza?"
});

bot.dialog('cronapp', [
    function(session){
        session.send("Olá eu sou o CronApp");
        
    },
    function (session, results) {
        if (results.response) {
            var order = dinnerMenu[results.response.entity];
            var msg = `Bem vindo ao CronApp`;
            session.dialogData.order = order;
            session.send(msg);
            builder.Prompts.text(session, "Qual o seu nome?");
        } 
    }
])




