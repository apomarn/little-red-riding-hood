class Victory extends Phaser.Scene {
  constructor() {
    super({ key: "Victory" });
  }

  preload() {
    console.log(this);
    this.load.image("victory", "../assets/victory.png");
    this.load.image("kylieButton", "../assets/helpKylie.png");
  }

  create() {
    this.scene.stop("Game");
    let victory = this.add.sprite(400, 300, "victory");
    let kylieButton = this.add.sprite(700, 70, "kylieButton");

    kylieButton.setInteractive();
    kylieButton.on("pointerdown", () => {
      // console.log("guess", this.player]);
      // this.scene.restart("Game");
      this.scene.start("Game2");

      // console.log(this);
      // this.victory();
    });
  }
  victory(player, house) {
    console.log("guess", this, player);
    this.scene.start("Game2");
    // this.scene.start("Game2");
  }
}

export default Victory;
