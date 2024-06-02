const asyncHandler = require("express-async-handler")
const Product = require("../models/productModel")

const createProduct = asyncHandler(async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else { id = 1; }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({ success: true, name: req.body.name })
})

const deleteProduct = asyncHandler(async (req, res) => {
    console.log("Removed");
    const product = await Product.findOneAndDelete({ id: req.body.id });
    res.json({ success: true, name: req.body.name })
})

const getAllProduct = asyncHandler(async (req, res) => {
    let products = await Product.find({});
    console.log("All Products");
    res.send(products);
})

const getCart = asyncHandler(async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

const addNewCollection = asyncHandler(async (req, res) => {
    let products = await Product.find({});
    let arr = products.slice(1).slice(-8);
    console.log("New Collections");
    res.send(arr);
})

const addPopularInWomen = asyncHandler(async (req, res) => {
    let products = await Product.find({});
    let arr = products.splice(0, 4);
    console.log("Popular In Women");
    res.send(arr);
})

const removeFromCart = asyncHandler(async (req, res) => {
    console.log("Remove Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    if (userData.cartData[req.body.itemId] != 0) {
        userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed");
})

const addToCart = asyncHandler(async (req, res) => {
    console.log("Add Cart");
    let userData = await Users.findOne({ _id: req.user.id });
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
})

module.exports = {
    createProduct,
    deleteProduct,
    getAllProduct,
    getCart,
    addNewCollection,
    addPopularInWomen,
    removeFromCart,
    addToCart
}