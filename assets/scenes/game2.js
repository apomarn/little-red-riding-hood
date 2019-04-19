import Enemies from "../scenes/Enemies";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game2" });

    this.player;
    this.cursors;
    this.enemies;
  }

  preload() {
    this.load.image("tiles", "../assets/assets.png");
    this.load.image("house", "../assets/finalhouse.png");
    this.load.tilemapTiledJSON("map2", "../assets/MapGame2.json");
    this.load.image("background", "../assets/water.png");
    this.load.spritesheet("player2", "../assets/babyKylie.png", {
      frameWidth: 35,
      frameHeight: 35
    });
    this.load.image("wolf", "../assets/myWolfs.png");
  }

  create() {
    this.scene.stop("Victory");

    const map = this.make.tilemap({ key: "map2" });
    const tileset = map.addTilesetImage("assets", "tiles");

    this.add.image(600, 300, "background");
    const house = this.physics.add.image(1330, 65, "house");
    house.body.static = true;
    house.setDepth(10);

    const lowerLayer = map.createStaticLayer("LowerGround", tileset, 0, 0);
    const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
    const grassLayer = map.createStaticLayer("Grass", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const highLayer = map.createStaticLayer("High", tileset, 0, 0);

    //activating the collisions
    lowerLayer.setCollisionByProperty({ collides: true });
    groundLayer.setCollisionByProperty({ collides: true });
    worldLayer.setCollisionByProperty({ collides: true });
    highLayer.setDepth(10);

    let spawnPoint = map.findObject(
      "player",
      obj => obj.name === "Spawn Point"
    );

    console.log(spawnPoint);

    // console.log("spawn point --- asbaji ", spawnPoint);
    this.player = this.physics.add.sprite(
      spawnPoint.x,
      spawnPoint.y,
      "player2"
    );

    // collides with what I set up for
    this.physics.add.collider(this.player, lowerLayer);
    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.player, worldLayer);

    this.physics.add.collider(this.player, house, this.victory, null, this);

    this.enemies = map.createFromObjects("Enemies", "Enemy", {});
    this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);
    this.physics.add.collider(this.enemiesGroup, lowerLayer);
    this.physics.add.collider(this.enemiesGroup, groundLayer);
    this.physics.add.collider(this.enemiesGroup, worldLayer);

    this.physics.add.collider(
      this.enemiesGroup,
      this.player,
      this.hitEnemy,
      null,
      this
    );

    const anims = this.anims;
    anims.create({
      key: "left2",
      frames: anims.generateFrameNames("player2", { start: 3, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "right2",
      frames: anims.generateFrameNames("player2", { start: 6, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "front2",
      frames: anims.generateFrameNames("player2", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "back2",
      frames: anims.generateFrameNames("player2", { start: 9, end: 9 }),
      frameRate: 10,
      repeat: -1
    });

    //setting the camera to follow player

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    /* colliding with */
    // const debug = this.add.graphics().setAlpha(0.75);
    // worldLayer.renderDebug(debug, {
    //   tileColor: null,
    //   collidingTileColor: new Phaser.Display.Color(180, 50, 250, 255),
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    // });
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const prevVelocity = this.player.body.velocity.clone();

    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-250);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(250);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-250);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(250);
    }

    if (this.cursors.left.isDown) {
      this.player.anims.play("left2", true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right2", true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("back2", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("front2", true);
    } else {
      this.player.anims.stop();

      if (prevVelocity.x < 0) this.player.setTexture("player2", "left2");
      else if (prevVelocity.x > 0) this.player.setTexture("player2", "right2");
      else if (prevVelocity.y < 0) this.player.setTexture("player2", "back2");
      else if (prevVelocity.y > 0) this.player.setTexture("player2", "front2");
    }
  }

  hitEnemy(player, enemiesGroup) {
    this.scene.restart();
  }

  victory() {
    //this.scene.remove("Game");
    // this.scene.stop("Game");
    // this.scene.stop("Game");
    this.scene.start("Victory");
  }
}

export default Game;
