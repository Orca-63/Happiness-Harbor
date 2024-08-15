import slugify from 'slugify';
import productModel from '../models/productModel.js';
import OrderModel from '../models/OrderModel.js';
import categoryModels from '../models/categoryModels.js';
import fs from 'fs'
import braintree from 'braintree';
import { type } from 'os';
import dotenv from 'dotenv';
dotenv.config();
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
});
export const createProductController = async (req, res) => {

    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })

            case !description:
                return res.status(500).send({ error: 'Description is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !category:
                return res.status(500).send({ error: 'Category is required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' })
            case !shipping:
                return res.status(500).send({ error: 'Shipping is required' })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Image is required and size should be less than 1 MB' });

        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }

        await products.save()
        res.status(200).send({
            successful: true,
            message: 'Program created successfully',
            products,
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            error,
            message: 'Error in creating program'
        })
    }

}

export const getProductController = async (req, res) => {

    try {

        const products = await productModel.find({}).populate('category').select("-photo").limit(30).sort({ createdAt: -1 })
        res.status(200).send({
            successful: true,
            total: products.length,
            message: "All programs",
            products,


        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in fetching all programs',
            error: error.message
        })
    }

};

export const getSingleProductController = async (req, res) => {

    try {

        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
        res.status(200).send({
            successful: true,
            message: 'Program fetched successfully',
            product
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            messsage: 'Error in fetching the program',
            error
        })
    }

}

export const productPhotoController = async (req, res) => {

    try {
        const product = await productModel.findById(req.params.pid).select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in displaying the mage of the program',
            error
        })
    }

}

export const deleteProductController = async (req, res) => {

    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            successful: true,
            message: 'Program deleted successfully',

        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in deleting program',
            error


        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is required' })

            case !description:
                return res.status(500).send({ error: 'Description is required' })
            case !price:
                return res.status(500).send({ error: 'Price is required' })
            case !category:
                return res.status(500).send({ error: 'Category is required' })
            case !quantity:
                return res.status(500).send({ error: 'Quantity is required' })

            case photo && photo.size > 1000000:
                return res.status(500).send({ error: 'Image is required and size should be less than 1 MB' });

        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, { new: true });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type;
        }

        await products.save()
        res.status(200).send({
            successful: true,
            message: 'Program updated successfully',
            products,
        });
    }

    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            error,
            message: 'Error in updating program'
        })
    }

}

export const productFiltersController = async (req, res) => {
    try {

        const { checked, radio } = req.body;
        let args = {}
        if (checked.length > 0)
            args.category = checked
        if (radio.length)
            args.price = { $gte: radio[0], $lte: radio[1] }
        const products = await productModel.find(args)

        res.status(200).send({
            successful: true,
            products,
        })


    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in filtering programs',
            error
        })

    }
}

export const productCountController = async (req, res) => {

    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            successful: true,
            total
        })
    }

    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in getting count of programs',
            error
        })
    }

}

export const productListController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            successful: true,
            products
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in getting list of programs and workshops'
        })

    }
}

export const searchProductController = async (req, res) => {
    try {


        const { keyword } = req.params
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select("-photo");
        res.json(results)

    }
    catch (error) {

        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in searching programs',
            error
        })

    }
}

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")

        res.status(200).send({
            successful: true,
            products
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in fetching similar products'
        })

        error
    }
}


export const productCategoryController = async (req, res) => {

    try {
        const category = await categoryModels.findOne({ slug: req.params.slug });

        const product = await productModel.find({ category }).populate('category')
        res.status(200).send({
            successful: true,
            category,
            product
        })
    }
    catch (error) {
        res.status(400).send({
            successful: false,
            message: 'Error in fetching programs and workshops',
            error
        })
    }

}

export const braintreeTokenController = async (req, res) => {

    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err)
            }
            else {
                res.send(response);
            }

        }
        )
    }

    catch (error) {
        console.log(error);
    }

}

export const braintreePaymentController = async (req, res) => {

    try {
        const { nonce, cart } = req.body
        let total = 0;
        cart.map((i) => { (total += i.price) })
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true

            },
        },

            function (error, result) {
                if (result) {
                    const order = new OrderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id
                    }).save()
                    res.json({ ok: true })
                }
                else {
                    res.status(500).send(error);
                }


            }

        )
    }
    catch (error) {
        console.log(error);
    }



}