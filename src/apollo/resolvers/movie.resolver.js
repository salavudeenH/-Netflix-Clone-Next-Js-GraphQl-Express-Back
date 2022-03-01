const Movie = require('../../models/movie.model');

module.exports = {
    Query: {
        getMovie: () => {
            return Movie.find().populate('categorie');
        },
        getMovieId(parent, args, context) {
            return Movie.findById(args.id).populate('categorie')
        },
        filterCategory(parent, args, context) {
            return Movie.find({categorie:args.categorie}).populate('categorie')
        }
    },
    Mutation: {
        createMovie(parent, args) {
            const newMovie = new Movie(
                {
                    title: args.title,
                    description: args.description,
                    link: args.link,
                    director: args.director,
                    distributor: args.distributor,
                    duration: args.duration,
                    age: args.age,
                    video:args.video,
                    rating: args.rating,
                    releaseDate: args.releaseDate,
                    categorie: args.categorie
                }
            )
            return newMovie.save();
        },
        // updateMovie(parent, {id, title, description, img, price}) {
        //     return Product.findByIdAndUpdate(id, { title: title, description: description, img: img, price: price });
        // }
    }

}