const readline = require("readline");
const JohnemonMaster = require("./JohnemonMaster");
const Johnemon = require("./Johnemon");
const JohnemonWorld = require("./JohnemonWorld");
const JohnemonArena = require("./JohnemonArena");
const fs = require("fs");
const { log } = require("console");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Variables
let johnemon = new Johnemon();

const johnemons = [];
let johnemonMaster = new JohnemonMaster();

let johnemonWorld = new JohnemonWorld();
let path = "./save.json";

async function mainMenu() {
  console.log("***********************************");
  console.log("********Welcome to the*************");
  console.log("********Johnemon™ Game*************");
  console.log("***********************************");
}

async function askUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function askForName(callback) {
  const nameMaster = await askUser(
    "Welcome to the Johnemon World! What is your name, Johnemon Master?\n> "
  );
  johnemonMaster.name = nameMaster;
  console.log(
    `Hello, ${johnemonMaster.name}! Let your Johnemon adventure begin!`
  );
  if (callback) callback;
}

async function proposeFirstJohnemon(callback) {
  for (let i = 0; i < 3; i++) {
    johnemonRandom = new Johnemon();
    johnemons.push(johnemonRandom);
  }
  johnemons.forEach((johnemon, index) => {
    console.log(
      `${index + 1}. ${johnemon.name} (Level: ${johnemon.level}, Health: ${
        johnemon.healthPool
      }, Attack Range: ${johnemon.attackRange})`
    );
  });
  if (callback) callback;
}

async function chooseFirstJohnemon(callback) {
  const choice = await askUser("Choose your first Johnemon (1-3) : ");
  const index = parseInt(choice) - 1;

  if (index >= 0 && index < johnemons.length) {
    const selectedJohnemon = johnemons[index];
    johnemon.name = selectedJohnemon.name;
    johnemon.level = selectedJohnemon.level;
    johnemon.experienceMeter = selectedJohnemon.experienceMeter;
    johnemon.attackRange = selectedJohnemon.experienceMeter;
    johnemon.defenseRange = selectedJohnemon.defenseRange;
    johnemon.healthPool = selectedJohnemon.healthPool;
    johnemon.healthPoolStart = selectedJohnemon.healthPoolStart;

    johnemonMaster.addJohnemon(johnemon);

    const log = `${johnemon.name} has been added to your collection!`;
    console.log(log);
    johnemonWorld.addLog(log);
    console.log(`Day ${johnemonWorld.day} has been end`);
    console.log("---------------------------------------");
    if (callback) callback;
  } else {
    console.error("Invalid number");
    chooseFirstJohnemon();
  }
}

async function saveStateGame(callback) {
  const dataToSave = {
    saved_on: new Date().toISOString(),
    JohnemonMaster: {
      name: johnemonMaster.name,
      johnemonCollection: johnemonMaster.johnemonCollection,
      healingItems: johnemonMaster.healingItems,
      reviveItems: johnemonMaster.reviveItems,
      JOHNEBALLS: johnemonMaster.JOHNEBALLS,
    },
    day: johnemonWorld.day,
    logs: johnemonWorld.logs,
  };
  fs.writeFileSync(path, JSON.stringify(dataToSave, null, 2));
  if (callback) callback;
}

async function loadData(callback) {
  const dataToLoad = JSON.parse(fs.readFileSync(path, "utf-8"));

  johnemonMaster.name = dataToLoad.JohnemonMaster.name;
  johnemonMaster.johnemonCollection =
    dataToLoad.JohnemonMaster.johnemonCollection;
  johnemonMaster.healingItems = dataToLoad.JohnemonMaster.healingItems;
  johnemonMaster.reviveItems = dataToLoad.JohnemonMaster.reviveItems;
  johnemonMaster.JOHNEBALLS = dataToLoad.JohnemonMaster.JOHNEBALLS;
  johnemonWorld.day = dataToLoad.day;
  johnemonWorld.logs = dataToLoad.logs;
  callback;
}

async function currentJohnemons() {
  await loadData();
  console.log("Johnemon™ Collection");
  console.log("--------------------");
  johnemonMaster.showCollection();
}

async function currentDay() {
  await loadData();
  johnemonWorld.oneDayPasses();
}

async function actionsMenuJohnemonWorld() {
  await loadData();
  await currentDay();
  console.log(`Day: ${johnemonWorld.day} in Johnemon Town`);
  console.log("What do you want to do Today?");
  console.log("1. Heal Johnemon™ ");
  console.log("2. Revive Johnemon™ ");
  console.log("3. Release Johnemon™");
  console.log("4. Rename Johnemon™");
  console.log("5. None of the above");
}

