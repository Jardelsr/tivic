var express = require("express")
var router = express.Router();
var BalanceController = require("../controllers/BalanceController");
var AdminAuth = require("../middleware/Auth")

router.post('/login', BalanceController.login);
router.get('/accounts/balance', AdminAuth, BalanceController.balance);
router.post('/accounts/deposit', AdminAuth, BalanceController.deposit);
router.post('/accounts/withdraw', AdminAuth, BalanceController.withdraw);

module.exports = router;