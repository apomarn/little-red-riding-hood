import { getAsset } from "../utils";

class TheEnd extends Phaser.Scene {
  constructor() {
    super({ key: "TheEnd" });
  }

  preload() {
    this.load.image("end", getAsset("end.png"));
  }

  create() {
    const endButton = this.add.sprite(400, 300, "end");
    endButton.setInteractive();
    endButton.on("pointerdown", () => {
      this.scene.start("Landing");
    });
  }
}

export default TheEnd;
