#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import figlet from "figlet";
import gradient from "gradient-string";

let playerName;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTittle = chalkAnimation.rainbow(
    "Quien quiere ser un Millonario en JavaScript \n"
  );
  await sleep();
  rainbowTittle.stop();
  console.log(`${chalk.bgBlue("COMO JUGAR")}
  Iniciando...Iniciando...Iniciando...
  Si alguna de tus respuestas es incorrecta se termino el juego
  Así más vale que tengas todas las respuestas correctamente
  `);
}
await welcome();

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "Como te llamas?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}
await askName();

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message:
      "JavaScript fue creado en 10 dias y despues se lanzo, cual fue su fecha de lanzamiento? ",
    choices: [
      "23 de Mayo del 95",
      "24 de Noviembre del 95",
      "4 de Diciembre del 95",
      "17 de Diciembre del 96",
    ],
  });
  return handleAnswer(answers.question_1 == "4 de Diciembre del 95");
}
await question1();

async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "En que año se descubrio América? ",
    choices: ["1994", "1492", "1024", "2012"],
  });
  return handleAnswer(answers.question_2 == "1492");
}
await question2();

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Revisando la respuesta...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({ text: `Buen trabajo ${playerName}.` });
  } else {
    spinner.error({ text: `Has perdido! ${playerName}.` });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Felicidades, ${playerName}! \n $1.000.000`;
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await winner();
