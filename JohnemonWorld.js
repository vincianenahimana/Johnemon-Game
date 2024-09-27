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

  randomizeEvent() {}

  addLog(newLog) {
    const log = `Day ${this.day}: ${newLog}`;
    this.logs.push(log);
  }
}

module.exports = JohnemonWorld;
