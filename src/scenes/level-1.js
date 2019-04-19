import Enemies from "../enemies";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });

    this.player;
    this.cursors;
    this.enemies;
  }

  preload() {
    this.load.image("tiles", "../../assets/assets.png");
    this.load.image("house", "../../assets/finalhouse.png");
    this.load.tilemapTiledJSON("map", "../../assets/level-1.json");
    this.load.image("background", "../../assets/water.png");
    this.load.spritesheet("player", "../../assets/maybe.png", {
      frameWidth: 40,
      frameHeight: 50
    });
    this.load.image("wolf", "../../assets/myWolfs.png");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("assets", "tiles");

    this.add.image(600, 300, "background");
    const house = this.physics.add.image(1330, 90, "house");
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
      "Player",
      obj => obj.name === "Spawn Point"
    );

    // console.log("spawn point --- asbaji ", spawnPoint);
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");

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
      key: "left",
      frames: anims.generateFrameNames("player", { start: 3, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "right",
      frames: anims.generateFrameNames("player", { start: 6, end: 6 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "front",
      frames: anims.generateFrameNames("player", { start: 0, end: 0 }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "back",
      frames: anims.generateFrameNames("player", { start: 0, end: 0 }),
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
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("back", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("front", true);
    } else {
      this.player.anims.stop();

      if (prevVelocity.x < 0) this.player.setTexture("player", "left");
      else if (prevVelocity.x > 0) this.player.setTexture("player", "right");
      else if (prevVelocity.y < 0) this.player.setTexture("player", "back");
      else if (prevVelocity.y > 0) this.player.setTexture("player", "front");
    }
  }

  hitEnemy(player, enemiesGroup) {
    this.scene.restart();
  }

  victory() {
    //this.scene.remove("Game");
    // this.scene.stop("Game");
    this.scene.stop("Game");
    this.scene.start("Victory");
  }
}

export default Game;
