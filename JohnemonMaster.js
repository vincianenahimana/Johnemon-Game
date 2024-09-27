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
    const selectedJohnemon = this.johnemonCollection.find(
      (j) => j.name === johnemon
    );

    if (selectedJohnemon !== undefined) {
      selectedJohnemon.name = newName;
      console.warn(`${johnemon} has been renamed`);
    } else {
      console.error(`Sorry ${johnemon} doesn't exist in the collection`);
    }
  }

  healJohnemon(johnemon) {
    if (this.healingItems > 0) {
      const selectedJohnemon = this.johnemonCollection.find(
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
      console.log("Sorry you've used up all your healing items");
    }
  }

  reviveJohnemon(johnemon) {
    if (this.reviveItemsItems > 0) {
      const selectedJohnemon = this.johnemonCollection.find(
        (j) => j.name === johnemon
      );
      if (selectedJohnemon !== undefined) {
        if (selectedJohnemon.healthPool < selectedJohnemon.healthPoolStart) {
          selectedJohnemon.healthPool = selectedJohnemon.healthPoolStart;
          this.reviveItemsItems--;
          console.warn(
            `${johnemon} has been revived and you still have ${this.reviveItems} revive items`
          );
        } else {
          console.warn("the healthpool is maximum");
        }
      } else {
        console.error(`Sorry ${johnemon} doesn't exist in the collection`);
      }
    } else {
      console.log("Sorry you've used up all your revive items");
    }
  }

  releaseJohnemon(johnemon) {
    const selectedJohnemon = this.johnemonCollection.find(
      (j) => j.name === johnemon
    );

    if (selectedJohnemon !== undefined) {
      this.johnemonCollection.filter((j) => j !== selectedJohnemon);
    } else {
      console.error(`Sorry ${johnemon} doesn't exist in the collection`);
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
