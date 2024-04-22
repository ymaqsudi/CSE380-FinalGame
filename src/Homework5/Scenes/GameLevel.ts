import AABB from "../../Wolfie2D/DataTypes/Shapes/AABB";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import BalloonController from "../Enemies/BalloonController";
import { HW5_Color } from "../hw5_color";
import { HW5_Events } from "../hw5_enums";
import HW5_ParticleSystem from "../HW5_ParticleSystem";
import PlayerController from "../Player/PlayerController";
import MainMenu from "./MainMenu";
import CompletedLevel1 from "./completedLevel1";
import CompletedLevel2 from "./completedLevel2";
import CompletedLevel3 from "./completedLevel3";
import CompletedLevel4 from "./completedLevel4";
import CompletedLevel5 from "./completedLevel5";
import CompletedLevel6 from "./completedLevel6";

// HOMEWORK 5 - TODO
/**
 * Add in some level music.
 * 
 * This can be done here in the base GameLevel class, or in Level1 and Level2,
 * it's up to you.
 */
export default class GameLevel extends Scene {
    
    // Every level will have a player, which will be an animated sprite
    protected playerSpawn: Vec2;
    protected player: AnimatedSprite;
    protected respawnTimer: Timer;

    // Every level will have a key to move onto the next
    protected key: Vec2;
    protected keyNumber: number;

    // Labels for the UI
    protected static livesCount: number = 3;
    protected livesCountLabel: Label;

    // Stuff to end the level and go to the next level
    protected levelEndArea: Rect;
    protected nextLevel: new (...args: any) => GameLevel;
    protected levelEndTimer: Timer;
    protected levelEndLabel: Label;
    
    // Screen fade in/out for level start and end
    protected levelTransitionTimer: Timer;
    protected levelTransitionScreen: Rect;
    
    // Custom particle sysyem
    protected system: HW5_ParticleSystem;

    // Cooldown timer for changing suits
    protected suitChangeTimer: Timer;

    // Total ballons and amount currently popped
    protected totalBalloons: number;
    protected balloonLabel: Label;
    protected balloonsPopped: number;

    // Total switches and amount currently pressed
    protected totalSwitches: number;
    protected switchLabel: Label;
    protected switchesPressed: number;

    getKeyNumber(): number {
        return this.keyNumber;
    }

