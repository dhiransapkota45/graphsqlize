import { user } from "../../models/user.js";
import jwt from "jsonwebtoken";
import { GraphQLError } from "graphql";

export const getAllUsers = async () => {
  try {
    const users = await user.findAll();
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

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
      process.env.TOKEN_SECRET || "secretkey",
      {
        expiresIn: "10s"
      }
    );

    const refresh_token = jwt.sign(
      {
        id: newUser.id,
        userName: newUser.userName,
      },
      process.env.TOKEN_SECRET || "secretkey",
      {
        expiresIn: "20s"
      }
    );
    return {
      token: token,
      refresh_token: refresh_token,
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
        id: isUserExist.id,
        userName: isUserExist.userName,
      },
      process.env.TOKEN_SECRET || "secretkey",
      {
        expiresIn: "10s"
      }
    );

    const refresh_token = jwt.sign(
      {
        id: isUserExist.id,
        userName: isUserExist.userName,
      },
      process.env.TOKEN_SECRET || "secretkey",
      {
        expiresIn: "20s"
      }
    );

    console.log(refresh_token)

    return {
      token: token,
      refresh_token: refresh_token,
      user: isUserExist?.dataValues,
    };
  } catch (error) {
    throw new Error(error);
  }
};


// export const refreshToken = async (refreshToken, user) => {
//   try {
//     const verifyRefreshToken = jwt.verify(refreshToken?.refresh_token, process.env.TOKEN_SECRET || "secretkey")
//     if (verifyRefreshToken && user) {
//       const token = jwt.sign(
//         {
//           id: user?.id,
//           userName: user?.userName,
//         },
//         process.env.TOKEN_SECRET || "secretkey",
//         {
//           expiresIn: "60"
//         }
//       );
//       return { token }
//     }
//   } catch (error) {
//     throw new GraphQLError(error)
//   }
// }