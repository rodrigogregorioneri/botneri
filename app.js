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
       
        session.send("  Olá CronApp Users"); 
  
      builder.Prompts.text(session, "\n  Para obter ajuda digite '@Cronappinho help' ou digite seu comando caso já saiba");
    },
    function (session, results) {
         // console.log('"Bem vindo ao Suporte CronApp. Em breve você terá autonomia para registrar seus chamados em nosso portal cronapp.io/suporte"., nosso horário de atendimento é de Seg. a Sex. das 9:00 às 18:00. Aguarde, um de nossos analistas responderá em breve.');
          if(results.response == "help"){
              session.send("Comandos de Ajuda  \n  - Ajuda : help  \n  - Horario de funcionamento: horario-funcionamento  \n  - Templates de aberturas de chamados: templates  \n  - Contato comercial: comercial  \n  - Canal do Youtube: youtube  \n  - Webnars: webnar");
          }else if(results.response == "horario-funcionamento"){
              session.send("Horário de atendimento é de Seg. a Sex. das 9:00 às 13:00 horas e das 14:00 às 18:00 horas.");
          }else if(results.response == "templates"){
              session.send("  Projeto(s):  \n  Ambiente(s):  \n  Função do erro:  \n  \n  Passos:  \n  \n  OBS.:");
          }else if(results.response == "comercial"){
              session.send("  Comercial  \n  Representante: Gabriela Saeger  \n  Skype: Gabriela Saeger  \n  Telefone: +55 00 99999-9999");
           }else if(results.response == "youtube"){
              session.send("Siga nosso canal no Youtube e fique por dentro dos nossos tutoriais e as gravações dos nossos Webnars  \n  youtube: 'https://www.youtube.com/channel/UCfEBjfXaiA8n-YfezFklsfg'")
           }else if(results.response == "webnars"){
              session.send("Cadastre-se nos webnars do CronApp: 'https://www.cronapp.io/eventos/'");
           }
         
           
       
        
    }
]);




bot.on('conversationUpdate', function (message) {
    if (message.membersAdded && message.membersAdded.length > 0) {
        var membersAdded = message.membersAdded
            .map(function (m) {
                var isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
            })
            .join(', ');

        bot.send(new builder.Message()
            .address(message.address)
            .text('Bem vindo ao Suporte CronApp!!! Em breve você terá autonomia para registrar seus chamados em nosso portal "cronapp.io/suporte", nosso horário de atendimento é de Seg. a Sex. das 9:00 às 13:00 horas e das 14:00 às 18:00 horas.. Aguarde, um de nossos analistas responderá em breve.'));
    }

    if (message.membersRemoved && message.membersRemoved.length > 0) {
        var membersRemoved = message.membersRemoved
            .map(function (m) {
                var isSelf = m.id === message.address.bot.id;
                return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
            })
            .join(', ');

        bot.send(new builder.Message()
            .address(message.address)
            .text("Esperamos que você retorne ao CronApp!!!"));
    }
});
