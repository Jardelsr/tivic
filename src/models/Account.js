var knex = require("../database/connection");

class Account{
    async new(accountNumber) {
        try{
            await knex.insert({account_number: accountNumber}).table("accounts");
        }catch(error){
            console.log(error); 
            return [];
        }
    }

    async findByCriteria(criteria, value){
        try {
            var result = await knex.select([criteria]).where({account_number:value}).table("accounts");

            if (result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        } catch (error) {
            console.log(error);
            return undefined;            
        }
    }

    async update(accountNumber, value, operation){
        var balance = await this.findByCriteria("balance", accountNumber);

        if (balance != undefined){
            switch(operation){
                case "deposit":
                    var newBalance = +balance.balance + +value;
                    break;
                case "withdraw":
                    var newBalance = +balance.balance - +value;
                    break;
                default:
                    return {error: "Invalid Operation!"};
            }
        }else{
            return {error: "Invalid account!"};
        }

        try {
            if (newBalance > 0){
                await knex.update({balance: newBalance}).where({account_number:accountNumber}).table("accounts");
                return {newBalance: newBalance.toFixed(2)}
            } else {
                return {error: "You don't that amount of money to withdraw"};
            }
            
        } catch (error) {
            return {error: error};
        }

    }
}

module.exports = new Account();