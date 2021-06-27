const cardwipfile = require("../cardwip.json"); //import data file
const event_data_file = JSON.parse(JSON.stringify(cardwipfile)); //initialize data file

module.exports = {
  name: "play",
  syntax: "play [\"load\"]/[blessings]",
  description: "Starts a game of Underhand right here in dicord",
  note: "Complete guide can be found in <#767455245382320138> in the [Underhand server](https://discord.gg/invite/Rb5kUzE)\nThis can produce tons of spam so please, use it in designated channels or bot commands channels",
  permissions: "",
  master: false,
  aliases: ["p", "underhand", "u"],
  legend: "blessings",
  category: "underhand",
  async execute(message, args, utils) {
    
    
/**
* The main and central class, responsible for everything
*/
class Game {
  
  constructor(){
    this.running = true;
    this.base_deck = [],
    this.discard_deck = [],   
    this.mode = "play",
    this.resources = new Resources()
    this.player = new Player(this),
    this.event = new Event(this),
    this.mysc = new Mysc(this),
    this.cheats = new Cheats(this)
  }
  
  init(){
    if(["load", "l"].includes(args[0])){
      if (args[1] == null || !args[1].startsWith("{\"base\"}:[")) {
          message.channel.send("Could not load the data string.")
          this.terminate();
        } else {
          const gameData = JSON.parse(args[1]);
          this.load(gameData);
        }
    }else{
      this.new();
    }
    return this;
  }
  
  save(){
    message.channel.send("Here is your data string, you can load it using the *load* argument.");
    message.channel.send(`\`\`\`{"base":[${this.base_deck}],"discard":[${this.discard_deck}],"resources":[${this.player.resources}]}\`\`\``);
    this.terminate();
  }
  
  load(gameData){
    this.base_deck = gameData.base,
    this.discard_deck = gameData.discard,
    this.player.resources = gameData.resources,
    this.mode = "load"
  }
  
  new(){
    let initial_events = [1, 3, 4, 6, 7, 8, 9, 10, 13, 14, 24, 26, 28, 37, 45, 51, 67, 68, 69];
    for (let i = 0; i < 9; i++) {
      //this.base_deck.push(utils.randomArrayItem(initial_events));
      const random = Math.floor(Math.random() * initial_events.length);
      this.base_deck.push(initial_events[random]);
      initial_events = initial_events.filter(function (value, index, arr) { return value != initial_events[random]; });  
    }
    //Rhybaax, Jhai'ti, Kekujira, Yacare, Uhl'Uht'C
    const godEventChainsFirstEvents = [29, 106, 85, 79, 57];
    this.base_deck.push(godEventChainsFirstEvents);
    const godPrefixes = ["g", "r", "w", "j", "k", "y", "u"]
    const blessings = [
      [96, 98], 
      [21, 70], 
      [23, 97], 
      [112, 114], 
      [72, 113], 
      [38, 11], 
      [22, 25]
    ];
    if(args[0]){
      for(let i = 0; i < godPrefixes.length; i++){
        if(args[0].includes[godPrefixes[i]]){
          this.base_deck.push(blessings[i]);
        }
      }
    }
    this.base_deck = utils.shuffleArray(this.base_deck);
  }
  
  async win(god){
    let url;
    if(god){
      url = `http://underhand.clanweb.eu/res/${god}.png`;
    }else{
      url = "http://underhand.clanweb.eu/res/WinScreen.png";  
    }
    await message.channel.send("**You Won**", {
        files: [url]
    });
    this.running = false;
  }
  
  async lose(){
    const url = "http://underhand.clanweb.eu/res/LoseScreen.png";
    await message.channel.send("**You Lose**", {
      files: [url]
    });
    this.running = false;
  }
  
  async terminate(){
    await message.channel.send("Game Terminated");
    this.running = false;
  }
  
  async handleUserInput({handlingForesightDiscard}){
    const filter = m => (m.author.id === message.author.id && !m.content.startsWith("//"));
    const TIMEOUT = 180 * 1000;  
    const game = this;
    await message.channel.awaitMessages(filter, { time: TIMEOUT, max: 1, errors: ["time"] })
    .then(async function (messages) {
      const userInput = messages.first().content.toLowerCase().trim();
      const instantEffectCheatValues = [
        "indiana jones",
        "robin hood",
        "man undercover",
        "shawshanks redemption",
        "cheese steak jimmy's", 
        "despicable me", 
        "i r winner", 
        "resign"
      ];
      if(instantEffectCheatValues.includes(userInput)){
        game.cheats.doAction(instantEffectCheatValues.indexOf(userInput));
        return;
      }
      const flagCheatValues = [
        "marco", 
        "no police", 
        "not greedy"
      ];
      if(flagCheatValues.includes(userInput)){
        game.cheats.setFlag(flagCheatValues.indexOf(userInput));
        return;
      }
      const saveValues = ["save", "s"];
      if(saveValues.includes(userInput)){
        game.save();
        return;
      } 
      const option1Values = ["1", "a", "option1", "optiona"];
        if(option1Values.includes(userInput)){
          game.event.selectOption({optionNumber: 0, handlingForesightDiscard: handlingForesightDiscard});
          return;
      }
      const option2Values = ["2", "b", "option2", "optionb"];
      if(option2Values.includes(userInput)){
          game.event.selectOption({optionNumber: 1, handlingForesightDiscard: handlingForesightDiscard});
          return;
      }
      const option3Values = ["3", "c", "option3", "optionc"];
      if(option3Values.includes(userInput)){
          game.event.selectOption({optionNumber: 2, handlingForesightDiscard: handlingForesightDiscard});
          return;
      }
       return game.terminate();
      
    }).catch((err) => {
        console.log(err);
        return game.terminate();
    });
  }
}
    /**
    * This class' purpose is handling the game Events
    */
    class Event {
       constructor(game) {
        this.number = 0,
        this.hasForesight = false,
        this.hasDiscard = false,
        this.isRecurring = false,
        this.options = [],
        this.game = game
      }
      
      async sendCardTexture(cardNumber){
        if(!cardNumber){
          cardNumber = this.number;
        }
        const url = `http://underhand.clanweb.eu/res/Card${cardNumber}.png`;
        await message.channel.send("", {
            files: [url]
          });
      }
      
      sendOptionsEmbed(){
        let embed = {
          fields: []
        }
          for (const option of this.options) {
            if(!option.isDefined){
              continue;
            }
            if(!embed.description){
              embed.title = option.option_text;
              embed.description = ":x: " + option.consume_emojis + "\n:white_check_mark: " + option.provide_emojis + "\n" + option.output_text;
              continue;
            }
            embed.fields.push({
              name: option.option_text,
              value: ":x: " + option.consume_emojis + "\n:white_check_mark: " + option.provide_emojis + "\n" + option.output_text,
              inline: false
            });
          }
        message.channel.send(utils.buildEmbed(embed));
      }
      
      async selectOption({optionNumber, handlingForesightDiscard}){
        const optionNumbers = {
          OPTION_1: 0,
          OPTION_2: 1,
          OPTION_3: 2
        }
        if(handlingForesightDiscard){
          if (event_data_file[this.game.base_deck[optionNumber]].isrecurring == 1) {
              this.game.discard_deck.push(this.game.base_deck[optionNumber]);
          }
              this.game.base_deck.splice(optionNumber, 1);
        }
          if(this.options[optionNumber].isDefined){
            if(this.game.player.hasEnoughResources(optionNumber)){
              this.game.player.exchangeResources(optionNumber);
              if(this.options[optionNumber].isWin){
                this.game.win(this.options[optionNumber].god);
              }
              if(this.options[optionNumber].isLose){
                this.game.lose();
              }
              if(this.isRecurring){
                this.game.discard_deck.push(this.game.base_deck[0]);
              }
              this.game.base_deck.shift();
              this.insertEventCards(optionNumber);
              return;
            }
            message.channel.send("Not enough resources");    
          }
          message.channel.send("Can't select this option");
          await setTimeout(() => {}, this.game.mysc.TIMEOUT);  
      }
      
      async next(){
        const rawEvent = event_data_file[this.game.base_deck[0]];
        console.log(rawEvent);
        this.number = this.game.base_deck[0],
        this.isRecurring = rawEvent.isrecurring,
        this.options = [
          new Option({game: game, optionData: rawEvent.option1}),
          new Option({game: game, optionData: rawEvent.option2}),
          new Option({game: game, optionData: rawEvent.option3})
        ];
       await this.sendCardTexture();
       await this.sendOptionsEmbed();
       await this.game.player.sendResourcesInHandEmbed();
      }    
      
      async handleForesight(){
        if(this.game.mysc.hasForesight){
          if(this.game.base_deck.length < 3){
            this.game.mysc.reshuffle();
          }
          this.foresight(this.game.mysc.hasDiscard);
        }
       await setTimeout(() => {
        return; 
       }, this.game.mysc.TIMEOUT); 
      }
      
      foresight({canDiscard}){
        for(let i = 0; i < 3; i++){
          this.sendCardTexture(this.game.base_deck[i]);
        }
        if(canDiscard){
          this.game.handleUserInput(canDiscard);
        }
      }
      
      insertEventCards(optionNumber){
        if(!this.options[optionNumber].doesInsert){
          return;
        }
        if(this.options[optionNumber].hasSpecificids){
          this.game.discard_deck.push(this.options[optionNumber].specificids);
          return;
        }
        for(let i = 0; i < this.options[optionNumber].insertCount; i++){
          let randomNumber = utils.randomNumber(this.options[optionNumber].insertLowerBound, this.options[optionNumber].insertUpperBound);
          this.game.dicard_deck.push(randomNumber);
        }
      }
    }
    /**
    * The options of the Events, holding important information about the
    * the event, it's options and their impact on the game
    */
    class Option {
      constructor({game, optionData}) {
        this.game = game,
        this.isDefined = (optionData.optiontext != ""),
        this.consume_values = [
          optionData.requirements.relic,
          optionData.requirements.money,
          optionData.requirements.cultist,
          optionData.requirements.food,
          optionData.requirements.prisoner,
          optionData.requirements.suspicion
        ],
        this.cultistEqualsPrisoner = (optionData.cultistequalsprisoner == 1),
        this.doesInsert = (optionData.shuffle.numcards > 0),
        this.hasSpecificids = (optionData.shuffle.specificids != []),
        this.specificids = optionData.shuffle.specificids,
        this.insertCount = optionData.shuffle.numcards,
        this.insertLowerBound = optionData.shuffle.lowerbound,
        this.insertUpperBound = optionData.shuffle.upperbound,
        this.hasRandomRequirements = (optionData.randomrequirements > 0),
        this.randomRequirements = optionData.randomrequirements,
        this.isWin = (optionData.iswin != ""),
        this.god = optionData.iswin,
        this.isLose = optionData.islose,
        this.consume_emojis = "";
        for(let resource_type = 0; resource_type < this.consume_values.length; resource_type++){
          if(this.consume_values[resource_type] == 420){    
            if(this.game.player.resources[resource_type] > 1){
               this.consume_values[resource_type] = Math.ceil(this.game.player.resources[resource_type] / 2);
            }else{
              this.consume_values[resource_type] = 0;
            }
          }
          for(let resource_quantity = 0; resource_quantity < this.consume_values[resource_type]; resource_quantity++){
            if (this.consume_values[resource_quantity] > 3) {
              if (this.cultistEqualsPrisoner && this.resource_type == this.game.ResourceTypes.CULTIST) {
                this.consume_emojis += ` ${this.consume_values[resource_type]}x ${this.game.resources.cultist_equals_prisoner_emoji}`;
              } else {
                this.consume_emojis += ` ${this.consume_values[resource_type]}x ${this.game.resources.resources_discord_emojis[resource_type]}`;
              }
              continue;
            }else{
              if (this.cultistEqualsPrisoner && this.resource_type == this.game.player.ResourceTypes.CULTIST) {
                this.consume_emojis += ` ${this.game.resources.cultist_equals_prisoner_emoji}`;
              } else {
                this.consume_emojis += ` ${this.game.resources.resources_discord_emojis[resource_type]}`;
              }
            }
          }
        }
        if (this.consume_emojis == "") {
              this.consume_emojis = "-";
        }
        this.provide_values = [
          optionData.rewards.relic,
          optionData.rewards.money,
          optionData.rewards.cultist,
          optionData.rewards.food,
          optionData.rewards.prisoner,
          optionData.rewards.suspicion
        ],
        this.provide_emojis = "";
        for(let resource_type = 0; resource_type < this.provide_values.length; resource_type++){
          for(let resource_quantity = 0; resource_quantity < this.provide_values[resource_type]; resource_quantity++){
            if (this.provide_values[resource_quantity] > 3) {
              this.provide_emojis += ` ${this.provide_values[resource_type]}x ${this.game.resources.resources_discord_emojis[resource_type]}`;
              break;
            }
              this.provide_emojis += ` ${this.game.resources.resources_discord_emojis[resource_type]}`;
          }
        }
        if (this.provide_emojis == "") {
          this.provide_emojis = "-";
        }
        this.option_text = optionData.optiontext,
        this.output_text = optionData.outputtext
      }
    }
    /**
    * This class is responsible for handling cheats in the game
    */
    class Cheats {
      constructor(game) {
        this.cheats = false,
        this.greedProtect = false,
        this.policeProtect = false,
        this.openDeck = false,
        this.game = game
      }
      
      apply(){
        if(this.greedProtect){
          if(this.game.base_deck[0] == this.game.mysc.this.EventNumbers.GREED){
            this.game.base_deck.shift();
          }
        }
        if(this.policeProtect){
          if(this.game.base_deck[0] == this.game.mysc.this.EventNumbers.POLICE_RAID){
            this.game.base_deck.shift();
          }
        }
        if(this.openDeck){
          message.channel.send("[" + this.game.base_deck.join(", ") + "]");
        }
      }
      
      setFlag(flag){
        this[flag] = !this[flag];
        this.cheated();
      }
      
      doAction(actionData){
        const ActionTypes = {
          RESIGN: 7,
          WINNER: 8,
        }
        switch(actionData){
          case ActionTypes.RESIGN:
            this.game.lose();
          break; 
          case ActionTypes.WINNER:
            this.game.win();
          break;
          default:
            if(actionData > 6){
              this.game.player.resources[actionData] += 10;
            }
        }
        this.cheated();
      }
      cheated(){
        this.cheats = true;
      }
    }
    /**
    * This class handles working with player resources
    */
    class Player {
      constructor(game){
        this.game = game;
        this.resources = [0, 2, 2, 2, 2, 0],
        this.ResourceTypes = {
            RELIC : 0,
            MONEY : 1,
            CULTIST: 2,
            FOOD: 3,
            PRISONER: 4,
            SUSPICION: 5
        }
      }
      /**
      * Prints embed with the resources the player currently has
      */
      sendResourcesInHandEmbed(){
        let embedDescription = "";
        for (let resource_type = 0; resource_type < this.resources.length; resource_type++) {
            if (this.resources[resource_type] > 4) {
              embedDescription += ` ${this.resources[resource_type]}x ${this.game.resources.resources_discord_emojis[resource_type]}`;
              continue;
             }
          for(let resource_quantity = 0; resource_quantity < this.resources[resource_type]; resource_quantity++){
            embedDescription += " " + this.game.resources.resources_discord_emojis[resource_type];
          } 
        }
        const total_resources = utils.summarizeArray(this.resources);
        embedDescription += ` (${total_resources})`;  
        message.channel.send(utils.buildEmbed({description: embedDescription}));
      }
      
      exchangeResources(optionNumber){
        if(this.game.event.options[optionNumber].hasRandomRequirements){
          this.exchangeRandomResources(optionNumber);
          return;
        }
          for(let resource_type = 0; resource_type > this.resources.length; resource_type++){
             const CONSUMES_OF_KIND = this.game.event.options[optionNumber].consume_values[resource_type];
            
          // Relics work as wildcards for other resources so you don't want to count them twice
          if(resource_type == this.ResourceTypes.RELIC){
            this.resources[resource_type] -= CONSUMES_OF_KIND;
            continue;
          }
          if(this.game.event.options[optionNumber].cultistEqualsPrisoner){
            if([this.ResourceTypes.CULTIST, this.ResourceTypes.PRISONER].includes[resource_type]){
              const availableResourceTypes = [this.ResourceTypes.PRISONER, this.ResourceTypes.CULTIST, this.ResourceTypes.RELIC];
              let remainingResourcesToConsume = CONSUMES_OF_KIND;
              let consumeResourceType = 0;
              while(remainingResourcesToConsume > 0){
                
                if(remainingResourcesToConsume > this.resources[availableResourceTypes[consumeResourceType]]){
                  remainingResourcesToConsume -= this.resources[availableResourceTypes[consumeResourceType]];
                  this.resources[consumeResourceType] = 0;
                  consumeResourceType++ 
                }else{
                  this.resources[consumeResourceType] -= remainingResourcesToConsume;
                  remainingResourcesToConsume = 0;
                }
              }
              continue;
            }
          }  
          if(CONSUMES_OF_KIND > this.resources[resource_type]){
            let remainingResourcesToConsume = CONSUMES_OF_KIND;
            remainingResourcesToConsume -= this.resources[resource_type];
            this.resources[resource_type] = 0;
            this.resources[this.ResourceTypes.RELIC] -= remainingResourcesToConsume;
            remainingResourcesToConsume = 0;
          }else{
            this.resources[resource_type] -= CONSUMES_OF_KIND;
          }  
        }
        this.rewardResources(optionNumber);
      }
      
      exchangeRandomResources(optionNumber){
        for (let i = 0; i < this.game.event.options[optionNumber].randomRequirements; i++){
          let indexesWithResources = [];
          for(let resource_type = 0; this.resources.length; resource_type++){
            if(this.resources[resource_type] > 0){
              indexesWithResources.push(resource_type);
            }
          }
          if(indexesWithResources.length == 0){
            break;
          }
          let randomNumber = utils.randomNumber(0, indexesWithResources.length);
          this.resources[indexesWithResources[randomNumber]]--;
        }
        this.rewardResources(optionNumber);
      }
      
      rewardResources(optionNumber){
        for(let resourceType = 0; resourceType < this.game.event.options[optionNumber].consume_values.length; resourceType++){
          this.game.player.resources[resourceType] += this.game.event.options[optionNumber].provide_values[resourceType];
        }
      }
      
      hasEnoughResources(optionNumber){
        for(let resource_type = 0; resource_type > this.resources.length; resource_type++){
          // Relics work as wildcards for other resources so you don't want to count them twice
          if(resource_type == this.ResourceTypes.RELIC){
            if(this.game.event.options[optionNumber].consume_values[resource_type] > this.resources[resource_type]){
              return false;
            }
            continue;
          }
          if(this.game.event.options[optionNumber].cultistEqualsPrisoner){
            if([this.ResourceTypes.CULTIST, this.ResourceTypes.PRISONER].includes[resource_type]){
              const CULTISTS_AND_PRISONERS = this.resources[this.ResourceTypes.CULTIST] + this.resources[this.ResourceTypes.PRISONER] + this.resources[this.ResourceTypes.RELIC];
              if(this.game.event.options[optionNumber].consume_values[resource_type] > CULTISTS_AND_PRISONERS){
                return false;
              }
              continue;
            }  
          }
          const TOTAL_RESOURCES_OF_KIND = this.resources[resource_type] + this.resources[this.ResourceTypes.RELIC];
          if(this.game.event.options[optionNumber].consume_values[resource_type] > TOTAL_RESOURCES_OF_KIND){
                return false;
          }
        }
        return true;
      }
    }
    /**
    * This class contains various values and utilities that are
    * crucial for the running of the game but do not actually fit
    * elsewhere
    */
    class Mysc {
      constructor(game){
        this.game = game,
        this.hasForesight = false,
        this.hasDiscard = false,
        this.TIMEOUT = 600,
        this.EventNumbers = {
          POLICE_RAID: 2,
          GREED: 56,
          DESPERATE_MEASURES: 27,
        }
      }
      /**
      * Suffle discard_deck and then push it to base_deck so the possible remaining
      * events are not shuffled
      */
      async reshuffle(){
        this.game.discard_deck = utils.shuffleArray(this.game.discrad_deck);
        this.game.base_deck.push(this.game.discard_deck);
        this.game.discard_deck = [];
        message.channel.send("Reshuffling deck from discard..."); 
        await setTimeout(() => {
           return;
        }, this.TIMEOUT);
      }
      /**
      * Reshuffle the deck in case the base_deck is empty
      */
      reshuffleIfEmpty(){
        if(this.game.base_deck.length == 0){
          this.reshuffle();
        }
      }
      /**
      * Check for special conditions to insert special events in the deck
      * Note to add only one punishment at a time for conditions may be different
      * next time
      */
      handlePunishments(){
        //Desperate Measures may get triggered when on 0 food
        if (this.game.player.resources[this.game.player.ResourceTypes.FOOD] == 0) {
          const random = Math.floor(Math.random() * 2);
          if (random == 0) {
            this.game.base_deck.unshift(this.EventNumbers.DESPERATE_MEASURES);
            return;
          }
         }
        //Police Raid may get triggered when on more than 4 suspicion
         if (this.game.player.resources[this.game.player.ResourceTypes.SUSPICION] > 4) {
           const random = Math.floor(Math.random() * 2);
           if (random == 0) {
             this.game.base_deck.unshift(this.EventNumbers.POLICE_RAID);
             return;
           }
          }
          //Greed may get triggered when on more than 15 resources in general
          if (utils.summarizeArray(this.game.player.resources) > 15) {
            const random = Math.floor(Math.random() * 2);
            if (random == 0) {
              this.game.base_deck.unshift(this.EventNumbers.GREED);
              return;
            }
          }
      }
    }
    /**
    * This class contains resources needed for the running of the game, they 
    * are completely different from the resources the player owns
    */
    class Resources {
      constructor(){
        this.resources_discord_emojis = [
          "<:exchange_relic:839430819004809256>", 
          "<:exchange_money:839430799237709824>", 
          "<:exchange_cultist:839430767750938636>", 
          "<:exchange_food:839430789460656168>", 
          "<:exchange_prisoner:839430809194725383>", 
          "<:exchange_suspicion:839430828638470146>"
         ],
        this.cultist_equals_prisoner_emoji = "<:exchange_cultist_prisoner:839430778365804566> "
        return this;
      }
    }
    
    /**START
    * The game loop. As long as the loop is going on, the game is
    */
    let game = new Game().init();
 
    while(game.running){
     // console.log(game);
      game.cheats.apply();
      game.event.next();
     // console.log(game)
      await game.handleUserInput({handlingForesight: false});
      await game.event.handleForesight();
      game.mysc.reshuffleIfEmpty();
      game.mysc.handlePunishments();
    }
    return;
    /**END
    * The loop is interrupted within the Game#handleUserInput() method on user's behalf
    * or by TimeoutError
    */
    
  }
}