var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {

    console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '5a68cba2-b63a-4e30-8ec7-4701a3a7068f',
    appPassword: 'wxtadqPBL273{@=dIZQV83~'
});


var menuItems = { 
    "templates": {
        item: "templates"
    },
    "horario-funcionamento": {
        item: "horario-funcionamento"
    },
    "comercial": {
        item: "comercial"
    }
    ,
    "youtube": {
        item: "youtube"
    },
    "webinars": {
        item: "webinars"
    },
}

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// This is a reservation bot that has a menu of offerings.
var bot = new builder.UniversalBot(connector, [
    function (session) {
          
      //  session.send("Olá CronApp Users para obter ajuda digite '@Cronappinho help' ou digite seu comando caso já saiba:"); 
       
    //  session.send("Olá CronApp Users"); 
    session.beginDialog("mainMenu");
      
    }
]);


bot.dialog("mainMenu", [
    function(session, results){
       // builder.Prompts.choice(session, "Para obter ajuda digite '@Help CronApp' ou digite seu comando caso já saiba:", menuItems);


        builder.Prompts.choice(session, "Para obter ajuda digite '@@Help CronApp' ou digite seu comando caso já saiba:", "documentação|horario-funcionamento|comercial|youtube|webinars|artigos", {
            retryPrompt: "Escolha invalida, insira novamente.",
            listStyle: builder.ListStyle.button,
            maxRetries: 2
});

    },function (session, results) {
        
        switch (results.response.entity) {
            case 'documentação':
                session.beginDialog("documentação");
                break;
            case 'horario-funcionamento':
                session.beginDialog("horario-funcionamento");
                break;
            case 'comercial':
                session.beginDialog("comercial");
                break;
            case 'youtube':
                session.beginDialog("youtube");
                break;      
            case 'webinars':
                session.beginDialog("webinars");
                break;     
            case 'artigos':
                session.beginDialog("artigos");
                break;       
        }
    }
])
.triggerAction({
    matches: /^main menu$/i,
    confirmPrompt: "deseja sair?"
});


bot.dialog('documentação', 
// Step 1
function (session) {
    session.send("Aqui você vai encontrar a sua disposição toda a documentação atualizada do CronApp. \nAcesse: https://docs.cronapp.io");
    session.endDialog();
}
);


bot.dialog('horario-funcionamento', 
// Step 1
function (session) {
    session.send("Horário de atendimento é de Seg. a Sex. das 9:00 às 18:00."); 
    session.endDialog();   
}
);

bot.dialog('artigos', 
// Step 1
function (session) {
    session.send("Quer tal ler artigos interessantes sobre o universo do desenvolvimento de software?  \nAcesse: https://www.cronapp.io/blog/"); 
    session.endDialog();   
}
);


bot.dialog('comercial', 
// Step 1
function (session) {
    session.send("  Comercial  \n  Representante: Gabriela Saeger  \n  Skype: Gabriela Saeger  \n  Telefone: +55 00 99999-9999");
    session.endDialog();
}
);


bot.dialog('youtube', 
// Step 1
function (session) {
    session.send("Assine nosso Canal no Youtube e saiba antes das novidades.  \nAcesse: https://www.youtube.com/c/cronapp");
    session.endDialog();
}
);

bot.dialog('webinars', 
// Step 1
function (session) {
    session.send("Temos eventos mensais sobre novas funcionalidades do CronApp. Confira aqui os nossos próximos eventos e não deixe de participar. Acesse: https://www.cronapp.io/eventos/");
    session.endDialog();
}
);



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
            .text('Bem vindo ao Suporte CronApp!!! Em breve você terá autonomia para registrar seus chamados em nosso portal "https://www.cronapp.io/suporte", nosso horário de atendimento é de Seg. a Sex. das 9:00 às 18:00. Aguarde, um de nossos analistas responderá em breve.'));
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
