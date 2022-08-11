const {readdir, readdirSync} = require("fs");
const Discord = require("discord.js");
const utils = require("./utils.js");
const Logger = require("./Logger.js");
const {resolve, join} = require("path");
const errors = require("./errors.js")
const TalkEngine = require("./TalkEngine.js");
const {Colors} = require("../constants/colors.js");

class Client extends Discord.Client {
  
  constructor(options) {
    
    super(options);
    
    this.utils = utils;
    
    this.logger = new Logger(this);
    
    this.errors = errors;
    
    this.commands = new Discord.Collection();
    
    this.aliases = new Discord.Collection();
    
    this.categories = {
      ADMINISTRATIVE: 0,
      INFORMATIVE: 1,
      UNDERHAND: 2,
      UTILITY: 3
    }

    this.talkEngine = new TalkEngine();

    this.colors = Colors;
    
  }
  
  loadEvents(path) {
    readdir(path, (err, files) => {
      if(err) this.logger.error(err);
      files = files.filter(file => file.endsWith(".js"));
      files.forEach(file => {
        const eventName = file.substring(0, file.indexOf("."));
        const event = require(resolve(/*__basedir,*/ join(path, file)));
        super.on(eventName, event.bind(null, this));
        delete require.cache[require.resolve(resolve(/*__basedir,*/ join(path, file)))]; 
      });
    });
    return this;
  }
  
  loadCommands(path) {
    readdirSync(path).filter(file => !file.endsWith(".js")).forEach(dir => {
      const commands = readdirSync(resolve(/*__basedir,*/ join(path, dir))).filter(file => file.endsWith(".js"));
      commands.forEach(file => {
        const Command = require(resolve(/*__basedir,*/ join(path, dir, file)));
        const command = new Command(this);
        this.commands.set(command.name, command);
        command.aliases.forEach(alias => {
          this.aliases.set(alias, command);
        });
      })
    });
    return this;
  }
  
  
}


module.exports = Client;