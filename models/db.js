import { Sequelize, DataTypes } from "sequelize";
import { dirname } from "path";
import { fileURLToPath } from "url";

let storePath =
  dirname(fileURLToPath(import.meta.url)) + "./../db/database.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storePath,
});


let QuizDB = sequelize.define("questions", {
  cat: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  question: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  answer: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  correctanswer: { 
    allowNull: false, 
    type: DataTypes.INTEGER, 
  },
});


export default {
  sequelize,
  QuizDB
};
