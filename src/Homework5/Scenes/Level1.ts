import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import GameLevel from "./GameLevel";

export default class Level1 extends GameLevel {
    
    loadScene(): void {
        // Load resources
        this.load.tilemap("level1", "hw5_assets/tilemaps/level1.json");
        this.load.spritesheet("player", "hw5_assets/spritesheets/main_character_lvl1.json");
        this.load.spritesheet("redKey", "hw5_assets/spritesheets/RedKey.json");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("collection", "hw5_assets/sounds/collection.mp3");
        this.load.audio("level_complete", "hw5_assets/music/victory.mp3");
        this.load.audio("level_music", "hw5_assets/music/level1_music.mp3");
    }

    startScene(): void {
        this.Level = 1;
        // Add the level 1 tilemap
        this.add.tilemap("level1", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64*32, 20*32);

        this.playerSpawn = new Vec2(5*32, 14*32);

        // Do generic setup for a GameLevel
        super.startScene();

        this.addKey("redKey", new Vec2(39, 3));

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