import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import { HW5_Events } from "../hw5_enums";
import GameLevel from "./GameLevel";

export default class Level3 extends GameLevel {
    loadScene(): void {
        // Load resources
        this.load.tilemap("level3", "hw5_assets/tilemaps/level3.json");
        this.load.spritesheet(
            "player",
            "hw5_assets/spritesheets/main_character_lvl" +
            (this.progress === 6 ? 6 : this.progress + 1) +
            ".json"
        );
        this.load.spritesheet("greenKey", "hw5_assets/spritesheets/GreenKey.json");
        this.load.spritesheet("cage", "hw5_assets/spritesheets/greencage.json");
        this.load.spritesheet(
            "unlockKey",
            "hw5_assets/spritesheets/unlock-key.json"
        );
        this.load.audio("level_music", "hw5_assets/music/level3_music.mp3");
        this.load.audio("jump", "hw5_assets/sounds/jump.wav");
        this.load.audio("collection", "hw5_assets/sounds/collection.mp3");
    }

    startScene(): void {
        this.Level = 3;
        // Add the level 3 tilemap
        this.add.tilemap("level3", new Vec2(2, 2));
        this.viewport.setBounds(0, 0, 64 * 32, 20 * 32);

        this.playerSpawn = new Vec2(5 * 32, 14 * 32);

        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_complete" });
        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {
            key: "level_music",
            loop: true,
            holdReference: true,
        });

        // Do generic setup for a GameLevel
        super.startScene();

        this.addKey("greenKey", new Vec2(60, 10));
        this.addKey("unlockKey", new Vec2(40, 18));

        // initialize the cage
        this.cage = this.add.sprite("cage", "primary");
        this.cage.position.set(60 * 32, 10 * 32);
        this.cage.size.set(64, 64);
        this.cage.addPhysics(new AABB(this.cage.position, new Vec2(32, 32)));
        this.cage.isStatic = true;
        this.physicsManager.registerObject(this.cage);
    }

    updateScene(deltaT: number): void {
        super.updateScene(deltaT);

        while (this.receiver.hasNextEvent()) {
            let event = this.receiver.getNextEvent();
    
            if (event.type === HW5_Events.PLAYER_HIT_SPECIAL_ITEM) {
                console.log("Special item hit detected");
                let key = this.sceneGraph.getNode(event.data.get("other"));
                this.handleUnlockKeyCollision(this.player, key as AnimatedSprite);
            } else if (event.type === HW5_Events.PLAYER_HIT_KEY) {
                console.log("normal");
    
                let key = this.sceneGraph.getNode(event.data.get("other"));
                this.handleKeyCollision(this.player, key as AnimatedSprite);
            }
        }
    }

    unloadScene(): void {
        // The scene is being destroyed, so we can stop playing the song
        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_music" });
    }
}
