const readline = require("readline");
const JohnemonMaster = require("./JohnemonMaster");
const Johnemon = require("./Johnemon");
const JohnemonWorld = require("./JohnemonWorld");
const fs = require("fs");
const { log } = require("console");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Variables
//TODOO Ajouter d'autres variables
let johnemon = new Johnemon();
const johnemons = [];
let johnemonMaster = new JohnemonMaster();
let johnemonWorld = new JohnemonWorld();
let path = "./save.json";

function askForName(callback) {
  rl.question(
    "Welcome to the Johnemon World! What is your name Johnemon Master? ",
    (name) => {
      johnemonMaster.name = name;
      console.log(
        `Hello, ${johnemonMaster.name}! Let your Johnemon adventure begin!`
      );
      callback();
    }
  );
}

function proposeFirstJohnemon(callback) {
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

  rl.question("Choose your first Johnemon (1-3) : ", (answer) => {
    const choice = parseInt(answer) - 1;
    if (choice >= 0 && choice < johnemons.length) {
      const selectedJohnemon = johnemons[choice];

      johnemon.name = selectedJohnemon.name;
      johnemon.level = selectedJohnemon.level;
      johnemon.experienceMeter = selectedJohnemon.experienceMeter;
      johnemon.attackRange = selectedJohnemon.experienceMeter;
      johnemon.defenseRange = selectedJohnemon.defenseRange;
      johnemon.healthPool = selectedJohnemon.healthPool;
      johnemon.healthPoolStart = selectedJohnemon.healthPoolStart;

      johnemonMaster.addJohnemon(johnemon);

      const log = `${johnemon.name} has been added to your collection!`;

      johnemonWorld.addLog(log);
      callback();
    } else {
      console.error("Invalid number");
      proposeFirstJohnemon(callback);
    }
  });
}

function saveStateGame(callback) {
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
  console.warn("The state game has been successfully saved");
  callback();
}

function loadData(callback) {
  const dataToLoad = JSON.parse(fs.readFileSync(path, "utf-8"));

  johnemonMaster.name = dataToLoad.JohnemonMaster.name;
  johnemonMaster.johnemonCollection =
    dataToLoad.JohnemonMaster.johnemonCollection;
  johnemonMaster.healingItems = dataToLoad.JohnemonMaster.healingItems;
  johnemonMaster.reviveItems = dataToLoad.JohnemonMaster.reviveItems;
  johnemonMaster.JOHNEBALLS = dataToLoad.JohnemonMaster.JOHNEBALLS;
  johnemonWorld.day = dataToLoad.day;
  johnemonWorld.logs = dataToLoad.logs;

  console.log(johnemonWorld);
  console.log(johnemonMaster);

  callback();
}

function showCollectionJohnemons() {
  console.log("Johnemon™ Collection");
  console.log("--------------------");
  johnemonMaster.showCollection();
}
function heal(callback) {
  rl.question("Which Johnemon do you want to heal? ", (answer) => {
    johnemonMaster.healJohnemon(answer);
    const log = `${answer} has been healed`;
    johnemonWorld.addLog(log);
    callback();
  });
}

function revive(callback) {
  rl.question("Which Johnemon do you want to revive? ", (answer) => {
    johnemonMaster.reviveJohnemon(answer);
    const log = `${answer} has revive`;
    johnemonWorld.addLog(log);
    callback();
  });
}

function release(callbask) {
  rl.question("Which Johnemon do you want to release? ", (answer) => {
    johnemonMaster.releaseJohnemon(answer);
    const log = `${answer} has been released`;
    johnemonWorld.addLog(log);
    callback();
  });
}

function rename(callback) {
  rl.question("Which Johnemon do you want to rename? ", (oldname) => {
    rl.question("What is the new name? ", (newname) => {
      johnemonMaster.renameJohnemon(oldname, newname);
      const log = `${oldname} has been renamed`;
      johnemonWorld.addLog(log);
      callback();
    });
  });
}

function nothing(callback) {
  johnemonWorld.oneDayPasses();
}

function johnemonTown() {
  johnemonWorld.oneDayPasses();
  console.log(`Day: ${johnemonWorld.day} in Johnemon Town`);
  console.log("What do you want to do Today?");
  askForOptionJohnemonTown();
}

function askForOptionJohnemonTown() {
  console.log("1. Heal Johnemon™ ");
  console.log("2. Revive Johnemon™ ");
  console.log("3. Release Johnemon™");
  console.log("4. Rename Johnemon™");

  rl.question("Choose an option (1-4): ", (answer) => {
    let option = parseInt(answer, 10);
    switch (option) {
      case 1:
        showCollectionJohnemons();
        heal(() => {
          saveStateGame(() => {
            continueGame();
          });
        });
        break;

      case 2:
        showCollectionJohnemons();
        revive(() => {
          saveStateGame(() => {
            continueGame();
          });
        });
        break;

      case 3:
        showCollectionJohnemons();
        release(() => {
          saveStateGame(() => {
            continueGame();
          });
        });
        break;

      case 4:
        showCollectionJohnemons();
        rename(() => {
          saveStateGame(() => {
            continueGame();
          });
        });
        break;

      default:
        console.log("Wrong number");
        askForOptionJohnemonTown();
        break;
    }
  });
}

function chooseJohnemon() {}

function loadPreviousGame() {
  console.log("Previous game found");
  console.log("1. Load previous game");
  console.log("2. Start a new game");

  rl.question("Choose an option (1-2): ", (answer) => {
    let option = parseInt(answer, 10);
    if (option === 1) {
      loadData(() => {
        johnemonTown();
      });
    } else if (option === 2) {
      newGame();
    } else {
      console.log("Wrong number, choose between 1 and 2");
      rl.close();
    }
  });
}

function continueGame() {
  rl.question("Do you want to continue? Yes/No: ", (answer) => {
    let choice = answer.toLowerCase(answer);
    if (choice === "yes" || choice === "y") {
      console.log("What do you want to do next?");
      console.log("1. Stay in the Johnemon Town");
      console.log("2. Choose a Johnemon");

      rl.question("Choose an option (1-2): ", (answer) => {
        let option = parseInt(answer);
        if (option === 1) {
          johnemonTown();
        } else if (option === 2) {
          chooseJohnemon();
        } else {
          console.error("Wrong number, choose again");
          continueGame();
        }
      });
    } else if (choice === "no" || choice === "n") {
      saveStateGame(() => {
        rl.close();
      });
    } else {
      continueGame();
    }
  });
}

function newGame() {
  askForName(() => {
    proposeFirstJohnemon(() => {
      saveStateGame(() => {
        johnemonTown(() => {});
      });
    });
  });
}

function startGame() {
  if (fs.existsSync(path)) {
    loadPreviousGame();
  } else {
    newGame();
  }
}

startGame();
