import { getAsset } from "./utils";

class Victory extends Phaser.Scene {
  constructor() {
    super({ key: "Victory" });
  }

  preload() {
    this.load.image("victory", getAsset("victory.png"));
    this.load.image("kylieButton", getAsset("helpKylie.png"));
  }

  create() {
    this.scene.stop("Level1");

    this.add.sprite(400, 300, "victory");

    const kylieButton = this.add.sprite(700, 70, "kylieButton");
    kylieButton.setInteractive();
    kylieButton.on("pointerdown", () => {
      this.scene.start("Level2");
    });
  }
  victory() {
    this.scene.start("Level2");
  }
}

export default Victory;
