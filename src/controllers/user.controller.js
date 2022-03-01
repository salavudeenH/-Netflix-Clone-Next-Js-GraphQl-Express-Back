const User = require("../models/user.model");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("../configs");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.register = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    isAdmin: false,
    password: hashedPassword,
    isSuscribe: false,
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
          isAdmin: data.isAdmin,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured",
      });
    });
};

exports.login = (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .then((user) => {
      console.log(user);
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "Le mot de passe est incorrect",
          auth: false,
          token: null,
        });
      }
      let userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
        ...user._doc,
      });
    })
    .catch((err) =>
      res.send({ message: "L'adresse mail ou le mot de passe est invalide" })
    );
};

exports.getUser = (req, res) => {
  console.log(req.user);
  User.findById(req.user.id)
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => res.status(404).send(err));
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.verifyToken = (req, res) => {
  if (req.user) {
    res.status(200).json({ verify: true });
  }
};

exports.payment = async (req, res, next) => {
  const { userID } = req.query;
    const storeItems = new Map([
      [0, { priceInEUR: 30, name: "Essential" }],
      [1, { priceInEUR: 60, name: "Standard" }],
      [2, { priceInEUR: 100, name: "Premium" }],
    ]);
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `http://localhost:3000/confirmation?plan=${userID}`,
        cancel_url: `http://localhost:3000/cancel?plan=${userID}`,
        line_items: req.body.items.map((item) => {
          const storeItem = storeItems.get(item.id);
          return {
            price_data: {
              currency: "eur",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInEUR * 100,
            },
            quantity: item.quantity,
          };
        }),
      });
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };
  
  exports.verifyPayment = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      user.isSuscribe = true;
      user.suscribeAt = Date.now();
      await user.save();
      res.json({ user: user, err: false });
    } catch (err) {
      res.status(400).json({ err: true });
    }
  };
  
