/* Twitter bot: Reply automatically */
/* General Settings */
require('date-utils');
var twitter = require('twitter');
var request = require("request");
var fs = require('fs');
var json_config = JSON.parse(fs.readFileSync('./config/config.json', 'utf8'));
var json_msg = JSON.parse(fs.readFileSync('./msg_setting/msg.json', 'utf8'));
/* setting of bot with config file */
var bot = new twitter({
  /* read by config.json */
  consumer_key        : json_config.key_token[0].consumer_key,
  consumer_secret     : json_config.key_token[0].consumer_secret,
  access_token_key    : json_config.key_token[0].access_token_key,
  access_token_secret : json_config.key_token[0].access_token_secret
});
/* Start tracking mention */
bot.stream( 'statuses/filter', { track : json_config.tweet_info[0].tracking_twid }, function( stream ) {
  stream.on( 'data', function( data ) {
    /* to read text in data */
    var tweet = data.text;
    console.log(tweet);
    /* setting of text to reply */
    var dateStr = new Date().toFormat("YYYY/MM/DD/ HH24:MI");
    /* Reply messages are called from message file */
    //var textCreatTOReply = '@' + data.user.screen_name +  ' ' + json_msg.Reply_meg[0].reply_normal + '\n\n' + dateStr;
    var textCreatTOReply = '@' + data.user.screen_name +  ' ' + json_msg.Reply_meg[0].reply_normal;       
    console.log( textCreatTOReply );
    /* reply: using 'update' */
     bot.post(
      'statuses/update', {
        status: textCreatTOReply,
        in_reply_to_status_id: data.id_str
      },
      function(error, data, response) {
        if (!error) {
          console.log("OK, Reply!")
          /* if you want to read filtering data, use 'console.log(data)'. */
          //console.log(data);
        }
      }
    )          
  });
});