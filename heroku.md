### The reason of this
Heroku does not support SQLite databases, for the do not offer persistent storage. Therefore, I decided to do this, because Heroku is the best free D-Bot host I currently have
### What have I done
I have made a remote SQLite database wrapper in PHP that will run on an external website and manage the database for the bot
### Where
The /db-wrapper directory belongs on the external web server and the bot does not use it at all
