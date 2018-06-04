const moment = require('moment')

const schedule = [
  {
    day: 0,
    programs: [
      { name: 'Guild Poker', time: '8:30PM', isGuild: true },
      { name: 'Guild Territorial War', time: '9:00PM', isGuild: true }
    ]
  },
  {
    day: 1,
    programs: [
      { name: 'Horse Racing', time: '1:00PM', isGuild: false },
      { name: 'Horse Racing', time: '7:00PM', isGuild: false },
      { name: 'Sky Arena', time: '9:00PM', isGuild: true },
      { name: 'Guild Riddle Party', time: '9:30PM', isGuild: true },
      { name: 'Horse Racing', time: '11:00PM', isGuild: false }
    ]
  },
  {
    day: 2,
    programs: [
      { name: 'Riddle Party', time: '1:00PM', isGuild: false },
      { name: 'Guild Boss', time: '8:30PM', isGuild: true },
      { name: 'Guild War', time: '9:00PM', isGuild: true }
    ]
  },
  {
    day: 3,
    programs: [
      { name: 'Horse Racing', time: '1:00PM', isGuild: false },
      { name: 'Horse Racing', time: '7:00PM', isGuild: false },
      { name: 'Guild Poker', time: '8:30PM', isGuild: true },
      { name: 'Guild Boss Rush', time: '9:00PM', isGuild: true }
    ]
  },
  {
    day: 4,
    programs: [
      { name: 'Guild Boss', time: '8:30PM', isGuild: true },
      { name: 'Guild War', time: '9:00PM', isGuild: true }
    ]
  },
  {
    day: 5,
    programs: [
      { name: 'Guild Camp Party', time: '8:30PM', isGuild: true }
    ]
  },
  {
    day: 6,
    programs: [
      { name: 'Guild Boss', time: '8:30PM', isGuild: true },
      { name: 'Guild War (Championship)', time: '9:00PM', isGuild: true }
    ]
  }
]

const dailies = [
  { name: 'Daily Reset', time: '6:00AM' },
  { name: 'World Boss', time: '1:30PM' }
]

module.exports = {
  name: 'event',
  args: true,
  execute (message, args) {
    const nameOfDay = args[0]
    const dayOfWeek = nameOfDay ? moment().day(nameOfDay).day() : moment().day()

    let reply = `here are the events for ${nameOfDay || 'Today'}:\n\n`

    reply += `${moment().day(dayOfWeek).format('dddd, Do MMM YYYY')}\n\n`

    const items = getEvent(dayOfWeek)

    for (const item of items.programs) {
      reply += `**Name:** ${item.name}\n`
      reply += `**Start time:** ${item.time}\n`
      reply += `**Guild Contribution:** ${item.isGuild ? 'Yes' : 'No'}`
      reply += `\n\n`
    }

    reply += '---\n\n'

    reply += '*Daily Events:*\n'

    for (const item of dailies) {
      reply += `**Name:** ${item.name}\n`
      reply += `**Start time:** ${item.time}\n\n`
    }

    message.channel.send(`Hi ${message.author}, ${reply}`)
  }
}

function getEvent (dayOfWeek) {
  return schedule.find(event => event.day === dayOfWeek)
}