    startScene(): void {

        // Do the game level standard initializations
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.subscribeToEvents();
        this.addUI();

        this.keyNumber = 0;
        // Initialize the timers
        this.respawnTimer = new Timer(1000, () => {
            if(GameLevel.livesCount === 0){
                this.sceneManager.changeToScene(MainMenu);
            } else {
                this.respawnPlayer();
                this.player.enablePhysics();
                this.player.unfreeze();
            }
        });
        this.levelTransitionTimer = new Timer(500);
        this.levelEndTimer = new Timer(500, () => {
            // After the level end timer ends, fade to black and then go to the next scene
            this.levelTransitionScreen.tweens.play("fadeIn");
        });

        // 3 second cooldown for changing suits
        this.suitChangeTimer = new Timer(3000);

        // Start the black screen fade out
        this.levelTransitionScreen.tweens.play("fadeOut");

        // Initially disable player movement
        Input.disableInput();

        // stop playing menu music
        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "menu" });
    }


    updateScene(deltaT: number){
        // Handle events and update the UI if needed
        while(this.receiver.hasNextEvent()){
            let event = this.receiver.getNextEvent();
            
            switch(event.type){
                case HW5_Events.PLAYER_HIT_SWITCH:
                    {
                        // Hit a switch block, so update the label and count
                        this.switchesPressed++;
                        this.switchLabel.text = "Switches Left: " + (this.totalSwitches - this.switchesPressed)
                        this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "switch", loop: false, holdReference: false});
                    }
                    break;

                case HW5_Events.PLAYER_HIT_KEY:
                    {
                        let node = this.sceneGraph.getNode(event.data.get("node"));
                        let other = this.sceneGraph.getNode(event.data.get("other"));

                        if(node === this.player){
                            // Node is player, other is balloon
                            this.handleKeyCollision(<AnimatedSprite>node, <AnimatedSprite>other);
                        } else {
                            // Other is player, node is balloon
                            this.handleKeyCollision(<AnimatedSprite>other,<AnimatedSprite>node);

                        }
                    }
                    break;
                    
                case HW5_Events.PLAYER_ENTERED_LEVEL_END:
                    {
                        // The player has reached the end of the level
                        this.levelEndTimer.start();
                        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_music" });
                        Input.disableInput();
                    }
                    break;

                case HW5_Events.LEVEL_START:
                    {
                        // Re-enable controls
                        Input.enableInput();
                    }
                    break;
                
                case HW5_Events.LEVEL_END:
                    {
                        switch(this.keyNumber) {
                            case 1:
                                {
                                    // complete red level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel1);
                                    break;
                                }
                            case 2:
                                {
                                    // complete yellow level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel2);
                                    break;
                                }
                            case 3:
                                {
                                    // complete green level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel3);
                                    break;
                                }
                            case 4:
                                {
                                    // complete blue level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel4);
                                    break;
                                }
                            case 5:
                                {
                                    // complete purple level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel5);
                                    break;
                                }
                            case 6:
                                {
                                    // complete last level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel6);
                                    break;
                                }
                        }
                        
                    }
                    break;

                case HW5_Events.PLAYER_KILLED:
                    {
                        this.respawnPlayer();
                    }
                    break;
            }
        }

        if (Input.isKeyJustPressed("c")) {
            this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
        }
    }

    /**
     * Initialzes the layers
     */
    protected initLayers(): void {
        // Add a layer for UI
        this.addUILayer("UI");

        // Add a layer for players and enemies
        this.addLayer("primary", 1);
    }

    /**
     * Initializes the viewport
     */
    protected initViewport(): void {
        this.viewport.setZoomLevel(2);
    }

    /**
     * Handles all subscriptions to events
     */
    protected subscribeToEvents(){
        this.receiver.subscribe([
            HW5_Events.PLAYER_HIT_SWITCH,
            HW5_Events.PLAYER_HIT_KEY,
            HW5_Events.PLAYER_ENTERED_LEVEL_END,
            HW5_Events.LEVEL_START,
            HW5_Events.LEVEL_END,
            HW5_Events.PLAYER_KILLED,
        ]);
    }

    /**
     * Adds in any necessary UI to the game
     */
    protected addUI(){
        // In-game labels

        this.livesCountLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(500, 30), text: "Lives: " + GameLevel.livesCount});
        this.livesCountLabel.textColor = Color.BLACK;
        this.livesCountLabel.font = "PixelSimple";

        // End of level label (start off screen)
        this.levelEndLabel = <Label>this.add.uiElement(UIElementType.LABEL, "UI", {position: new Vec2(-300, 200), text: "Level Complete"});
        this.levelEndLabel.size.set(1200, 60);
        this.levelEndLabel.borderRadius = 0;
        this.levelEndLabel.backgroundColor = new Color(34, 32, 52);
        this.levelEndLabel.textColor = Color.WHITE;
        this.levelEndLabel.fontSize = 48;
        this.levelEndLabel.font = "PixelSimple";

        // Add a tween to move the label on screen
        this.levelEndLabel.tweens.add("slideIn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.posX,
                    start: -300,
                    end: 300,
                    ease: EaseFunctionType.OUT_SINE
                }
            ]
        });

        // Create our particle system and initialize the pool
        this.system = new HW5_ParticleSystem(100, new Vec2((5 * 32), (10 * 32)), 2000, 3, 1, 100);
        this.system.initializePool(this, "primary");

        this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, "UI", {position: new Vec2(300, 200), size: new Vec2(600, 400)});
        this.levelTransitionScreen.color = Color.BLACK;
        this.levelTransitionScreen.alpha = 1;

        this.levelTransitionScreen.tweens.add("fadeIn", {
            startDelay: 0,
            duration: 500,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: HW5_Events.LEVEL_END
        });

        this.levelTransitionScreen.tweens.add("fadeOut", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: TweenableProperties.alpha,
                    start: 1,
                    end: 0,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ],
            onEnd: HW5_Events.LEVEL_START
        });
    }

    /**
     * Initializes the player
     */
    protected initPlayer(): void {
        // Add the player
        this.player = this.add.animatedSprite("player", "primary");
        this.player.scale.set(2, 2);
        if(!this.playerSpawn){
            console.warn("Player spawn was never set - setting spawn to (0, 0)");
            this.playerSpawn = Vec2.ZERO;
        }
        this.player.position.copy(this.playerSpawn);
        this.player.addPhysics(new AABB(Vec2.ZERO, new Vec2(14, 14)));
        this.player.colliderOffset.set(0, 2);
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "Main", color: HW5_Color.RED});

        this.player.setGroup("player");

        this.viewport.follow(this.player);
    }

    /**
     * Initializes the level end area
     */
    protected addLevelEnd(startingTile: Vec2, size: Vec2): void {
        this.levelEndArea = <Rect>this.add.graphic(GraphicType.RECT, "primary", {position: startingTile.scale(32), size: size.scale(32)});
        this.levelEndArea.addPhysics(undefined, undefined, false, true);
        this.levelEndArea.setTrigger("player", HW5_Events.PLAYER_ENTERED_LEVEL_END, null);
        this.levelEndArea.color = new Color(0, 0, 0, 0);
    }

    protected addKey(spriteKey: string, tilePos: Vec2): void {
        let key = this.add.animatedSprite(spriteKey, "primary");
        key.position.set(tilePos.x*32, tilePos.y*32);
        key.scale.set(.5, .5);
        key.addPhysics();
        key.setGroup("key");
        key.setTrigger("player", HW5_Events.PLAYER_HIT_KEY, null);
        this.keyNumber++;
    }

    protected handleKeyCollision(player: AnimatedSprite, key:AnimatedSprite){
		this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "collection", loop: false, holdReference: false});
        key.destroy();
        this.keyNumber--;
        if(this.keyNumber === 0){
            this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
        }
    }

    /**
     * Increments the amount of life the player has
     * @param amt The amount to add to the player life
     */
    protected incPlayerLife(amt: number): void {
        GameLevel.livesCount += amt;
        this.livesCountLabel.text = "Lives: " + GameLevel.livesCount;
        if (GameLevel.livesCount == 0){
            Input.disableInput();
            this.player.disablePhysics();
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "player_death", loop: false, holdReference: false});
            this.player.tweens.play("death");
        }
    }

    /**
     * Returns the player to spawn
     */
    protected respawnPlayer(): void {
        GameLevel.livesCount = 3;
        this.emitter.fireEvent(GameEventType.STOP_SOUND, {key: "level_music"});
        this.sceneManager.changeToScene(MainMenu, {});
        Input.enableInput();
        this.system.stopSystem();
    }
}