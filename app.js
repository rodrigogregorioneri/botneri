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

// Main menu
var menuItems = { 
    "CronApp": {
        item: "cronapp"
    },
    "Blockly": {
        item: "blockly"
    }
};


// This is a reservation bot that has a menu of offerings.
var bot = new builder.UniversalBot(connector, [
    function(session){
        session.send("Bem vindo ao CronApp.");
        session.beginDialog("cronapps");
       session.cancelDialog('cronapp', 'cronapps'); 
       session.cancelDialog('blockly', 'cronapps'); 
    }
]);

// Display the main menu and start a new request depending on user input.
bot.dialog("cronapps", [
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
    confirmPrompt: "Deseja cancelar?"
});


bot.dialog('cronapp', function(session){
    session.send("Olá Amigos!!");
})


