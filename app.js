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
}

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// This is a reservation bot that has a menu of offerings.
var bot = new builder.UniversalBot(connector, [
    
    function (session) {
          
    //   builder.Prompt.text(session, ""); 
       session.send('"Bem vindo ao Suporte CronApp. Em breve você terá autonomia para registrar seus chamados em nosso portal cronapp.io/suporte"., nosso horário de atendimento é de Seg. a Sex. das 9:00 às 18:00. Aguarde, um de nossos analistas responderá em breve.');
       builder.Prompts.text(session, "\n  Para obter ajuda digite @Cronappinho help");
    },
    function (session, results) {
         // console.log('"Bem vindo ao Suporte CronApp. Em breve você terá autonomia para registrar seus chamados em nosso portal cronapp.io/suporte"., nosso horário de atendimento é de Seg. a Sex. das 9:00 às 18:00. Aguarde, um de nossos analistas responderá em breve.');
          if(results.response == "help"){
              session.send("Comandos de Ajuda  \n  - ajuda : help  \n  - horario de funcionamento: horario-funcionamento  \n  - templates de aberturas de chamados: templates  \n  Contato comercial: comercial");
          }else if(results.response == "horario-funcionamento"){
              session.send("Horário de atendimento é de Seg. a Sex. das 9:00 às 18:00. Aguarde, um de nossos analistas responderá em breve.");
          }else if(results.response == "templates"){
              session.send("Projeto(s):  \n  Ambiente(s):  \n  Função do erro:  \n  \n  Passos:  \n  \n  OBS.:");
          }else if(results.response == "comercial"){
              session.send("Comercial  \n  Representante: Gabriela Saeger  \n  Skype: Gabriela Saeger  \n Telefone: +55 00 99999-9999");
           }
         
           
       
        
    }
]);



bot.on('conversationUpdate', function (message) {
    if (message.membersAdded && message.membersAdded.length > 0) {
        var membersAdded = message.membersAdded
            .map(function (m) {
                var isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.name + ')';
            })
            .join(', ');

        bot.send(new builder.Message()
            .address(message.address)
            .text("Bem vindo ao Suporte CronApp %s", membersAdded + ', em breve você terá autonomia para registrar seus chamados em nosso portal cronapp.io/suporte"., nosso horário de atendimento é de Seg. a Sex. das 9:00 às 18:00. Aguarde, um de nossos analistas responderá em breve.'));
    }

    if (message.membersRemoved && message.membersRemoved.length > 0) {
        var membersRemoved = message.membersRemoved
            .map(function (m) {
                var isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.name + ')';
            })
            .join(', ');

        bot.send(new builder.Message()
            .address(message.address)
            .text('Os seguintes membros ' + membersRemoved + ' foram removidos ou deixaram a conversa :('));
    }
});
