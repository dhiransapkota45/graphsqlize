"use strict";

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../src/db/connection.js";

const todo = sequelize.define("todo", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export { todo };
