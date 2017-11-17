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


var menuItems = { 
    "futuro": {
        item: "futuro"
    },
    "produtividade": {
        item: "produtividade"
    },
    "motivação":{
       item:"motivacao"   
    }
}

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// This is a reservation bot that has a menu of offerings.
var bot = new builder.UniversalBot(connector, [
    function(session){
        session.send("Bem vindo ao CronApp \n digite 'futuro'  \n digite 'produtividade'.");
        session.beginDialog("mainMenu");
    }
]);

bot.dialog("mainMenu", [
    function(session){
        builder.Prompts.choice(session, "Main Menu:", menuItems);
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
    confirmPrompt: "This will cancel your request. Are you sure?"
});


bot.dialog('futuro', [
    function(session){
        session.send("O futuro é o Blockly!");

    }
]);


bot.dialog('produtividade', [
    function(session){
        session.send("Alta produtividade com o blockly!!!");

    }
]);


bot.dialog('motivacao', [
    function(session){
        session.send('“Ei, você! Você mesma, pare de chorar, coloque um sorriso no rosto, mostre que é forte, suporte, uma hora isso vai valer a pena, você vai ver!” ― Ana Carolina');

    }
]);
