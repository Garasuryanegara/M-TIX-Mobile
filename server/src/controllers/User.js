const db = require("../models");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const { Op } = require("sequelize");
const sharp = require("sharp");
const URL_IMAGE = process.env.URL_IMAGE;
const mailer = require("../lib/mailer");
const url = process.env.url;

const userController = {
  insertUser: async (req, res) => {
    try {
      console.log(req.body);
      const { email, password, fullname, phone, address } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await db.User.create({
        email,
        password: hashPassword,
        fullname,
        phone,
        address,
      });
      console.log(newUser.dataValues);
      res.send({
        message: `Hi ${newUser.dataValues.fullname}, registration success!`,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { phone, password } = req.body;
      console.log(req.body);
      const user = await db.User.findOne({
        where: {
          [Op.or]: [{ email: phone }, { phone: phone }],
        },
      });
      console.log(user);
      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        console.log(match);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };
          const generateToken = nanoid();
          const token = await db.Token.create({
            token: generateToken,
            expired: moment().add(1, "days").format(),
            payload: JSON.stringify(payload),
            status: "LOGIN",
          });
          return res.send({
            message: `You're successfully logged in!`,
            token: generateToken,
            user,
          });
        } else {
          res.send({
            message: "wrong password!",
          });
        }
      } else {
        res.send({
          message: "email or phone number not found!",
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getIdByToken: async (req, res, next) => {
    try {
      const { token } = req.query;
      // console.log(token);
      // console.log(req.query);
      const p = await db.Token.findOne({
        where: {
          token: req.query.token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
        },
      });
      // console.log(p.dataValues);
      if (!p) {
        throw new Error("token has expired");
      }
      const user = await db.User.findOne({
        where: {
          id: JSON.parse(p.dataValues.payload).id,
        },
      });
      delete user.dataValues.password;
      console.log(user);
      req.user = user.dataValues;
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getUserByToken: async (req, res) => {
    res.send(req.user);
  },
  uploadAvatar: async (req, res) => {
    const { filename } = req.file;
    console.log(req.file);
    await db.User.update(
      {
        avatar_url: URL_IMAGE + filename,
      },
      {
        where: { id: req.params.id },
      }
    );
    await db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => res.send(result));
  },
  uploadAvatarV2: async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize(250, 250)
      .png()
      .toBuffer();

    var fullUrl =
      req.protocol +
      "://" +
      req.get("host") +
      "/user/image/render/" +
      req.params.id;
    await db.User.update(
      {
        avatar_url: fullUrl,
        avatar_blob: buffer,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send(buffer);
  },
  renderAvatar: async (req, res) => {
    try {
      await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => {
        res.set("content-type", "image/png");
        res.send(result.dataValues.avatar_blob);
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  generateTokenByEmail: async (req, res) => {
    try {
      const { email } = req.query;

      const user = await db.User.findOne({
        where: {
          email,
        },
      });
      console.log(user.dataValues);

      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT_PASSWORD",
            },
          }
        );
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(5, "minutes").format(),
          token: generateToken,
          payload: JSON.stringify({ id: user.dataValues.id }),
          status: "FORGOT-PASSWORD",
        });
        console.log(token);
        mailer({
          subject: "CHANGE PASSWORD M-TIX",
          to: "suryanegarasinatriyya@gmail.com",
          text: url + token.dataValues.token,
        });

        return res.send({
          message: "please check your email",
        });
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  changePassword: async (req, res) => {
    try {
      const { token } = req.query;
      // console.log(req.body);
      const { password } = req.body;
      const { id } = req.user; // dari function getIdByToken

      console.log(req.getUserByToken);

      const hashPassword = await bcrypt.hash(password, 10);
      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      res.send({
        message: "password successfully updated!",
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editProfile: async (req, res) => {
    try {
      const { phone, fullname, email, address } = req.body;
      const user = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      });
      const ph = phone ? phone : user.dataValues.phone;
      const fn = fullname ? fullname : user.dataValues.fullname;
      const em = email ? email : user.dataValues.email;
      const ad = address ? address : user.dataValues.address;
      const edit = await db.User.update(
        {
          phone: ph,
          fullname: fn,
          email: em,
          address: ad,
        },
        {
          where: { id: req.params.id },
        }
      );
      const user2 = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      });
      console.log(edit);
      // console.log(user2);
      return res.send(user2.dataValues);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;
