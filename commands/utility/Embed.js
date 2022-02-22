const Command = require("../Command.js");
const Colors = require("../../util/colors.js");

module.exports = class Embed extends Command {
  
  constructor(client) {
    super(client, {
      name: 'embed',
      aliases: ['defcmd', 'cmddef'],
      usage: 'embed <embed-pseudo-code>',
      description: `Sends a cool embed`,
      type: client.types.UTILITY,
      userPermissions: [],
      examples: ['embed #title I like Rainbow\\n#color Black'],
      master: false
    });
  }
  
  async execute(message, args) {
    
    const DIRECT_PROPERTIES = [
      'title',
      'description',
      'url'  
    ]
    
    
    let emdString = args.join(" ");
    let lines = emdString.split('\n');
    let embedData = {};
    
    lines.forEach(line => {
      let property_name = (line.includes(" ")) ? line.substring(line.indexOf('#') + 1, line.indexOf(' ')) : line.substring(line.indexOf('#') + 1, line.indexOf('\n'));
      let emdLine = line.substring(line.indexOf(' ')).trim();
      console.log("property_name: " + property_name);
      console.log("emdLine: " + emdLine);
      if(DIRECT_PROPERTIES.includes(property_name)){
        if(property_name == "url"){
           property_name = property_name.replace(">", "").replace("<", "");
        }
        embedData[property_name] = emdLine;
      }else{
        switch(property_name){
          case "field":
            if(!embedData.fields){
              embedData.fields = [];
            }
            embedData.fields.push(parseField(emdLine));
            break;
          case "timestamp":
            embedData.timestamp = new Date();
            break;
          case "color":
            if(emdLine.includes('#')){
              embedData.color = emdLine;
            }else{
              embedData.color = Colors[emdLine];
            }
            break;
          case "author":
            embedData.author = parseField(emdLine);
            break;
          case "thumbnail":
          case "image":
            embedData[property_name].url = emdLine.replace(">", "").replace("<", "");
            break;
          case "footer":
            embedData.footer = parseFooter(emdLine);
            break;
            
        }
      }
      
    });
    
    /* #title [text] -done
      #color [args] [value] -done
      #description [text] -done
      #field [name] (value) {inline} -done
      #url [link] -done
      #author [value] -done
      #timestamp -done
      #footer [text] (icon_url)
      #thumbnail [text] -done
      #image [url]
    */

    function parseField(emdLine){  
      let name = emdLine.substring(emdLine.indexOf('[')  + 1, emdLine.lastIndexOf(']'));
      let value = emdLine.substring(emdLine.indexOf('(')  + 1, emdLine.lastIndexOf(')'));
      let inline = emdLine.substring(emdLine.indexOf('{')  + 1, emdLine.lastIndexOf('}'));
      (inline == "true") ? inline == true : inline == false;
      let field = {
        name: name,
        value: value,
        inline: inline
      };
      return field;
    }
    
     function parseAuthor(emdLine){  
      let name = emdLine.substring(emdLine.indexOf('[') + 1, emdLine.lastIndexOf(']'));
      let icon_url = emdLine.substring(emdLine.indexOf('(')  + 1, emdLine.lastIndexOf(')'));
      let url = emdLine.substring(emdLine.indexOf('{')  + 1, emdLine.lastIndexOf('}'));
      let author = {
        name: name,
        url: url,
        icon_url: icon_url
      };
      return author;
    }
    
    function parseFooter(emdLine){  
      let text = emdLine.substring(emdLine.indexOf('[')  + 1, emdLine.lastIndexOf(']'));
      let icon_url = emdLine.substring(emdLine.indexOf('(')  + 1, emdLine.lastIndexOf(')')).replace(">", "").replace("<", "");
      let footer = {
        text: text,
        icon_url: icon_url
      };
      return footer;
    }
    console.log(embedData);
    let embed = this.client.utils.buildEmbed(embedData);
    console.log(embed);
    message.channel.send(embed);
  }
   
}