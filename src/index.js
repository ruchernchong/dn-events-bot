const { token } = require('./../keys.js')
const schedule = require('./schedule')

const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  schedule.init(client)
})

client.login(token)
