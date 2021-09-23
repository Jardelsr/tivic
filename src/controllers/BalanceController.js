var Account = require("../models/Account");
var jwt = require("jsonwebtoken");

const Settings = require("../models/Settings");

class BalanceController{
    async login(req, res){
        var {accountNumber} = req.body;

        if (accountNumber != undefined){
            var account = await Account.findByCriteria("account_number", accountNumber);

            if (account == undefined){
                await Account.new(accountNumber);
            }
            
            var secret = await Settings.findByName("secret");
            var token = jwt.sign({accountNumber}, secret.value)

            res.status(200);
            res.json({token: token});
        }else{
            res.status(400);
            res.json({error: "the account number is not defined"})

            return;
        }

    }

    async balance(req, res){
        const authToken = req.headers['authorization']
        const bearer = authToken.split(' ');

        var token = bearer[1];
        var secret = await Settings.findByName("secret");
        var decoded = jwt.verify(token, secret.value);
        var accountNumber = decoded.accountNumber;

        if (accountNumber.toString().length > 10 || accountNumber == undefined) {
            res.status(400);
            res.json({error: "conta inválida"})
            return;
        }

        var balance = await Account.findByCriteria("balance", accountNumber);

        if(balance == undefined){
            await Account.new(accountNumber);
            var balance = await Account.findByCriteria("balance", accountNumber);
        }

        res.status(200);
        res.json(balance);
    }

    async deposit(req, res){
        const authToken = req.headers['authorization']
        const bearer = authToken.split(' ');

        var token = bearer[1];
        var secret = await Settings.findByName("secret");
        var decoded = jwt.verify(token, secret.value);
        var accountNumber = decoded.accountNumber;
        var {value} = req.body;

        if (value != undefined){
            var result = await Account.update(accountNumber, value, "deposit")

            res.status(200);
            res.json(result);
        }else{
            res.status(400);
            res.json({error: "No value entered"})

            return;
        }
    }

    async withdraw(req, res){
        const authToken = req.headers['authorization']
        const bearer = authToken.split(' ');

        var token = bearer[1];
        var secret = await Settings.findByName("secret");
        var decoded = jwt.verify(token, secret.value);
        var accountNumber = decoded.accountNumber;
        var {value} = req.body;

        if (value != undefined){
            var result = await Account.update(accountNumber, value, "withdraw")

            res.status(200);
            res.json(result);
        }else{
            res.status(400);
            res.json({error: "No value entered"})
            return;
        }
    }
}

module.exports = new BalanceController();