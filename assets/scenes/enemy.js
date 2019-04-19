class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "wolf", 0);
    this.scene = scene;

    //enable physics
    this.scene.physics.world.enable(this);
    //add our player to the scene
    this.scene.add.existing(this);

    this.timeEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.move,
      loop: true,
      callbackScope: this
    });
  }

  move() {
    const randNumber = Math.floor(Math.random() * 4 + 1);
    switch (randNumber) {
      case 1:
        this.setVelocityX(150);
        break;
      case 2:
        this.setVelocityX(-150);
        break;
      case 3:
        this.setVelocityY(150);
        break;
      case 4:
        this.setVelocityY(-150);
        break;
      default:
        this.setVelocityX(300);
    }

    this.scene.time.addEvent({
      delay: 1900,
      callback: () => {
        this.setVelocity(30);
      },
      callbackScope: this
    });
  }
}

export default Enemy;
