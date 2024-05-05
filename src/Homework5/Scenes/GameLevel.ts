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
import Button from "../../Wolfie2D/Nodes/UIElements/Button";

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

    // Every level will have a key to move onto the next
    protected key: Vec2;
    keyNumber: number;

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

    protected isPausing: boolean;
    protected Level: number;

    getLevel(): number {
        return this.Level;
    }

    getPlayerSpawn(): Vec2 {
        return this.playerSpawn;
    }

    startScene(): void {
        this.keyNumber = 0;
        // Do the game level standard initializations
        this.initLayers();
        this.initViewport();
        this.initPlayer();
        this.subscribeToEvents();
        this.addUI();

        this.isPausing = false;
        // Initialize the timers
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

        this.getLayer("pauseMenu").disable();
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

                case HW5_Events.LEVEL_START:
                    {
                        // Re-enable controls
                        Input.enableInput();
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
                
                case HW5_Events.LEVEL_END:
                    {
                        switch(this.getLevel()) {
                            case 1:
                                {
                                    // complete red level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel1, {}, {progress: this.progress});
                                    break;
                                }
                            case 2:
                                {
                                    // complete yellow level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel2, {}, {progress: this.progress});
                                    break;
                                }
                            case 3:
                                {
                                    // complete green level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel3, {}, {progress: this.progress});
                                    break;
                                }
                            case 4:
                                {
                                    // complete blue level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel4, {}, {progress: this.progress});
                                    break;
                                }
                            case 5:
                                {
                                    // complete purple level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel5, {}, {progress: this.progress});
                                    break;
                                }
                            case 6:
                                {
                                    // complete last level
                                    this.viewport.follow(null);
                                    Input.enableInput();
                                    this.sceneManager.changeToScene(CompletedLevel6, {}, {progress: this.progress});
                                    break;
                                }
                        }
                        
                    }
                    break;
            }
        }

        if(Input.isKeyJustPressed("c")) {
            this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
        }

        if(Input.isKeyJustPressed("escape")) {
            if(this.isPausing) {
                this.player.unfreeze();
                this.getLayer("pauseMenu").disable();
                this.isPausing = false;
            }
            else {
                this.player.freeze();
                this.getLayer("pauseMenu").enable();
                this.isPausing = true;
            }
        }
    }

    /**
     * Initialzes the layers
     */
    protected initLayers(): void {
        // Add a layer for UI
        this.addUILayer("pauseMenu");
        this.addUILayer("UI");

        // Add a layer for players
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
        let size = this.viewport.getHalfSize();

        let pauseLable = <Label>this.add.uiElement(UIElementType.LABEL, "pauseMenu", {position: new Vec2(size.x, size.y - 100), text: "Game Paused"});
        pauseLable.textColor = Color.WHITE;
        pauseLable.font = "PixelSimple";
        pauseLable.fontSize = 48;
        pauseLable.setHAlign("center");
        pauseLable.setVAlign("center");


        let ContBtn = <Button>(
            this.add.uiElement(UIElementType.BUTTON, "pauseMenu", {
              position: new Vec2(size.x, size.y - 30),
              text: "Continue",
            })
        );
        ContBtn.backgroundColor = Color.TRANSPARENT;
        ContBtn.borderWidth = 2;
        ContBtn.borderRadius = 5;
        ContBtn.setPadding(new Vec2(10, 10));
        ContBtn.font = "PixelSimple";
        ContBtn.onEnter = () => {ContBtn.backgroundColor = new Color(255, 255, 255, 0.2);};
        ContBtn.onClick = () => {
            this.player.unfreeze();
            this.getLayer("pauseMenu").disable();
            this.isPausing = false;
        };

        let BackBtn = <Button>(
            this.add.uiElement(UIElementType.BUTTON, "pauseMenu", {
              position: new Vec2(size.x, size.y + 20),
              text: "Back to Menu",
            })
        );
        BackBtn.backgroundColor = Color.TRANSPARENT;
        BackBtn.borderWidth = 2;
        BackBtn.borderRadius = 5;
        BackBtn.setPadding(new Vec2(10, 10));
        BackBtn.font = "PixelSimple";
        BackBtn.onEnter = () => {BackBtn.backgroundColor = new Color(255, 255, 255, 0.2);};
        BackBtn.onClick = () => {
            this.getLayer("pauseMenu").disable();
            this.isPausing = false;
            this.levelTransitionScreen.tweens.play("fadeIn");
            this.viewport.follow(null);
            this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menu", loop: true, holdReference: true,});
            this.sceneManager.changeToScene(MainMenu, {}, {progress: this.progress});
        };

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
        this.player.addAI(PlayerController, {playerType: "platformer", tilemap: "walls"});

        this.player.setGroup("player");

        this.viewport.follow(this.player);
    }

    protected addKey(spriteKey: string, tilePos: Vec2): void {
        let key = this.add.animatedSprite(spriteKey, "primary");
        key.position.set(tilePos.x*32, tilePos.y*32);
        key.scale.set(.5, .5);
        if(spriteKey === "Crown") {
            key.scale.set(0.1, 0.1);
        }
        key.addPhysics();
        key.setGroup("key");
        key.setTrigger("player", HW5_Events.PLAYER_HIT_KEY, null);
        key.animation.play("IDLE", true);
        this.keyNumber++;
    }

    protected handleKeyCollision(player: AnimatedSprite, key:AnimatedSprite){
		this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "collection", loop: false, holdReference: false});
        key.destroy();
        this.keyNumber--;
        if(this.keyNumber === 0){
            this.player.freeze();
            this.emitter.fireEvent(HW5_Events.PLAYER_ENTERED_LEVEL_END);
        }
    }
}