import express from "express";
import models from "./models/db.js";

const server = express();
const IP = "localhost";
const PORT = 8081;
server.use(express.urlencoded({ extended: false }));
let userOne;
let quizDbData;
let hangmanDbData;

//{ force: true } am ende entfernen
models.sequelize.sync({ force: true }).then(() => {
//-------------------------------------Löschen---------------------------------------------------------
  

     

models.QuizDB.bulkCreate([ 
    {
      cat: "Hauptstadt",
      question: "Wie heißt die Hauptstadt von Deutschland",
      answer: "Bonn, Düsseldorf, Berlin, München",      
      correctanswer: 2,
    },
    {
      cat: "Hauptstadt",
      question: "Wie heißt die Hauptstadt von Griechenland",
      answer: "Athen,Thessaloniki, Patras,Iraklio",
      correctanswer: 0,
    },
    {
      cat: "Hauptstadt",
      question: "Wie heißt die Hauptstadt von Frankreich",
      answer: "Paris,Marseille,Lyon,Toulouse",
      correctanswer: 0,
    },
    {
      cat: "Hauptstadt",
      question: "Wie heißt die Hauptstadt von Belgien",
      answer: "Brüssel,Antwerpen,Gent,Lüttich",
      correctanswer: 0,
    },
    {
      cat: "Kinder",
      question: "Wie heißt der Tiger aus dem Dschungelbuch?",
      answer: "Balu, Baghira, Shir Khan, Mogli",
      correctanswer: 2,
    },
    {
      cat: "Kinder",
      question: "Wie heißt die Eiskönig bei dem Film die Eiskönigin?",
      answer: "Sven, Olaf, Anna, Elsa",
      correctanswer: 3,
    },
  ]);

//-------------------------------------Löschen---------------------------------------------------------

  server.set("view engine", "ejs");
  server.use(express.static("public"))  

  server.get("/", (req, res) => {
    models.QuizDB.findAll({
      raw: true, 
      attributes: ["id", "cat", "question", "answer", "correctanswer"],
    }).then((quiz_data) => {
      quizDbData = quiz_data;      
      res.render("quiz", { quiz: quiz_data });
    });
  });


  server.listen(PORT, IP, () => console.log(`http://${IP}:${PORT}`));
});
