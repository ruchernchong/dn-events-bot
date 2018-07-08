const moment = require('moment/moment')
const schedule = require('node-schedule')

let channel, role

function init (message) {
  channel = message.guild.channels.find('name', 'event-notifications')
  role = message.guild.roles.find('name', '@everyone')

  isDailyReset()
  isStamina()
  isWorldBoss()

  guildEvents()
  guildWarEvents()
}

function guildEvents () {
  const events = ['Guild Poker', null, 'Guild Boss', 'Guild Poker', 'Guild Boss', 'Guild Camp Party', 'Guild Boss']

  const rule = new schedule.RecurrenceRule()
  rule.hour = 19
  rule.minute = 25

  schedule.scheduleJob(rule, date => {
    outputGuildEvents(events, date)
  })
}

function guildWarEvents () {
  const events = ['Guild Territorial War', 'Sky Arena', 'Guild War', 'Guild Boss Rush', 'Guild War', null, 'Guild Championship']

  const rule = new schedule.RecurrenceRule()
  rule.hour = 20
  rule.minute = 55

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
  rule.hour = 5
  rule.minute = 55

  const message = 'Good morning all! Daily Quest has been reset!'
  sendEventNotification(rule, message)
}

function isStamina () {
  const rule = new schedule.RecurrenceRule()
  rule.hour = [12, 18]
  rule.minute = 55

  const message = 'Free daily x50 stamina. Time to collect them!'
  sendEventNotification(rule, message)
}

function isWorldBoss () {
  const rule = new schedule.RecurrenceRule()
  rule.hour = 12
  rule.minute = 25

  const message = `${role}, World Boss event is starting soon!`
  sendEventNotification(rule, message)
}

function sendEventNotification (rule, message) {
  schedule.scheduleJob(rule, () => {
    channel.send(message)
  })
}

module.exports = { init }
