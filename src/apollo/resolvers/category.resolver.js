const Category = require('../../models/category.model');

module.exports = {
    Query: {
        getCategory: () => {
            return Category.find();
        },
        getCategory2(parent, args, context) {
            return Category.findById(args.id);
        }
    },
    Mutation: {
        createCategory(parent, args) {
            const newCategory = new Category(
                {
                    title: args.title,
                }
            )
            return newCategory.save();
        },
        // updateMovie(parent, {id, title, description, img, price}) {
        //     return Product.findByIdAndUpdate(id, { title: title, description: description, img: img, price: price });
        // }
    }

}