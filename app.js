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

// This is a reservation bot that has a menu of offerings.
var bot = new builder.UniversalBot(connector, [
    function(session, args){
        session.send("Bem vindo ao CronApp.");
        builder.Prompts.text(session, "Escolha umas das opções do menu \n - Descubra o futuro 'futuro'
                                                                        \n - Descubra a produtividade 'produtividade'");
 
    }, function(session, results){
       resposta = results.response;
       if(resposta === "futuro"){
          session.send("O blockly é o futuro pois 'programadores são pagos pra encontrar solução'")
       }else if(resposta === "produtividade"){
          session.send("Com o Blockly você terá mais produtividade!!")      
       }else{
          session.send("Comando Invalido!!")
       }   
    }
]);






