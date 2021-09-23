var knex = require("../database/connection");

class Settings{
    async findByName(name){
        try {
            var result = await knex.select(['value']).where({name:name}).table("settings");
            return result[0];
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = new Settings();