const Discord = require("discord.js");
const client = new Discord.Client();
const path = require('path');
const fs = require('fs');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

var data = "";

setInterval(function(){
  data = "";
	fs.readdir(__dirname, function(err, filenames) {
		if (!err) {
			filenames.forEach(function(filename) {
				fs.readFile(path.resolve(__dirname, filename), 'utf8', function(err, content) {
					if (!err) {
						if (filename != "pizzabot.js") {
							data += content;
						}
					}
				});
			});
		}
	});
}, 5000);

client.on('message', msg => {
	if (msg.author.id != client.user.id) {
		var message = msg.cleanContent;
		var dataarray = data.split("\n");
		
		var startlist = [];
		var finalmessage = "";
		var msgarray = message.split(' ')
		for (var i = 0; i < dataarray.length - 1; i++) {
		    var eachdata = dataarray[i].split(' ')
			if (eachdata[eachdata.length - 1].toLowerCase() == msgarray[msgarray.length - 1].toLowerCase()) {
				startlist.push(dataarray[i + 1].split(' ')[0]);
				if (eachdata.length > 1 && msgarray.length > 1) {
    			    if (eachdata[eachdata.length - 2].toLowerCase() == msgarray[msgarray.length - 2].toLowerCase()) {
    			        for (var j = 0; j < 3; j++) {
    			            startlist.push(dataarray[i + 1].split(' ')[0]);
    			        }
    			    }
    			}
			}
		}
		if (startlist.length > 0) {
			var currentword = startlist[Math.floor(Math.random() * startlist.length)];
			finalmessage = currentword;
			for (var i = 0; i < Math.floor(Math.random() * 15); i++) {
				var nextword = [];
				for (var eachdata in dataarray) {
					var eachdataarray = dataarray[eachdata].split(' ');
					for (var j = 0; j < eachdataarray.length - 1; j++) {
						if (currentword.toLowerCase() == eachdataarray[j].toLowerCase()) {
							nextword.push(eachdataarray[j + 1]);
						}
					}
				}
				if (nextword.length > 0) {
					currentword = nextword[Math.floor(Math.random() * nextword.length)];
					finalmessage += " " + currentword;
				}
			}
		}
		fs.appendFile(msg.channel.id + '.txt', message.replace(/\n/g, " ") + "\n", function (err) {});
		msg.channel.send(finalmessage);
	}
});

client.login('BOT_TOKEN');
