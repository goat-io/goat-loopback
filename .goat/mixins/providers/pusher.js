const Pusher = require('pusher')

const client = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER
})

module.exports = {
  publish: ({ channels, event, payload }) => {
    client.trigger(channels, event, payload)
  }
}
