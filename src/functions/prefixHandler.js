module.exports = (client) => {
    client.prefixCommands = async (eventFile, path) => {
      const ascii = require("ascii-table");
      const fs = require("fs");
      const table = new ascii().setHeading("File Name", "Status");
    
      for (const folder of eventFile) {
        const commands = fs
          .readdirSync(`./src/prefixCommands/${folder}`)
          .filter((file) => file.endsWith(".js"));
    
        for (const file of commands) {
          const command = require(`../prefixCommands/${folder}/${file}`);
    
          if (command.name) {
            client.pcommands.set(command.name, command);
            table.addRow(file, "✅");
    
            if (command.aliases && Array.isArray(command.aliases)) {
              command.aliases.forEach((alias) => {
                client.aliases.set(alias, command.name);
              });
            }
          } else {
            table.addRow(file, "❌");
            continue;
          }
        }
      }
      console.log(table.toString(), "\n✅ Loaded Prefix Commands");
    }
  }