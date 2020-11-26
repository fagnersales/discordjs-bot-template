if (process.version.slice(1).split(".")[0] < 8) throw new Error('A sua versão do Node precisa ser igual ou maior à 8.0! https://nodejs.org/en/')

// Requisição da library do Discord
// Caso não a tenha utilize `npm install discord.js`
const Discord = require('discord.js')

if (Discord.version <= 12) throw new Error('A sua versão do Discord precisa ser igual ou maior à 12.0!')

// Habilitar as chaves de desenvolvimento
require('dotenv').config()

// Criar uma nova instância de bot no Discord
const client = new Discord.Client()

// Atribuir a propriedade 'commands' o valor new Collection
client.commands = new Discord.Collection()

// Buscar a função que irá inserir os comandos dentro da propriedade commands
const loadCommands = require('./handlers/commands')
// Tendo a função em mãos, basta colocar os parametros exigidos
loadCommands(client)

// Sempre que a função `ready` for emitida, executar a função de nome `onReady`
client.on('ready', onReady)

function onReady() {
    console.log(`Sistema iniciailzado!`)
}

client.on('message', onMessage)

/**
 * Executar sempre que uma mensagem for enviada
 * @param {Discord.Message} message 
 */
function onMessage(message) {

    if (
        message.channel.type === 'dm' // Caso a mensagem tenha sido enviada no privado do bot
        || message.author.bot // Caso a mensagem seja de um outro bot
    ) return null

    // Puxar do arquivo .env a propriedade PREFIX
    const prefix = process.env.PREFIX

    console.log(`prefix: ${prefix}`) // ver o que há dentro de prefix (Remova essa linha a vontade.)

    // Checar se o conteúdo da mensagem começa com o valor de prefix
    if (message.content.startsWith(prefix)) {
        const args = message.content
            .slice(prefix.length) // cortar a mensagem a partir do tamanho prefixo, ou seja, remove o prefixo da mensagem
            .trim() // Remove espaços desnecessários (Como no final do texto)
            .split(' ') // Separar o conteúdo da mensagem em uma Array, onde o critério de separação é um espaço
            // Exemplo: 'Fagner é legal' -> ['Fagner', 'é', 'legal']
            .slice(1) // Ignorar o primeiro elemento da array -> ['é', 'legal']

        console.log(`args: ${args}`) // Ver o que há dentro de args (Remova essa linha a vontade.)

        const commandName = message.content
            .toLowerCase() // Transformar o conteúdo em letras minusculas
            .slice(prefix.length) // Cortar a mensagem a partir do tamanho prefixo, ou seja, remove o prefixo da mensagem
            .split(' ')[0] // Separar o conteúdo da mensagem em uma Array e buscando apenas o primeiro elemento

        console.log(`commandName: ${commandName}`) // Ver o que há dentro de commandName (Remova essa linha a vontade.)

        // Buscar o comando usando como chave o nome recebido a partir do prefixo
        const commandFile = client.commands.get(commandName)

        console.log(`commandFile: ${commandFile}`) // Ver o que há dentro de commandFile (Remova essa linha a vontade.)

        // Caso exista algo dentro de commandFile
        if (commandFile) {
            // Caso exista a propriedade run
            if (commandFile.run) {
                commandFile.run(client, message, args)
                console.log(`O comando ${commandFile.config.name} foi executado!`)
            }
        } else {
            return message.channel.send(`Comando não reconhecido!`)
        }

    }
}

// Fazer o login baseado na chave TOKEN que está dentro do arquivo .env
client.login(process.env.TOKEN)