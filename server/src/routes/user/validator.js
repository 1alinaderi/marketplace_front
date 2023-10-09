const expressValidator = require("express-validator");
const check = expressValidator.check;

module.exports = new (class {
  productvalidator() {
    return [

      check("wallet").not().isEmpty().withMessage("wallet cant be empty"),

      check("password").not().isEmpty().withMessage("password cant be empty"),
    ];
  }
})();
