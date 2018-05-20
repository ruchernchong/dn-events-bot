import { token } from './../keys.js'
import Schedule from './Schedule'

const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)

  Schedule.init(client)
})

client.login(token)
