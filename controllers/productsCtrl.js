import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";


//@desc Create new product
//@route POST /api/v1/products
//@access Private/Admin

export const createProductCtrl =  expressAsyncHandler(async(req, res) => {
    const {} =  req.body;
    const {name, description,category, sizes, color,user, price, totalQty, brand} = req.body;

    //Product exists
    const productExists = await Product.findOne({ name });
    if(productExists){
        throw new Error("Product already exists")
    }
    //otherwise, create the product
    const product = await Product.create({
        name,
         description,
         category,
         sizes,
         color,
         user: req.userAuthId,
         price, 
         totalQty,
         brand,
    });

    //push the product into category
    res.json({
        status: "success",
        message: "Product created successfully",
        product,
    })

})

// @desc Get all products
//@route GET /api/v1/products
//access Public

export const getProductsCtrl = expressAsyncHandler(async(req, res) => {
    const products = await Product.find();
    res.json({
        status: "success",
        products,
    })
})
