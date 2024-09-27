const students = [
  "Olivia",
  "Nora",
  "Diana",
  "Mohab",
  "Lyne",
  "Jason",
  "Sebastien",
  "Cristelle",
  "Farid",
  "Julien",
  "Edouard",
  "mbogle",
  "Benjamin",
  "Matteo",
  "Reda",
  "Donatien",
  "Renaud",
  "Antoine",
  "Nahimana",
  "Stéphen",
  "Mohamed",
  "Hakim",
  "Pierre",
  "Hugo",
  "Theo",
  "Maxime",
];

class Johnemon {
  constructor() {
    this.name = this.generateName();
    this.level = 1;
    this.experienceMeter = 0;
    this.attackRange = this.getRandomNumber(1, 8);
    this.defenseRange = this.getRandomNumber(1, 3);
    this.healthPool = this.getRandomNumber(10, 30);
    this.healthPoolStart = this.healthPool;
    this.catchPhrase = this.catchUniquePhrase();
  }

  generateName() {
    const nameOne = students[Math.floor(Math.random() * students.length)];
    let nameTwo = students[Math.floor(Math.random() * students.length)];
    while (nameOne === nameTwo) {
      nameTwo = students[Math.floor(Math.random() * students.length)];
    }

    const nameChoiceOne =
      nameOne.slice(0, Math.floor(nameOne.length / 2)) +
      nameTwo.slice(Math.floor(nameTwo.length / 2));
    const nameChoiceTwo =
      nameTwo.slice(0, Math.floor(nameTwo.length / 2)) +
      nameOne.slice(Math.floor(nameOne.length / 2));

    if (Math.random() > 0.5) {
      return nameChoiceOne;
    } else {
      return nameChoiceTwo;
    }
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  catchUniquePhrase() {
    const phrases = ["I choose you!", "Let the battle begin!", "Johnemon, go!"];

    return phrases[Math.floor(Math.random() * phrases.length)];
  }

  attack(defender) {

  }

  gainExperience(oppositeLevel) {

  }
  evolve() {

  }

  sayCatchPhrase() {
    console.log(`${this.name} says: "${this.catchPhrase}"`);
  }
}

module.exports = Johnemon;
