const express = require("express")
const {
    createProduct,
    deleteProduct,
    getAllProduct,
    getCart,
    addNewCollection,
    addPopularInWomen,
    removeFromCart,
    addToCart
} = require("../controller/productCtrl")

const router = express.Router()

const jwt = require("jsonwebtoken");

// MiddleWare to fetch user from database
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, "secret_ecom");
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
};

router.get("/allproducts", getAllProduct);

router.get("/newcollections", addNewCollection);

router.get("/popularinwomen", addPopularInWomen);

//Create an endpoint for saving the product in cart
router.post('/addtocart', fetchUser, addToCart)

//Create an endpoint for saving the product in cart
router.post('/removefromcart', fetchUser, removeFromCart)

//Create an endpoint for saving the product in cart
router.post('/getcart', fetchUser, getCart)

router.post("/addproduct", createProduct);

router.post("/removeproduct", deleteProduct);

module.exports = router