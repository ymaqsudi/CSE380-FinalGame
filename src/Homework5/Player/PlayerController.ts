import StateMachineAI from "../../Wolfie2D/AI/StateMachineAI";
import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Debug from "../../Wolfie2D/Debug/Debug";
import GameNode, { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import Sprite from "../../Wolfie2D/Nodes/Sprites/Sprite";
import OrthogonalTilemap from "../../Wolfie2D/Nodes/Tilemaps/OrthogonalTilemap";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import GameLevel from "../Scenes/GameLevel";
import Level6 from "../Scenes/Level6";
import { HW5_Color } from "../hw5_color";
import { HW5_Events } from "../hw5_enums";
import Fall from "./PlayerStates/Fall";
import Idle from "./PlayerStates/Idle";
import InAir from "./PlayerStates/InAir";
import Jump from "./PlayerStates/Jump";
import Run from "./PlayerStates/Run";
import Walk from "./PlayerStates/Walk";

export enum PlayerType {
    PLATFORMER = "platformer",
    TOPDOWN = "topdown"
}

export enum PlayerStates {
    IDLE = "idle",
    WALK = "walk",
	RUN = "run",
	JUMP = "jump",
    FALL = "fall",
	PREVIOUS = "previous"
}

export default class PlayerController extends StateMachineAI {
    protected owner: GameNode;
    velocity: Vec2 = Vec2.ZERO;
	speed: number = 200;
	MIN_SPEED: number = 200;
    MAX_SPEED: number = 300;
    tilemap: OrthogonalTilemap;
    suitColor: HW5_Color;
    switches: Map<Vec2, boolean> = new Map<Vec2, boolean>();

    // HOMEWORK 5 - TODO
    /**
     * Implement a death animation for the player using tweens. The animation rotate the player around itself multiple times
     * over the tween duration, as well as fading out the alpha value of the player. The tween should also make use of the
     * onEnd field to send out a PLAYER_KILLED event.
     * 
     * Tweens MUST be used to create this new animation, although you can add to the spritesheet if you want to add some more detail.
     * 
     * Look at incPlayerLife() in GameLevel to see where this animation would be called.
     */
    initializeAI(owner: GameNode, options: Record<string, any>){
        this.owner = owner;

        this.initializePlatformer();

        this.tilemap = this.owner.getScene().getTilemap(options.tilemap) as OrthogonalTilemap;

        owner.tweens.add("respawn", {
            startDelay: 0,
            duration: 1000,
            effects: [
                {
                    property: "rotation",
                    start: 0,
                    end: 2*Math.PI,
                    ease: EaseFunctionType.IN_OUT_QUAD
                },
                {
                    property: "alpha",
                    start: 0,
                    end: 1,
                    ease: EaseFunctionType.IN_OUT_QUAD
                }
            ]
        });
    }

    initializePlatformer(): void {
        this.speed = 400;

        let idle = new Idle(this, this.owner);
		this.addState(PlayerStates.IDLE, idle);
		let walk = new Walk(this, this.owner);
		this.addState(PlayerStates.WALK, walk);
		let run = new Run(this, this.owner);
		this.addState(PlayerStates.RUN, run);
		let jump = new Jump(this, this.owner);
        this.addState(PlayerStates.JUMP, jump);
        let fall = new Fall(this, this.owner);
        this.addState(PlayerStates.FALL, fall);
        
        this.initialize(PlayerStates.IDLE);
    }

    changeState(stateName: string): void {
        // If we jump or fall, push the state so we can go back to our current state later
        // unless we're going from jump to fall or something
        if((stateName === PlayerStates.JUMP || stateName === PlayerStates.FALL) && !(this.stack.peek() instanceof InAir)){
            this.stack.push(this.stateMap.get(stateName));
        }

        super.changeState(stateName);
    }

    // HOMEWORK 5 - TODO
    /**
     * We want to detect when our player is moving over one of the switches in the world, and along with the sound
     * and label changes, we also visually want to change the tile.
     * 
     * You'll have to figure out when the player is over a tile, and then change that tile to the ON tile that you see in
     * tileset.png in tilemaps. You also need to send the PLAYER_HIT_SWITCH event so elements can be handled in GameLevel.ts
     * 
     * Make use of the tilemap field in the PlayerController and the methods at it's disposal.
     * 
     */
    update(deltaT: number): void {
		super.update(deltaT);

		if(this.currentState instanceof Jump){
			Debug.log("playerstate", "Player State: Jump");
		} else if (this.currentState instanceof Walk){
			Debug.log("playerstate", "Player State: Walk");
		} else if (this.currentState instanceof Run){
			Debug.log("playerstate", "Player State: Run");
		} else if (this.currentState instanceof Idle){
			Debug.log("playerstate", "Player State: Idle");
		} else if(this.currentState instanceof Fall){
            Debug.log("playerstate", "Player State: Fall");
        }

        if(this.owner.position.y > 700) {
            let respawn: Vec2 = (<GameLevel>this.owner.getScene()).getPlayerSpawn();
            this.owner.position.copy(respawn);
            this.owner.tweens.play("respawn");
            this.owner.freeze();
            setTimeout(() => this.owner.unfreeze(), 1000);
        }

        if((<GameLevel>this.owner.getScene()).getLevel() === 6) {
            if((<GameLevel>this.owner.getScene()).keyNumber === 1) {
                (<Level6>this.owner.getScene()).bloom = true;

                let rainbow_set: Array<Vec2> = [];
                rainbow_set.push(new Vec2(29, 12));
                rainbow_set.push(new Vec2(30, 12));
                rainbow_set.push(new Vec2(31, 11));
                rainbow_set.push(new Vec2(32, 11));
                rainbow_set.push(new Vec2(33, 11));
                for(let i = 0; i < 8; i++) {
                    rainbow_set.push(new Vec2(34 + i, 10));
                }
                rainbow_set.push(new Vec2(42, 11));
                rainbow_set.push(new Vec2(43, 11));
                rainbow_set.push(new Vec2(44, 11));
                rainbow_set.push(new Vec2(45, 12));
                rainbow_set.push(new Vec2(46, 12));
                
                this.tilemap.setTileAtRowCol(new Vec2(27, 9), 23);
                setTimeout(() => {
                    this.tilemap.setTileAtRowCol(new Vec2(28, 9), 23);
                    this.tilemap.setTileAtRowCol(new Vec2(28, 10), 32);
                }, 120);
                let i = 120;
                setTimeout(() => {
                    for(let block of rainbow_set) {
                        setTimeout(() => {
                            this.tilemap.setTileAtRowCol(block, 50);
                            this.tilemap.setTileAtRowCol(new Vec2(block.x, block.y -1), 41);
                            this.tilemap.setTileAtRowCol(new Vec2(block.x, block.y -2), 32);
                            this.tilemap.setTileAtRowCol(new Vec2(block.x, block.y -3), 23);
                            this.tilemap.setTileAtRowCol(new Vec2(block.x, block.y -4), 14);
                        }, i);
                        i += 120;
                    }
                    setTimeout(() => {
                        this.tilemap.setTileAtRowCol(new Vec2(47, 9), 23);
                        this.tilemap.setTileAtRowCol(new Vec2(47, 10), 32);
                    }, i);
                    setTimeout(() => {
                        this.tilemap.setTileAtRowCol(new Vec2(48, 9), 23);
                    }, i + 120);
                }, 120);
            }
        }
        
	}
}