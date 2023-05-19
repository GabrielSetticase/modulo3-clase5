const fs = require("fs");
const path = require("path");

function getAllProducts() {
    const filePath = path.join(__dirname, "..", "db/products.json"); // Obtengo la ruta completa
    const data = fs.readFileSync(filePath, "utf8");
    const dataParseada = JSON.parse(data, null, 2);
    return dataParseada.data;
}

function createProducts(products) {
    try {
        const filePath = path.join(__dirname, "..", "db/products.json");
        const data = getAllProducts();
        data.push(products);
        fs.writeFileSync(filePath, JSON.stringify({ data }, null, 2))
        return true

    } catch (error) {
        console.error(error)
        return false
    }
}

function write(data) {
    const filePath = path.join(__dirname, "..", "db/products.json");
    const dataConvertida = JSON.stringify({ data }, null, 2);
    fs.writeFileSync(filePath, dataConvertida);
}

function updateProducts(id, newName, newDescripcion) {
    const data = getAllProducts();

    for (i = 0; i < data.length; i++) {
        if (id == data[i].id) {
            data[i].name = newName;
            data[i].descripcion = newDescripcion;
        }
    }

    try {
        write(data);

    } catch (error) {
        return false
    }

    return data

}


module.exports = { getAllProducts, createProducts, updateProducts }