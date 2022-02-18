### The reason of this
Heroku does not support SQLite databases, for the do not offer persistent storage. Therefore, I decided to do this, because Heroku is the best free D-Bot host I currently have
### What have I done
I have made a remote SQLite database wrapper in PHP that will run on an external website and manage the database for the bot
### Where
The /db-wrapper directory belongs on the external web server and the bot does not use it at all
### Note
You should ship the wrapper with a clean database with tables set up, because Sequelize is initialising the tables through it's `query()` method that I cannot overwrite. Then it is all just `INSERT`, `SELECT`, `DELETE`, `UPDATE` statements the wrapper should handle if he recognizes your token.
