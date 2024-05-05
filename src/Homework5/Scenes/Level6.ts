import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameLevel from "./GameLevel";

export default class Level6 extends GameLevel {
    bloom: boolean;
    
    loadScene(): void {
        // Load resources
        this.load.spritesheet("player", "hw5_assets/spritesheets/main_character_lvl6.json");
        this.load.tilemap("level6", "hw5_assets/tilemaps/level6.json");
        this.load.spritesheet("colorKey", "hw5_assets/spritesheets/ColorKey.json");
        this.load.spritesheet("Crown", "hw5_assets/spritesheets/crown.json");
        this.load.audio("level_music", "hw5_assets/music/level6_music.mp3");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("collection", "hw5_assets/sounds/collection.mp3");
    }        

    startScene(): void {
        this.Level = 6;
        this.bloom = false;
        // Add the level 6 tilemap
        this.add.tilemap("level6", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(4*32, 4*32);

        // Do generic setup for a GameLevel
        super.startScene();

        this.addKey("Crown", new Vec2(57, 2));
        this.addKey("colorKey", new Vec2(26, 8));

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