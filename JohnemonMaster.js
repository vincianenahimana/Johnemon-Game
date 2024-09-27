class JohnemonMaster {
  constructor(name) {
    this.name = name;
    this.johnemonCollection = [];
    this.healingItems = 5; // Initial number of healing items
    this.reviveItems = 3; // Initial number of revive items
    this.JOHNEBALLS = 10; // Initial number of JOHNEBALLS
  }

  addJohnemon(johnemon) {
    this.johnemonCollection.push(johnemon);
  }

  renameJohnemon(johnemon, newName) {
    const johnemonIndex = this.johnemonCollection.findIndex(
      (j) => j === johnemon
    );

    if (johnemonIndex !== -1) {
      this.johnemonCollection[johnemonIndex] = newName;
      console.log(`${johnemon} is now renamed to ${newName}`);
    } else {
      console.log("Didn't find Johnemon with that name");
    }
  }

  healJohnemon(johnemon) {
    if (this.healingItems > 0) {
      let selectedJohnemon = this.johnemonCollection.find(
        (j) => j.name === johnemon
      );
      if (selectedJohnemon !== undefined) {
        if (selectedJohnemon.healthPool < selectedJohnemon.healthPoolStart) {
          selectedJohnemon.healthPool = selectedJohnemon.healthPoolStart;
          this.healingItems--;
          console.warn(
            `${johnemon} has been healed and you still have ${this.healingItems} healing items`
          );
        } else {
          console.warn("the healthpool is maximum");
        }
      } else {
        console.error(`Sorry ${johnemon} doesn't exist in the collection`);
      }
    } else {
      console.log("Sorry you used up all your healing items");
    }
  }

  reviveJohnemon(johnemon) {
    if (this.reviveItems > 0) {
      johnemon.healthPool = johnemon.healthPoolStart;
      console.log(`Your Johnemon ${johnemon} is reviving`);
      this.reviveItems--;
    } else {
      console.log(`You can't reviving your Johnemon`);
    }
  }

  releaseJohnemon(johnemon) {
    let index = this.johnemonCollection.indexOf(johnemon);
    if (index !== -1) {
      this.johnemonCollection.splice(index, 1);
    } else {
      console.log(`Sorry ${johnemon} doesn't exist in the collection`);
    }
  }

  showCollection() {
    this.johnemonCollection.forEach((johnemon, index) => {
      console.log(
        `${index + 1}. ${johnemon.name} (Level: ${johnemon.level}, Health: ${
          johnemon.healthPool
        }, Attack Range: ${johnemon.attackRange})`
      );
    });
  }
}

module.exports = JohnemonMaster;
