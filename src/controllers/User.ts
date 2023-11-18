import { user } from "../../models/user.js";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const getAllUsers = async (body) => {};

export const createUser = async (body) => {
  try {
    //check validation for email and encrypt password

    const newUser: any = await user.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: body.password,
      phone: body.phone,
      userName: body.userName,
    });

    const token = jwt.sign(
      {
        id: newUser.id,
        userName: newUser.userName,
      },
      process.env.TOKEN_SECRET || "secretkey"
    );

    return {
      token: token,
      user: newUser?.dataValues,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (body) => {
  try {
    //check validation for email and encrypt password

    const isUserExist: any = await user.findOne({
      where: { userName: body.userName },
    });

    if (!isUserExist)
      throw new GraphQLError("User not found", {
        extensions: {
          code: "USER_NOT_FOUND",
        },
      });

    //Check password
    if (isUserExist.password !== body.password)
      throw new GraphQLError("Password is incorrect", {
        extensions: {
          code: "INCORRECT_PASSWORD",
        },
      });

    const token = jwt.sign(
      {
        id: isUserExist?.id,
        userName: isUserExist?.userName,
      },
      process.env.TOKEN_SECRET || "secretkey"
    );

    return {
      token: token,
      user: isUserExist?.dataValues,
    };
  } catch (error) {
    throw new Error(error);
  }
};
