import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameLevel from "./GameLevel";

export default class Level4 extends GameLevel {
    
    loadScene(): void {
        // Load resources
        this.load.tilemap("level4", "hw5_assets/tilemaps/level4.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/main_character_lvl4.json");
        this.load.spritesheet("redKey", "hw5_assets/spritesheets/RedKey.json");
        this.load.spritesheet("yellowKey", "hw5_assets/spritesheets/YellowKey.json");
        this.load.spritesheet("greenKey", "hw5_assets/spritesheets/GreenKey.json");
        this.load.spritesheet("blueKey", "hw5_assets/spritesheets/BlueKey.json");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("level_music", "hw5_assets/music/menu.mp3");
    }

    startScene(): void {
        this.keyNumber = 4;
        // Add the level 4 tilemap
        this.add.tilemap("level4", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(5*32, 14*32);

        // Do generic setup for a GameLevel
        super.startScene();

        this.addLevelEnd(new Vec2(60, 13), new Vec2(5, 5));

        this.addKey("blueKey", new Vec2(39, 3));

        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_music" });
      }
    
}