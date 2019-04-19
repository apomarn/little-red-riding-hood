import { getAsset } from "./utils";

class Victory extends Phaser.Scene {
  constructor() {
    super({ key: "Victory" });
  }

  preload() {
    this.load.image("victory", getAsset("victory.png"));
    this.load.image("help", getAsset("help.png"));
  }

  create() {
    this.add.sprite(400, 300, "victory");

    const helpButton = this.add.sprite(700, 70, "help");
    helpButton.setInteractive();
    helpButton.on("pointerdown", () => {
      this.scene.start("Level2");
    });
  }
}

export default Victory;