function getUserOption(answer) {
  return parseInt(answer, 10);
}

async function askOptionsJohnemonWorld() {
  await actionsMenuJohnemonWorld();
  const answer = await askUser("Choose an option (1-5): ");
  const option = getUserOption(answer);
  switch (option) {
    case 1:
      await currentJohnemons();
      await heal();
      break;

    case 2:
      await currentJohnemons();
      await revive();
      break;

    case 3:
      await currentJohnemons();
      await release();
      break;

    case 4:
      await currentJohnemons();
      await rename();
      break;
    case 5:
      await randomEvent();

      break;

    default:
      console.log("Wrong number");
      await askOptionsJohnemonWorld();
      break;
  }
}

async function heal() {
  await loadData();
  await currentDay();
  const johnemonSelected = await askUser(
    "Which Johnemon do you want to heal? "
  );
  const isHealed = johnemonMaster.healJohnemon(johnemonSelected);
  if (isHealed) {
    const log = `${johnemonSelected} has been healed`;
    johnemonWorld.addLog(log);
  } else {
    console.log(`${johnemonSelected} cannot be healed`);
  }
}

async function revive() {
  await loadData();
  await currentDay();
  const johnemonSelected = await askUser(
    "Which Johnemon do you want to revive? "
  );
  const isHealed = johnemonMaster.healJohnemon(johnemonSelected);
  if (isHealed) {
    const log = `${johnemonSelected} has been revived`;
    johnemonWorld.addLog(log);
  } else {
    console.log(`${johnemonSelected} cannot be revived`);
  }
}
async function release() {
  await loadData();
  await currentDay();
  const johnemonSelected = await askUser(
    "Which Johnemon do you want to release "
  );
  const isHealed = johnemonMaster.healJohnemon(johnemonSelected);
  if (isHealed) {
    const log = `${johnemonSelected} has been released`;
    johnemonWorld.addLog(log);
  } else {
    console.log(`${johnemonSelected} cannot be released`);
  }
}

async function rename() {
  await loadData();
  await currentDay();
  const johnemonSelected = await askUser(
    "Which Johnemon do you want to rename? > "
  );
  const newName = await askUser("What is the new name? > ");

  const isRenamed = johnemonMaster.renameJohnemon(johnemonSelected, newName);
  if (isRenamed) {
    const log = `${johnemonSelected} has been renamed as ${newName}`;
    johnemonWorld.addLog(log);
  } else {
    console.log(`${johnemonSelected} cannot be renamed`);
  }
}

async function randomEvent() {
  const isNothing = johnemonWorld.randomizeEvent();

  if (isNothing) {
    console.log(`Day ${johnemonWorld.day} has been end`);
    console.log("---------------------------------------");
    askOptionsJohnemonWorld();
  } else {
    askForFight();
  }
}

async function askForFight() {
  const answer = askUser("Do you want to fight? (Yes/No) \n> ");
  if (answer.toLowerCase() === "yes" || answer.toLocaleLowerCase() === "y") {
    //TODOO écrire un code qui permettrait de "create a Johnemon™Arena"
  } else if (
    answer.toLowerCase() === "no" ||
    answer.toLocaleLowerCase() === "n"
  ) {
    //TODOO écrire un code qui permettrait si un joueur refuse de jouer ce qui arriverait
    // un code en attendant de trouver quoi y mettre
    console.log(`See you soon ${johnemonMaster.name} for another adventure`);
    setTimeout(() => {
      rl.close();
    }, 2000);
  }
}

async function askStartGame(params) {
  if (fs.existsSync(path)) {
    const choice = await askUser(
      " Previous game found ! Do you want to load your previous game? (yes/no)\n> "
    );
    if (choice.toLowerCase() === "yes") {
      await loadPreviousGame();
    } else if (choice.toLowerCase() === "no") {
      await newGame();
    } else {
      console.log("enter Yes or No");
      await askStartGame();
    }
  } else {
    await newGame();
  }
}

async function newGame() {
  await askForName();
  await proposeFirstJohnemon();
  await chooseFirstJohnemon();
  await saveStateGame();
  await askOptionsJohnemonWorld();
  await saveStateGame();
}

async function loadPreviousGame() {
  await askOptionsJohnemonWorld();
  await saveStateGame();
}

async function startGame() {
  await mainMenu();
  await askStartGame();
}

startGame();

