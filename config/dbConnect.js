const { default: mongoose } = require("mongoose");
require("dotenv").config();
class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(process.env.MONGODB_CLUSTER_URL)
      .then((_) => {
        console.log("database connected");
      })
      .catch((error) => console.log(error));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();

      return Database.instance;
    }
  }
}

const instance = Database.getInstance();

module.exports = instance;
