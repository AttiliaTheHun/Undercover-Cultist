const Discord = require("discord.js");
const cardwipfile = require("../cardwip.json"); //import data file
const event_data_file = JSON.parse(JSON.stringify(cardwipfile)); //initialize data file

module.exports = {
  name: "playold",
  syntax: "play [\"load\"]/[blessings]",
  description: "Starts a game of Underhand right here in dicord",
  note: "Complete guide can be found in <#767455245382320138> in the [Underhand server](https://discord.gg/invite/Rb5kUzE)\nThis can produce tons of spam so please, use it in designated channels or bot commands channels",
  permissions: "",
  master: false,
  aliases: ["p", "underhand", "u"],
  legend: "blessings",
  category: "underhand",
  async execute(message, args, utils) {

    if (message.guild.id == 643706781427695616 && (message.channel.id != 721735042682060853 && message.channel.id != 766993942242787369)) {
      message.channel.send("Not in this channel please");
      return;
    }

    class Option {
      constructor() {
        this.defined = false,
        this.consume_values = [],
        this.consume_emojis = "",
        this.provide_values = [],
        this.provide_emojis = "",
        this.option_text = "",
        this.output_text = ""
      }
    }

    try {
      const resources_discord_emojis = ["<:exchange_relic:644177849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>", "<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:644177968536748032>"];
      const cultist_equals_prisoner_emoji = "<:exchange_cultist_prisoner:766628698963050566>";


      let base_deck = [];
      let discard_deck = [];
      let resources = [];
      let mode = "play";


      if (args[0] == "load" || args[0] == "l") {
        if (args[1] == null /*|| !args[1].includes("{\"base\"}:[")*/) {
          message.channel.send("Missing the data string, don't forget to provide it.")
          return;
        } else {
          //get data from data string
          const game_data = JSON.parse(args[1]);
          //load data
          base_deck = game_data.base;
          discard_deck = game_data.discard;
          resources = game_data.resources;
          //sayd that game was loaded from data string to track data string manipulation
          mode = "load";
        }
      } else {

        new_game();
        base_deck = utils.shuffle(base_deck);
      }

      //cheat variables
      let cheats = false;
      let greedprotect = false;
      let nopolice = false;
      let marco = false;


      const option_selected = 0;
      let foresight = false;
      let with_discard = false;
      const recurring = false;


      let run = true;
      let options;
      let option_property;

      while (run) {
        if (!foresight) {
          console.log("Loop started")
          //prevent app from fall
          if (base_deck.length == 0 || base_deck[0] == null) {
            message.channel.send("Game Terminated: Ran out of cards in deck");
            run = false;
            return;
          }

          const event = event_data_file[base_deck[0]];

          try {
            let check = event.title;
            check = check.length.toString(); //fails if check is undefined
          } catch (err) {
            message.channel.send("**UndefinedEventException:** one event was skiped because of null information about this event");
            base_deck.shift(); //remove the event from the deck
            continue; //skip the loop for we have no event to work with
          }


          if (marco) {
            message.channel.send(base_deck.join(" "));
          }

          options = [new Option(), new Option(), new Option()]
          option_property = "";

          /*Generate event options*/
          for (let option_number = 0; option_number < 3; option_number++) {
            option_property = `option${option_number + 1}`;


            if (event[option_property].optiontext != "") {
              options[option_number].option_text = event[option_property].optiontext;
              options[option_number].defined = true;
              if (event[option_property].outputtext != "" && event[option_property].outputtext != undefined) {
                options[option_number].output_text = event[option_property].outputtext;
              } else if (event[option_property].islose == 1) {
                options[option_number].output_text = "You Lose";
              }
            } else {
              break;
            }

            options[option_number].consume_values = [event[option_property].requirements.relic, event[option_property].requirements.money, event[option_property].requirements.cultist, event[option_property].requirements.food, event[option_property].requirements.prisoner, event[option_property].requirements.suspicion];
            options[option_number].provide_values = [event[option_property].rewards.relic, event[option_property].rewards.money, event[option_property].rewards.cultist, event[option_property].rewards.food, event[option_property].rewards.prisoner, event[option_property].rewards.suspicion];

            /*Create consumes and provides emoji sets for each resource*/
            for (let resource_number = 0; resource_number < 6; resource_number++) {
              /*420 is a magic number indicating the bigger half of player's resources of given type*/
              if (options[option_number].consume_values[resource_number] == 420) {
                if (resources[resource_number] == 1) {
                  options[option_number].consume_values[resource_number] = 0;
                } else {
                  options[option_number].consume_values[resource_number] = Math.ceil(resources[resource_number] / 2);
                }
              }
              /*create consumes emoji set*/
              for (let resource_count = 0; resource_count < options[option_number].consume_values[resource_number]; resource_count++) {
                if (option_number == 2 && event[option_property].cultistequalsprisoner == 1) {
                  options[option_number].consume_emojis = options[option_number].consume_emojis + " " + cultist_equals_prisoner_emoji;
                } else {
                  if (options[option_number].consume_values[resource_number] > 3) {
                    options[option_number].consume_emojis = options[option_number].consume_emojis + ` ${options[option_number].consume_values[resource_number]}x ${resources_discord_emojis[resource_number]}`;
                    break;
                  }
                  options[option_number].consume_emojis = options[option_number].consume_emojis + " " + resources_discord_emojis[resource_number];
                }
              }


              for (let resource_count = 0; resource_count < options[option_number].provide_values[resource_number]; resource_count++) {
                if (options[option_number].provide_values[resource_number] > 3) {
                  options[option_number].provide_emojis = options[option_number].provide_emojis + ` ${options[option_number].provide_values[resource_number]}x ${resources_discord_emojis[resource_number]}`;
                  break;
                }
                options[option_number].provide_emojis = options[option_number].provide_emojis + " " + resources_discord_emojis[resource_number];
              }
            }
            if (options[option_number].consume_emojis == "") {
              options[option_number].consume_emojis = "-";
            }
            if (options[option_number].provide_emojis == "") {
              options[option_number].provide_emojis = "-";
            }


          }
          const embed = new Discord.MessageEmbed();
          for (const option of options) {
            if (!option.defined) {
              break;
            }
            embed.addField(option.option_text, ":x: " + option.consume_emojis + "\n" + ":white_check_mark: " + option.provide_emojis + "\n" + option.output_text);
          }

          await message.channel.send("", {
            files: [`http://underhand.clanweb.eu/res/Card${base_deck[0]}.png`]
          });
          await message.channel.send(embed);
          await message.channel.send(module.exports.create_hand(resources_discord_emojis, resources));
        }
        /*console.log(options[option_number].consume_values)
      console.log(options[option_number].provide_values)*/
        const filter = m => (m.author.id === message.author.id && m.content.startsWith("//") == false);
        await message.channel.awaitMessages(filter, { time: 180 * 1000, max: 1, errors: ["time"] })
          .then(async function (messages) {
            let option_selected;
            let option_number;
            if (foresight && !with_discard) {
              foresight = false;
              return;
            } else if (foresight && with_discard) {
              if (messages.first().content.toLowerCase().trim() == "a" || messages.first().content.trim() == "1") {
                option_number = 0;
                if (event_data_file[base_deck[option_number]].isrecurring == 1) {
                  discard_deck.push(base_deck[option_number]);
                }
                base_deck.splice(option_number, 1);
                foresight = false;
                with_discard = false;
                return;
              } else if (messages.first().content.toLowerCase().trim() == "b" || messages.first().content.trim() == "2") {
                option_number = 1;
                if (event_data_file[base_deck[option_number]].isrecurring == 1) {
                  discard_deck.push(base_deck[option_number]);
                }
                base_deck.splice(option_number, 1);
                foresight = false;
                with_discard = false;
                return;
              } else if (messages.first().content.toLowerCase().trim() == "c" || messages.first().content.trim() == "3") {
                option_number = 2;
                if (event_data_file[base_deck[option_number]].isrecurring == 1) {
                  discard_deck.push(base_deck[option_number]);
                }
                base_deck.splice(option_number, 1);
                foresight = false;
                with_discard = false;
                return;
              } else {
                foresight = false;
                with_discard = false;
                return;
              }
            }
            if (messages.first().content.toLowerCase().trim() == "a" || messages.first().content.trim() == "1") {
              option_selected = "option1";
              option_number = 0;
            } else if ((messages.first().content.toLowerCase().trim() == "b" || messages.first().content.trim() == "2") && options[1].option_text.length > 1) {
              option_selected = "option2";
              option_number = 1;
            } else if ((messages.first().content.toLowerCase().trim() == "c" || messages.first().content.trim() == "3") && options[2].option_text.length > 2) {
              option_selected = "option3";
              option_number = 2;
            } else if (messages.first().content.toLowerCase().trim() == "save" || messages.first().content.toLowerCase().trim() == "s") {
              message.channel.send("Here is your data string, you can load it using the *load* argument.");
              message.channel.send(`\`\`\`{"base":[${base_deck}],"discard":[${discard_deck}],"resources":[${resources}]}\`\`\``);
              return run = false;
            } else if (messages.first().content.toLowerCase().trim() == "i r winner") {
              message.channel.send("**You Win**", {
                files: ["http://underhand.clanweb.eu/res/WinScreen.png"]
              });
              cheats = true;
              return run = false;
            } else if (messages.first().content.toLowerCase().trim() == "resign") {
              message.channel.send("You Lose");
              cheats = true;
              return run = false;
            } else if (messages.first().content.toLowerCase().trim() == "marco") {
              marco = !marco;
              cheats = true;
              return;
            } else if (messages.first().content.toLowerCase().trim() == "robin hood") {
              resources[1] = resources[1] + 100; //add the gold
              cheats = true;
              return;
            } else if (messages.first().content.toLowerCase().trim() == "man undercover") {
              resources[2] = resources[2] + 100; //add the cultists
              cheats = true;
              return;
            } else if (messages.first().content.toLowerCase().trim() == "cheese steak jimmy's") {
              resources[3] = resources[3] + 100; //add the food
              cheats = true;
              return;
            } else if (messages.first().content.toLowerCase().trim() == "despicable me") {
              resources[5] = resources[5] + 100;
              cheats = true;
              return;
            } else if (messages.first().content.toLowerCase().trim() == "no police") {
              if (nopolice) {
                nopolice = false;
              } else {
                nopolice = true;
                resources[5] = 0; //get rid of the suspicion
                if (base_deck[0] == 2) { //remove police raid from the deck
                  base_deck.shift();
                }
              }
              cheats = true;
              return;
            } else if (messages.first().content.toLowerCase().trim() == "not greedy") {
              if (greedprotect) {
                greedprotect = false;
              } else {
                greedprotect = true;

                if (base_deck[0] == 56) {
                  base_deck.shift();
                }
              }
              cheats = true;
              return;
            } else {
              run = false;
              message.channel.send("Game Terminated");
            }
            /*consume_values = [event[option_selected].requirements.relic, event[option_selected].requirements.money, event[option_selected].requirements.cultist, event[option_selected].requirements.food, event[option_selected].requirements.prisoner, event[option_selected].requirements.suspicion];
          provide_values = [event[option_selected].rewards.relic, event[option_selected].rewards.money, event[option_selected].rewards.cultist, event[option_selected].rewards.food, event[option_selected].rewards.prisoner, event[option_selected].rewards.suspicion];
       */
            for (let resource_number = 0; resource_number < 6; resource_number++) {
              if (options[option_number].consume_values[resource_number] == 420) {
                if (resources[resource_number] == 1) {
                  options[option_number].consume_values[resource_number] = 0;
                } else {
                  options[option_number].consume_values[resource_number] = Math.ceil(resources[resource_number] / 2);
                }
              }

              let resource_count;
              if (resource_number == 0) {
                resource_count = resources[0];
              } else if ((resource_number == 2 || resource_number == 4) && event[option_selected].cultistequalsprisoner == 1) {
                resource_count = resources[0] + resources[2] + resources[4];
              } else {
                resource_count = resources[0] + resources[resource_number];
              }
              if (options[option_number].consume_values[resource_number] > resource_count) {
                return message.channel.send("Not enough resources");
              } else {
                if (resource_number == 0) {
                  resources[resource_number] -= options[option_number].consume_values[resource_number];
                } else if ((resource_number == 2 || resource_number == 4) && event[option_selected].cultistequalsprisoner == 1) {


                } else if (options[option_number].consume_values[resource_number] > resources[resource_number]) {
                  resources[0] -= (options[option_number].consume_values[resource_number] - resources[resource_number]);
                  resources[resource_number] = 0;
                } else {
                  resources[resource_number] -= options[option_number].consume_values[resource_number];
                }
              }
              resources[resource_number] += options[option_number].provide_values[resource_number];
            }
            if (event[option_selected].randomrequirements > 0) {
              let random = 0;
              let indexes;
              for (let x = 0; x < event[option_selected].randomrequirements; x++) {
                indexes = [];
                for (let i = 0; i < resources.length; i++) {
                  if (resources[i] > 0) {
                    indexes.push(i);
                  }
                }
                if (indexes.length == 0) {
                  break;
                }
                random = Math.floor(Math.random() * indexes.length);
                resources[indexes[random]]--;
              }
            }
            if (event[option_property].randomrequirements > 0) {

            }

            if (event[option_selected].iswin != "") {
              const god = event[option_selected].iswin;
              message.channel.send("**You Won**", {
                files: [`http://underhand.clanweb.eu/res/${god}.png`]
              });
              return run = false;
            } else if (event[option_selected].islose == 1) {
              message.channel.send("You Lose", {
                files: ["http://underhand.clanweb.eu/res/LoseScreen.png"]
              });
              return run = false;
            }

            if (event[option_selected].foresight.hasforesight == 1) {
              if (base_deck.length < 4) {
                const placeholder_deck = base_deck;
                base_deck = discard_deck;
                discard_deck = [];
                await setTimeout(() => { message.channel.send("Reshuffling deck from discard..."); }, 500);
                base_deck = module.exports.shuffle(base_deck);
              }
              message.channel.send("", {
                files: [`http://underhand.clanweb.eu/res/Card${base_deck[1]}.png`,
                  `http://underhand.clanweb.eu/res/Card${base_deck[2]}.png`,
                  `http://underhand.clanweb.eu/res/Card${base_deck[3]}.png`]
              });
              foresight = true;
              if (event[option_selected].foresight.candiscard == 1) {
                with_discard = true;
              }
            }

            if (event.isrecurring == 1) {
              discard_deck.push(base_deck[0]);
            }
            const specificids = event[option_selected].shuffle.specificids;
            for (let card_count = 0; card_count < event[option_selected].shuffle.numcards; card_count++) {
              if (specificids.length > 0) {
                discard_deck.push(specificids[card_count]);
              } else {
                discard_deck.push(Math.floor((Math.random() * event[option_selected].shuffle.upperbound) + event[option_selected].shuffle.lowerbound));
              }
            }
            base_deck.shift();
            if (base_deck.length == 0) {
              base_deck = discard_deck;
              discard_deck = [];
              await setTimeout(() => { message.channel.send("Reshuffling deck from discard..."); }, 500);
              base_deck = utils.shuffle(base_deck);
            }
            let punishment = false;
            if (resources[3] == 0 && punishment == false) {
              const random = Math.floor(Math.random() * 2);
              if (random == 0) {
                base_deck.unshift(27);
                punishment = true;
              }
            }
            if (resources[5] > 4 && punishment == false && nopolice == false) {
              const random = Math.floor(Math.random() * 2);
              if (random == 0) {
                base_deck.unshift(2);
                punishment = true;
              }
            }
            //check card count for greed
            if (module.exports.summarizeArray(resources) > 15 && punishment == false && greedprotect == false) {
              const random = Math.floor(Math.random() * 2);
              if (random == 0) {
                base_deck.unshift(56);
                punishment = true;
              }
            }
          }).catch((err) => {
            // run = false;
            console.log(err);
            return err;
          });
      }
      
      function newGame() {
  resources = [0, 2, 2, 2, 2, 0];
  // base_deck.push(110);
  base_deck.push(29); //Rhybaax
  base_deck.push(106); //Jhai'ti
  base_deck.push(85); //Kekujira
  base_deck.push(79); //Yacare
  base_deck.push(57); //Uhl'Uht'C

  if (args[0] != null) {
    if (args[0].indexOf("g") != -1) {
      base_deck.push(96, 98);
    }
    if (args[0].indexOf("r") != -1) {
      base_deck.push(21, 70);
    }
    if (args[0].indexOf("w") != -1) {
      base_deck.push(23, 97);
    }
    if (args[0].indexOf("j") != -1) {
      base_deck.push(112, 114);
    }
    if (args[0].indexOf("k") != -1) {
      base_deck.push(72, 113);
    }
    if (args[0].indexOf("y") != -1) {
      base_deck.push(38, 111);
    }
    if (args[0].indexOf("u") != -1) {
      base_deck.push(22, 25);
    }
  }

  /*
let initial_events = [];
for(let i = 1; i < 118; i++){
if(cardwip[i].isinitial == 1){
  initial_events.push(i);
}
}
*/
  let initial_events = [1, 3, 4, 6, 7, 8, 9, 10, 13, 14, 24, 26, 28, 37, 45, 51, 67, 68, 69]; //random events to be inserted into the deck

  //add random events to the deck
  for (let i = 0; i < 9; i++) {
    const random = Math.floor(Math.random() * initial_events.length);
    base_deck.push(initial_events[random]);
    initial_events = initial_events.filter(function (value, index, arr) { return value != initial_events[random]; });
  }
}
      
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  create_hand(resources_discord_emojis, resources) {
    let string = "";
    for_type:
    for (let resource_number = 0; resource_number < 6; resource_number++) {
      for (let resource_count = 0; resource_count < resources[resource_number]; resource_count++) {
        if (resources[resource_number] > 4) {
          string += ` ${resources[resource_number]}x ${resources_discord_emojis[resource_number]}`;
          continue for_type;
        }
        string += " " + resources_discord_emojis[resource_number];
      }
    }
    const total_resources = module.exports.summarizeArray(resources);
    string += ` (${total_resources})`;
    const embed = new Discord.MessageEmbed()
      .setDescription(string);
    return embed;
  },
  summarizeArray(array) {
    let sum = 0;
    for (const item of array) {
      sum += item;
    }
    return sum;
  },

//  message.channel.send('Game Terminated');
 
}