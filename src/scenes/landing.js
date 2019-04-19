import { getAsset } from "../utils";

class Landing extends Phaser.Scene {
  constructor() {
    super({ key: "Landing" });
  }

  preload() {
    this.load.image("landing", getAsset("landing.png"));
    this.load.image("play", getAsset("play.png"));
    this.load.audio("landing-sound", getAsset("landing.mp3"));
    this.load.audio("click-sound", getAsset("click.mp3"));
  }

  create() {
    this.add.sprite(400, 300, "landing");

    const landingSound = this.sound.add("landing-sound");
    landingSound.play();
    landingSound.setLoop(true);

    const playButton = this.add.sprite(600, 500, "play");
    playButton.setScale(0.3);
    playButton.setInteractive();
    playButton.on("pointerdown", () => {
      this.sound.play("click-sound");
      this.scene.start("Level1");
    });
  }
}

export default Landing;
