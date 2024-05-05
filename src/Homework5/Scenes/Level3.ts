import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameLevel from "./GameLevel";

export default class Level3 extends GameLevel {
    
    loadScene(): void {
        // Load resources
        this.load.tilemap("level3", "hw5_assets/tilemaps/level3.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/main_character_lvl" + (this.progress === 6 ? 6 : this.progress + 1) + ".json");
        this.load.spritesheet("greenKey", "hw5_assets/spritesheets/GreenKey.json");
        this.load.audio("level_music", "hw5_assets/music/level3_music.mp3");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("collection", "hw5_assets/sounds/collection.mp3");
    }

    startScene(): void {
        this.Level = 3;
        // Add the level 3 tilemap
        this.add.tilemap("level3", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(5*32, 14*32);

        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_complete"});
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_music", loop: true, holdReference: true});

        // Do generic setup for a GameLevel
        super.startScene();

        this.addKey("greenKey", new Vec2(60, 10));
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_music" });
      }
    
}