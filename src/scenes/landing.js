import { getAsset } from "./utils";

class Landing extends Phaser.Scene {
  constructor() {
    super({ key: "Landing" });
  }

  preload() {
    this.load.image("landing", getAsset("landing.png"));
    this.load.image("play", getAsset("play.png"));
  }

  create() {
    this.add.sprite(400, 300, "landing");

    const playButton = this.add.sprite(600, 500, "play");
    playButton.setScale(0.3);
    playButton.setInteractive();
    playButton.on("pointerdown", () => {
      this.scene.start("Level1");
    });
  }
}

export default Landing;
