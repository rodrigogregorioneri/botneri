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
        session.beginDialog("mainMenu");
    }
]);

// Display the main menu and start a new request depending on user input.
bot.dialog("mainMenu", [
    function(session){
        builder.Prompts.choice(session, "Menu CronApp:", menuItems);
    },
    function(session, results){
        if(results.response){
            session.beginDialog(menuItems[results.response.entity].item);
        }
    }
]);



// Menu: "Order dinner"
// This dialog allows user to order dinner to be delivered to their hotel room.
bot.dialog('cronapp', [
    function(session){
        session.send("Olá já conhece o CronApp?");
        
    }
]);


bot.dialog('blockly', [
    function(session){
        session.send("Olá já conhece o Blockly?");
        
    }
])
