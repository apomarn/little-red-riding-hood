class TheEnd extends Phaser.Scene {
  constructor() {
    super({ key: "TheEnd" });
  }

  preload() {
    this.load.image("theEnd", "../assets/end.png");
  }

  create() {
    let victory = this.add.sprite(400, 300, "theEnd");
  }
}

export default TheEnd;
