import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { HW5_Events } from "../hw5_enums";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";

export default class MenuScene extends Scene {
    MenuTransitionScreen: Rect;
    size: Vec2;

    loadScene(): void {
        this.load.audio("level_complete", "hw5_assets/music/victory.mp3");
    }
  
    startScene(): void {
      this.addLayer("Main", 1);
      this.addLayer("background", 3);

      // Center the viewport
      let size = this.viewport.getHalfSize();
      this.viewport.setFocus(size);
      this.viewport.setZoomLevel(1);
  
      this.MenuTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, "background", {position: size.clone(), size: new Vec2(size.x * 10, size.y * 10)});
      this.MenuTransitionScreen.color = Color.BLACK;
      this.MenuTransitionScreen.alpha = 1;
  
      this.MenuTransitionScreen.tweens.add("fadeInToMain", {
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
          onEnd: HW5_Events.TOMAIN
      });

      this.MenuTransitionScreen.tweens.add("fadeIn", {
        startDelay: 0,
        duration: 600,
        effects: [
            {
                property: TweenableProperties.alpha,
                start: 0,
                end: 1,
                ease: EaseFunctionType.IN_OUT_QUAD
            }
        ],
      });

      this.MenuTransitionScreen.tweens.add("fadeOut", {
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
      });
    
      this.receiver.subscribe([
        HW5_Events.TOMAIN,
      ]);
      
      this.MenuTransitionScreen.tweens.play("fadeOut");
    
    }
  
    updateScene(deltaT: number): void {
        if(this.receiver.hasNextEvent() && this.receiver.getNextEvent().type === HW5_Events.TOMAIN){
            this.sceneManager.changeToScene(MainMenu);
        }
    }

    unloadScene(): void {
        this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_complete" });
    }
  }
  