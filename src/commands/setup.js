const schedule = require('./../schedule')

module.exports = {
  name: 'setup',
  args: false,
  execute (message) {
    const isAdmin = message.member.hasPermission('ADMINISTRATOR')
    const channel = message.guild.channels.find('name', 'event-notifications')
    const roleEveryone = message.guild.roles.find('name', '@everyone')

    if (channel) {
      message.reply(`${channel} has already been setup for you. No further action is needed.`).then(reply => setTimeout(() => reply.delete(), 1500))
    } else {
      if (isAdmin) {
        message.guild.createChannel('event-notifications', 'text', [
          {
            id: roleEveryone.id,
            deny: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
            allow: ['READ_MESSAGES', 'READ_MESSAGE_HISTORY']
          }
        ])
          .then(channel => {
            message.reply(`Setup is completed. You will now see ${channel}. You may now move the channel into your preferred category. The bot will start notifying the server whenever there is an event.`)
          })
      } else {
        message.reply(`You do not have permission to use this command. Please kindly contact your server's administrator.`).then(reply => setTimeout(() => reply.delete(), 1500))
      }
    }

    schedule.init(message)

    setTimeout(() => message.delete(), 1500)
  }
}
