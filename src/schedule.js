import moment from 'moment/moment'
import schedule from 'node-schedule'

let guild, role, channel

function init (client) {
  guild = client.guilds.find('name', 'SupremeSG')
  role = guild.roles.find(role => role.name.includes('Developer'))
  channel = client.channels.find('name', 'development')

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
  rule.minute = 30

  schedule.scheduleJob(rule, date => {
    outputGuildEvents(events, date)
  })
}

function guildWarEvents () {
  const events = ['Guild Territorial War', 'Sky Arena', 'Guild War', 'Guild Boss Rush', 'Guild War', null, 'Guild Championship']

  const rule = new schedule.RecurrenceRule()
  rule.hour = 21
  rule.minute = 0

  schedule.scheduleJob(rule, date => {
    outputGuildEvents(events, rule, date)
  })
}

function outputGuildEvents (events, rule, date) {
  const dayOfWeek = moment(date).day()

  if (events[dayOfWeek]) {
    const message = `${role}, ${events[dayOfWeek]} is starting right now!`
    channel.send(message)
  }
}

function isDailyReset () {
  const rule = new schedule.RecurrenceRule()
  rule.hour = 6
  rule.minute = 0

  const message = 'Good morning all! Daily Quest has been reset!'
  sendEventNotification(rule, message)
}

function isStamina () {
  const rule = new schedule.RecurrenceRule()
  rule.hour = [13, 19]
  rule.minute = 0

  const message = 'Free daily x50 stamina. Time to collect them!'
  sendEventNotification(rule, message)
}

function isWorldBoss () {
  const rule = new schedule.RecurrenceRule()
  rule.hour = 13
  rule.minute = 30

  const message = `${role}, World Boss event has just started!`
  sendEventNotification(rule, message)
}

function sendEventNotification (rule, message) {
  schedule.scheduleJob(rule, () => {
    channel.send(message)
  })
}

export default { init }
