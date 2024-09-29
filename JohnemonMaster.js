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

  renameJohnemon(johnemon, newname) {
    const selectedJohnemon = this.johnemonCollection.find(
      (j) => j.name === johnemon
    );

    if (selectedJohnemon !== undefined) {
      selectedJohnemon.name = newname;
      console.warn(`${johnemon} has been renamed as ${newname}`);
      return true;
    } else {
      console.error(`Sorry ${johnemon} doesn't exist in the collection`);
      return false;
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
          return true;
        } else {
          console.warn("the healthpool is maximum");
          return false;
        }
      } else {
        console.error(`Sorry ${johnemon} doesn't exist in the collection`);
        return false;
      }
    } else {
      console.log("Sorry you've used up all your healing items");
      return false;
    }
  }

  reviveJohnemon(johnemon) {
    if (this.reviveItems > 0) {
      const selectedJohnemon = this.johnemonCollection.find(
        (j) => j.name === johnemon
      );
      if (selectedJohnemon !== undefined) {
        if (selectedJohnemon.healthPool < selectedJohnemon.healthPoolStart) {
          selectedJohnemon.healthPool = selectedJohnemon.healthPoolStart;
          this.reviveItems--;
          console.warn(
            `${johnemon} has been revived and you still have ${this.reviveItems} revive items`
          );
          return true;
        } else {
          console.warn("the healthpool is maximum");
          return false;
        }
      } else {
        console.error(`Sorry ${johnemon} doesn't exist in the collection`);
        return false;
      }
    } else {
      console.log("Sorry you've used up all your revive items");
      return false;
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
