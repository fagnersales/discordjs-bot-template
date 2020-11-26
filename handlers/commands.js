// Não precisa fazer instalação pois já vem junto com o Node!
const fs = require('fs')
const path = require('path')

const Discord = require('discord.js')

/**
 * Carregar os comandos dentro da propriedade `commands`
 * @param {Discord.Client} client 
 */
function loadCommands(client) {
    // Criar um caminho deste arquivo até a pasta commands
    const CommandsPath = path.join(__dirname, '..', 'commands')

    // Procurar por arquivos dentro da pasta Commands
    // Caso a pasta exista, uma Array com o nome de cada arquivo será retornada!
    // Exemplo: ['ping.js', 'moderation']
    const files = fs.readdirSync(CommandsPath)

    // Caso algum arquivo tenha sido encontrado
    if (files) {
        
        // Função que será executada para cada elemento dentro da Array
        function filterForJS(file) {
            if (file.endsWith('.js')) return true
            else return false
        }

        // Filtrar arquivos cujo os nomes terminam com `.js`
        const onlyJavascriptFiles = files.filter(filterForJS)

        // Executar uma ação para cada arquivo que foi filtrado
        for (const javascriptFile of onlyJavascriptFiles) {
            
            // Criar um caminho até o arquivo
            const filePath = join(__dirname, '..', '..', 'commands', javascriptFile)
            
            // Fazer uma requisição do arquivo
            const file = require(filePath)

            // Checar se o arquivo existe
            // Checar se o arquivo está exportando a propriedade `config`
            // Checar se a propriedade `config` contém outra chamada `name`
            if (file && file.config && file.config.name) {
                // Setar dentro de commands, o nome do comando e tudo o que o arquivo exporta
                client.commands.set(file.config.name, file)
                console.log(`${file.config.name} foi setado com sucesso!`)

                // Checar se o comando faz uso de aliases
                if (file.config.aliases) {
                    // Salvar as aliases unicamente
                    for (const alias of file.config.aliases) {
                        client.commands.set(alias, file)
                        console.log(`${alias} setada para ${file.config.name}!`)
                    }
                }
            } else {
                console.log(`${javascriptFile} Não está exportando os dados necessários!`)
            }
        }

    } else { // Gerar um ero caso nenhum arquivo for encontrado
        throw new Error('A pasta commands não existe!')
    }
}

// Exportar a função de nome loadCommands
module.exports = loadCommands