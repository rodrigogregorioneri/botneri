var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {

    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    ppId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});


var menuItems = { 
    "futuro": {
        item: "futuro"
    },
    "produtividade": {
        item: "produtividade"
    },
}

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// This is a reservation bot that has a menu of offerings.
var bot = new builder.UniversalBot(connector, [
    function (session) {
        session.send("Bem vindo ao CronApp");
        
        builder.Prompts.text(session, "CronApp ou Notepad++?");
    },
    function (session, results) {
        if(results.response ==="CronApp"){
            session.send("Sensacional assim você ganhara mais produtividade!!!");
        }else if(results.response ==="Notepad++"){
            session.send("Você acaba de ganhar o titulo de Garoto Notepad++");  
        }
    
            builder.Prompts.number(session, "qual sua idade?");
       
        
    },
    function (session, results) {
        if(results.response >= 23){
            session.send("Tiozão você!!");  
            session.beginDialog("mainMenu");
        }else{
            session.send("Menino novo!!");  
            session.beginDialog("mainMenu");
        }

    },
    function (session, results) {
        session.beginDialog("mainMenu");
        
    }
]);


bot.dialog("mainMenu", [
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
    confirmPrompt: "deseja sair?"
});


bot.dialog('futuro', [
    function(session){
        session.send("O futuro é o Blockly!");
        session.endDialog();

    }
]);


bot.dialog('produtividade', [
    function(session){
        session.send("Alta produtividade com o blockly!!!");
        session.endDialog();

    }
]);
