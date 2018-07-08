const fs = require('fs')
const path = require('path')
const { version } = require('./../package.json')
const { token } = require('./../keys.js')
const { prefix } = require('./config.js')

const Discord = require('discord.js')
const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync(path.join(__dirname, './commands')).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  client.user.setActivity(`Finding events | v${version}`)
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command)) return

  try {
    client.commands.get(command).execute(message, args)
  } catch (error) {
    console.error(error)

    message.reply(`The command \`${message}\` is not recognised.`)
  }
})

client.login(token)
