class LandingScene extends Phaser.Scene {
  constructor() {
    super({ key: "LandingScene" });
  }

  preload() {
    this.load.image("landing", "../../assets/landingScene.png");
    this.load.image("play", "../../assets/playButton.png");
  }

  create() {
    let landing = this.add.sprite(400, 300, "landing");
    //Backgroung.setOrigin(0,0);
    let playButton = this.add.sprite(600, 500, "play");
    playButton.setScale(0.3);
    playButton.setInteractive();
    playButton.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}

export default LandingScene;
