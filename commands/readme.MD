### CÓDIGO DE EXEMPLO PARA CRIAÇÃO DE COMANDO

```javascript
module.exports = {
    config: {
        name: 'Nome_Do_Comando',
        aliases: ['Nome_Secundario']
    },
    run: async function (client, message, args) {
        // Código a ser executado
        message.channel.send('Batatas são legais!')
    }
}
```