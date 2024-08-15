import categoryModels from "../models/categoryModels.js";

import slugify from "slugify";
export const createCategoryController = async (req, res) => {

    try {

        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: 'Name is required' })
        }

        const existingCategory = await categoryModels.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                successful: true,
                message: 'Category Already Exists'
            })
        }

        const category = await new categoryModels({ name, slug: slugify(name) }).save();

        res.status(201).send({
            successful: true,
            message: 'New Category Created',
            category
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            error,
            message: 'Error in category'
        })
    }
}


export const updateCategoryController = async (req, res) => {

    try {
        const { name } = req.body
        const { id } = req.params
        const category = await categoryModels.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true });
        res.status(200).send({
            successful: true,
            message: 'Category updated successfully',
            category
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            successful: false,
            message: 'Error in creating category',
            error
        })
    }

}

export const categoryController = async (req, res) => {

    try {
        const category = await categoryModels.find({});
        res.status(200).send({
            successful: true,
            message: 'All categories list',
            category,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({

            successful: true,
            error,
            message: 'Errror in getting all categories'



        })
    }

}

export const singleCategoryontroller = async (req, res) => {
    try {


        const category = await categoryModels.findOne({ slug: req.params.slug });
        res.status(200).send(
            {
                successful: true,
                message: 'Single category fetched successfully',
                category
            }
        )


    }

    catch (error) {
        console.log(error);
        res.status(500).send({

            successful: false,
            error,
            message: 'Error in getting single category'


        }
        )
    }

}

export const deleteCategoryController = async (req, res) => {

    try {
        const { id } = req.params;
        await categoryModels.findByIdAndDelete(id);
        res.status(200).send({
            successful: true,
            message: 'Category Deleted Successfully',
        })
    }
    catch (error) {
        console.log(error);
        res.stataus(500).send({
            successful: false,
            message: 'Error in deleting category',
            error
        })
    }

}