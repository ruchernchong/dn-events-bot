const moment = require('moment/moment')
const schedule = require('node-schedule')
const keys = require('./../keys.js')

let guild, role, channel

function init (client) {
  guild = client.guilds.find('id', keys.guild.id)
  role = guild.roles.find(role => role.name.includes('@everyone'))
  channel = client.channels.find('name', 'dragon-nest-events')

  isDailyReset()
  isStamina()
  isWorldBoss()

  guildEvents()
  guildWarEvents()
}

function guildEvents () {
  const events = ['Guild Poker', null, 'Guild Boss', 'Guild Poker', 'Guild Boss', 'Guild Camp Party', 'Guild Boss']

  const rule = new schedule.RecurrenceRule()
  rule.hour = 20
  rule.minute = 30 - 3

  schedule.scheduleJob(rule, date => {
    outputGuildEvents(events, date)
  })
}

function guildWarEvents () {
  const events = ['Guild Territorial War', 'Sky Arena', 'Guild War', 'Guild Boss Rush', 'Guild War', null, 'Guild Championship']

  const rule = new schedule.RecurrenceRule()
  rule.hour = 21
  rule.minute = 0 - 3

  schedule.scheduleJob(rule, date => {
    outputGuildEvents(events, rule, date)
  })
}

function outputGuildEvents (events, rule, date) {
  const dayOfWeek = moment(date).day()

  if (events[dayOfWeek]) {
    const message = `${role}, ${events[dayOfWeek]} is starting soon!`
    channel.send(message)
  }
}

function isDailyReset () {
  const rule = new schedule.RecurrenceRule()
  rule.hour = 6
  rule.minute = 0 - 3

  const message = 'Good morning all! Daily Quest has been reset!'
  sendEventNotification(rule, message)
}

function isStamina () {
  const rule = new schedule.RecurrenceRule()
  rule.hour = [13, 19]
  rule.minute = 0 - 3

  const message = 'Free daily x50 stamina. Time to collect them!'
  sendEventNotification(rule, message)
}

function isWorldBoss () {
  const rule = new schedule.RecurrenceRule()
  rule.hour = 13
  rule.minute = 30 - 3

  const message = `${role}, World Boss event is starting soon!`
  sendEventNotification(rule, message)
}

function sendEventNotification (rule, message) {
  schedule.scheduleJob(rule, () => {
    channel.send(message)
  })
}

module.exports = { init }
