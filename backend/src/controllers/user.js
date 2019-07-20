import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import config from '../config';
import { validateRegisterInput, validateLoginInput } from '../utils/validation';

const oneHourInSeconds = 60 * 60 * 60 * 60;

const register = (req, res, next) => {
  const payload = req.body;
  const { errors, isValid } = validateRegisterInput(payload);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: payload.email }).then((user) => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(payload.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.createdAt = new Date();
          newUser
            .save()
            .then(() => res.json({ message: 'User Created' }))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

const login = (req, res, next) => {
  const payload = req.body;
  const { errors, isValid } = validateLoginInput(payload);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = payload;
  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        };

        jwt.sign(
          payload,
          config.secret,
          { expiresIn: oneHourInSeconds },
          (err, token) => {
            res.json({
              ...payload,
              token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
};

function currentUser(req, res) {
  res.json({
    name: req.user.name,
    email: req.user.email,
    createdAt: req.user.createdAt
  });
}

export { register, login, currentUser };
