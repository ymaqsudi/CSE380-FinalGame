import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import { HW5_Events } from "../hw5_enums";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";

export default class MenuScene extends Scene {
    levelTransitionScreen: Rect;
    size: Vec2;
  
    startScene(): void {
      this.addLayer("Main", 1);
      this.addLayer("background", 3);
  
      // Center the viewport
      let size = this.viewport.getHalfSize();
      this.viewport.setFocus(size);
  
      this.viewport.setZoomLevel(1);
  
      this.levelTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, "background", {position: new Vec2(size.x, size.y), size: new Vec2(1200, 800)});
      this.levelTransitionScreen.color = Color.BLACK;
      this.levelTransitionScreen.alpha = 1;
  
      this.levelTransitionScreen.tweens.add("fadeIn", {
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
          onEnd: HW5_Events.MAINMENU
      });
  
      this.levelTransitionScreen.tweens.add("fadeOut", {
          startDelay: 0,
          duration: 1200,
          effects: [
              {
                  property: TweenableProperties.alpha,
                  start: 1,
                  end: 0,
                  ease: EaseFunctionType.IN_OUT_QUAD
              }
          ],
      });
  
      this.levelTransitionScreen.tweens.play("fadeOut");
  
      this.receiver.subscribe([
        HW5_Events.MAINMENU
      ]);
    }
  
    updateScene(deltaT: number): void {
      if(this.receiver.hasNextEvent() && this.receiver.getNextEvent().type === HW5_Events.MAINMENU){
        this.sceneManager.changeToScene(MainMenu);
      }
    }
  }
  