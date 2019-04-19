import Enemies from "../enemies";
import { getAsset } from "./utils";

class Level2 extends Phaser.Scene {
  constructor() {
    super({ key: "Level2" });

    this.player;
    this.cursors;
    this.enemies;
  }

  preload() {
    this.load.image("tiles", getAsset("tiles.png"));
    this.load.image("house", getAsset("house.png"));
    this.load.tilemapTiledJSON("level-2", getAsset("level-2.json"));
    this.load.image("background", getAsset("water.png"));
    this.load.spritesheet("kylie", getAsset("kylie.png"), {
      frameWidth: 36,
      frameHeight: 36
    });
    this.load.image("wolf", getAsset("wolfs.png"));
  }

  create() {
    const map = this.make.tilemap({ key: "level-2" });
    const tileset = map.addTilesetImage("assets", "tiles");

    this.add.image(600, 300, "background");
    const house = this.physics.add.image(1310, 65, "house");
    house.body.static = true;
    house.setDepth(10);

    const lowerLayer = map.createStaticLayer("LowerGround", tileset, 0, 0);
    const groundLayer = map.createStaticLayer("Ground", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const highLayer = map.createStaticLayer("High", tileset, 0, 0);

    lowerLayer.setCollisionByProperty({ collides: true });
    groundLayer.setCollisionByProperty({ collides: true });
    worldLayer.setCollisionByProperty({ collides: true });
    highLayer.setDepth(10);

    const spawnPoint = map.findObject("player", obj => obj.name === "Spawn Point");

    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "kylie");

    this.physics.add.collider(this.player, lowerLayer);
    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.player, worldLayer);

    this.physics.add.collider(this.player, house, this.victory, null, this);

    this.enemies = map.createFromObjects("Enemies", "Enemy", {});
    this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);
    this.physics.add.collider(this.enemiesGroup, lowerLayer);
    this.physics.add.collider(this.enemiesGroup, groundLayer);
    this.physics.add.collider(this.enemiesGroup, worldLayer);

    this.physics.add.collider(this.enemiesGroup, this.player, this.hitEnemy, null, this);

    this.anims.create({
      key: "kylie-left",
      frames: this.anims.generateFrameNames("kylie", { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "kylie-right",
      frames: this.anims.generateFrameNames("kylie", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "kylie-front",
      frames: this.anims.generateFrameNames("kylie", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "kylie-back",
      frames: this.anims.generateFrameNames("kylie", { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-250);
      this.player.anims.play("kylie-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(250);
      this.player.anims.play("kylie-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-250);
      this.player.anims.play("kylie-back", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(250);
      this.player.anims.play("kylie-front", true);
    } else {
      this.player.anims.stop();
    }
  }

  hitEnemy() {
    this.scene.restart();
  }

  victory() {
    this.scene.stop("Level2");
    this.scene.start("TheEnd");
  }
}

export default Level2;
