import foodModel from "../models/foodModel.js";
import fs from "fs"

//add food item
const addFood = async (req, res) => {
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.file.filename,
        category: req.body.category
    })
    try {
        await food.save()
        res.json({ success: true, message: "Food added successfully" })
    } catch (error) {
        res.json({ success: false, message: "Failed to add food" })
    }
}

//list all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        res.json({ success: false, message: "Failed to list food" })
    }
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id)
        await foodModel.findByIdAndDelete(req.body.id)
        fs.unlink(`./uploads/${food.image}`, (err) => {
            if (err) {
                console.log(err)
            }
        })
        res.json({ success: true, message: "Food removed successfully" })
    } catch (error) {
        res.json({ success: false, message: "Failed to remove food" })
    }
}

export { addFood, listFood, removeFood }