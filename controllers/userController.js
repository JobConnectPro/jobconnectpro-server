require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  // Role: Admin
  static async get(req, res) {
    try {
      const data = await User.findAll();
      res.status(200).json(data);
    } catch (error) {
      throw new Error(error);
    }
  }

  // Role: Seeker
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await User.findOne({ where: { id: +id } });

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // Role: No Role
  static async register(req, res) {
    try {
      const { name, email, password, role, birthday, gender, phone, address } =
        req.body;

      const uniqueEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (!uniqueEmail) {
        const hashPassword = await bcrypt.hash(password, 10);
        const data = await User.create({
          name,
          email,
          password: hashPassword,
          role,
          birthday,
          gender,
          phone,
          address,
        });
        res
          .status(201)
          .json({ ...data.dataValues, message: 'Succesfully create user!' });
      } else {
        res.status(400).json({ message: 'User already exist!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: { email },
      });

      if (findUser) {
        const comparePassword = await bcrypt.compare(
          password,
          findUser.password
        );
        if (comparePassword) {
          const token = jwt.sign(
            {
              id: findUser.id,
              name: findUser.name,
              email: findUser.email,
              role: findUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          res.status(200).json({ token });
        } else {
          res.status(404).json({ message: 'Wrong password!' });
        }
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // Role: Seeker
  static async update(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        password,
        role,
        birthday,
        gender,
        phone,
        address,
        summary,
        salary_expectation,
      } = req.body;

      const findUser = await User.findOne({ where: { id: +id } });

      if (findUser) {
        const hashPassword = await bcrypt.hash(password, 10);
        const data = await User.update(
          {
            name,
            email,
            password: hashPassword,
            role,
            birthday,
            gender,
            phone,
            address,
            summary,
            salary_expectation,
          },
          { where: { id: +id } }
        );
        res.status(201).json({ message: 'Succesfully update user!' });
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // Role: Seeker
  static async uploadProfile(req, res) {
    try {
      const { id } = req.params;
      const findUser = await User.findOne({ where: { id: +id } });

      if (findUser) {
        if (req.file != null) {
          const profile = req.file.filename;
          const file = `http://localhost:8000/uploads/profile/${profile}`;
          const data = await User.update(
            {
              photo: file,
            },
            { where: { id: +id } }
          );
          res.status(200).json({ message: 'Successfully update profile!' });
        } else {
          res.status(404).json({ message: 'Profile cannot be null!' });
        }
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // Role: Seeker
  static async uploadResume(req, res) {
    try {
      const { id } = req.params;
      const findUser = await User.findOne({ where: { id: +id } });

      if (findUser) {
        if (req.file != null) {
          const resume = req.file.filename;
          const file = `http://localhost:8000/uploads/resume/${resume}`;
          const data = await User.update(
            {
              resume: file,
            },
            { where: { id: +id } }
          );
          res.status(200).json({ message: 'Successfully update resume!' });
        } else {
          res.status(404).json({ message: 'Resume cannot be null!' });
        }
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // Role: Seeker
  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const findUser = await User.findOne({ where: { id: +id } });

      if (findUser) {
        const data = await prisma.user.delete({ where: { id: +id } });
        res.status(200).json({ ...data, message: 'Succesfully delete user!' });
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserController;
