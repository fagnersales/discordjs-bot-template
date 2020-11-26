module.exports = {
    config: {
        name: 'hello'
    },
    run: function (client, message, args) {
        message.reply(`Hello!`)
    }
}