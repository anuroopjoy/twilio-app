module.exports = {
  sendSms,
  makeCall
};

function sendSms(event, args) {
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Your Account Sid and Auth Token from twilio.com/console
  // DANGER! This is insecure. See http://twil.io/secure
  const accountSid = 'AC3618ff93fcaf233a53126615443d52e3';
  const authToken = '084c968a242ca78b82b653f9484dc23a';
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({ body: args[1], from: '+12029526787', to: args[0] })
    .then(message => console.log(message.sid));
}

function makeCall(event, args) {
  const accountSid = 'AC3618ff93fcaf233a53126615443d52e3';
  const authToken = '084c968a242ca78b82b653f9484dc23a';
  const client = require('twilio')(accountSid, authToken);

  client.calls
    .create({
      url: 'http://demo.twilio.com/docs/voice.xml',
      to: args[0],
      from: '+12029526787'
    })
    .then(call => console.log(call.sid));
}
