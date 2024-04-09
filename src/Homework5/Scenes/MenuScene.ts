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
    MenuTransitionScreen: Rect;
    size: Vec2;
  
    startScene(): void {
      this.addLayer("Main", 1);
      this.addLayer("background", 3);
  
      // Center the viewport
      let size = this.viewport.getHalfSize();
      this.viewport.setFocus(size);
      this.viewport.setZoomLevel(1);
  
      this.MenuTransitionScreen = <Rect>this.add.graphic(GraphicType.RECT, "background", {position: new Vec2(size.x, size.y), size: new Vec2(size.x * 2, size.y * 2)});
      this.MenuTransitionScreen.color = Color.BLACK;
      this.MenuTransitionScreen.alpha = 1;
  
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
          onEnd: HW5_Events.MAINMENU
      });
  
      this.MenuTransitionScreen.tweens.add("fadeOut", {
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
  
      this.MenuTransitionScreen.tweens.play("fadeOut");
  
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
  