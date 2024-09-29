const JohnemonArena = require("./JohnemonArena");
const Johnemon = require("./Johnemon");

class JohnemonWorld {
  constructor() {
    this.day = 1;
    this.logs = [];
  }

  oneDayPasses() {
    this.day++;
    return `Day ${this.day} has passed in JohnemonWorld!`;
  }

  addLog(newLog) {
    const log = `Day ${this.day}: ${newLog}`;
    this.logs.push(log);
  }
  randomizeEvent() {
    if (Math.random() > 0.5) {
      console.log("Nothing happens, the day passes");
      return true;
    } else {
      console.log(`A wild Johnemon™ appears ...`);
      return false;
    }
  }
}

module.exports = JohnemonWorld;
