// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class todo extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {

//       todo.belongsTo(models.User, {
//         foreignKey: "userid",
//         // as: "user",
//       });
//     }
//   }
//   todo.init({
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     isCompleted: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     priority: {
//       type: DataTypes.ENUM("low", "medium", "high"),
//       defaultValue: "high",
//     },
//     userid: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: {
//           tableName: "Users",
//           schema: "public"
//         }
//       },
//       key: "id"
//     }
//   }, {
//     sequelize,
//     modelName: 'todo',
//   });
//   return todo;
// };

"use strict";
import { sequelize } from "../src/db/connection.js";
import { Model, DataTypes } from "sequelize";
// module.exports = () => {
class todo extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    todo.belongsTo(models.User, {
      foreignKey: "userid",
      // as: "user",
    });
  }
}
todo.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "high",
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Users",
          schema: "public",
        },
      },
      key: "id",
    },
  },
  {
    sequelize,
    modelName: "todo",
  }
);
export { todo };
// };
