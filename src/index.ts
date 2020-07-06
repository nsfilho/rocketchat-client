/* eslint-disable no-console */
import axios from 'axios';
import commander from 'commander';

commander.version('1.0.0');

commander
    .option('-u, --url <url>', 'Rocket.chat Webhooks URL')
    .option('-m, --message <message>', 'Message to send')
    .option('-p, --project <project>', 'Project name')
    .option('-r, --result <result>', 'Type of message: success, error, normal')
    .option('-v, --version <build>', 'Build version')
    .option('-s, --sender <sender>', 'Sender Name');

commander.parse(process.argv);

if (commander.url === undefined) {
    if (process.env.ROCKETCHAT_URL === undefined) {
        console.error('Você precisa definir o ROCKETCHAT_URL ou informar via parametro --url.');
        process.exit(1);
    }
    commander.url = process.env.ROCKETCHAT_URL;
}

if (commander.sender === undefined) {
    commander.sender = process.env.RC_ALIAS || 'Gitlab CI';
}

if (commander.project === undefined) {
    commander.project = process.env.RC_PROJECT || process.env.CI_PROJECT_PATH || 'projeto não definido';
}

if (commander.build === undefined) {
    commander.build = process.env.BUILD_NUMBER || 'v0.0.0';
}

if (commander.message === undefined) {
    if (process.env.RC_TEXT === undefined) {
        console.error('Você precisa definir o RC_TEXT ou informar via parametro --message.');
        process.exit(1);
    }
    commander.message = process.env.RC_TEXT;
}

if (commander.result === undefined) {
    commander.result = process.env.RC_RESULT || 'normal';
}

const message = `Projeto: ${commander.project}
Versão: ${commander.build}
Status: ${commander.result}
${commander.message}
`;

const sendMessage = async () => {
    try {
        const result = await axios.post(
            commander.url,
            {
                alias: commander.sender,
                text: message,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    } catch (err) {
        console.log(`Ocorreu um erro: $err`);
        process.exit(1);
    }
};

sendMessage();
