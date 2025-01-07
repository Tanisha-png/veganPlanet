const foods = [
    {alternativeFor: "milk", alternatives: ['almond milk', 'oat milk', 'rice milk', 'coconut milk']},
    {alternativeFor: 'cheese', alternatives: ['nutritional yeast', 'cashew cheese', 'almond cheese', 'soy cheese', 'coconut-based cheese']},
    {alternativeFor: 'eggs', alternatives: ['tofu', 'tempeh', 'seitan', 'edamame']},
    {alternativeFor:  'chicken', alternatives: ['tofu', 'tempeh', 'seitan', 'edamame']},
    {alternativeFor:  'beef', alternatives: ['tofu', 'tempeh', 'seitan', 'edamame']},
    {alternativeFor: 'pork', alternatives: ['tofu', 'tempeh', 'seitan', 'edamame']},
    {alternativeFor: 'butter', alternatives: ['coconut oil', 'olive oil', 'avocado spread', 'earth balance']},
    {alternativeFor: 'chicken eggs', alternatives: ['just egg']},
    {alternativeFor: 'yogurt', alternatives: ['coconut yogurt', 'soy yogurt', 'almond yogurt']},
    {alternativeFor: 'sour cream', alternatives: ['cashew cream', 'tofu-based sour cream', 'coconut cream']},
    {alternativeFor: 'cream cheese', alternatives: ['cashew cream cheese', 'soy-based cream cheese', 'almond-based cream cheese']},
    {alternativeFor: 'bacon', alternatives: ['tempeh bacon', 'smoked tofu']},
    {alternativeFor: 'whey protein', alternatives: ['pea protein', 'hemp protein', 'soy protein', 'rice protein',]},
    {alternativeFor: 'beef', alternatives: ['beyond meat', 'impossible foods']},
];

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Food = require('./models/food.js');


async function seed () {
    await Food.deleteMany({});
    for (let food of foods) {
        for (let alternative of food.alternatives) {
            await Food.create({
                veganName: alternative, 
                alternativeFor: food.alternativeFor,
                foodImage: food.foodImage,
            });
        }
    }
    console.log(await Food.find({}))
}

seed();