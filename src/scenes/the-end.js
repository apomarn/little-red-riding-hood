import { getAsset } from "./utils";

class TheEnd extends Phaser.Scene {
  constructor() {
    super({ key: "TheEnd" });
  }

  preload() {
    this.load.image("end", getAsset("end.png"));
  }

  create() {
    this.add.sprite(400, 300, "end");
  }
}

export default TheEnd;
