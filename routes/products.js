var express = require('express');
var router = express.Router();

const { getAllProducts, createProducts, updateProducts } = require("../services/products");
const { body, validationResult } = require('express-validator');

/* GET users listing. */
router.get('/', function (req, res, next) {
    const allProducts = getAllProducts()
    res.send(allProducts);
});

router.post("/", [
    body("id").isNumeric(),
    body("name").isLength({ max: 15 }),
    body("descripcion").isLength({ max: 50 })
], function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    const body = req.body
    const createResponse = createProducts(body)
    if (createResponse) {
        return res.send("Created")
    }
    res.send("Error")
})

router.patch("/", function (req, res, next) {
    const body = req.body
    const createResponse = updateProducts(body.id, body.name, body.descripcion)
    if (createResponse) {
        return res.send("upDate ok")
    }
    res.send("Error")
})

module.exports = router;
