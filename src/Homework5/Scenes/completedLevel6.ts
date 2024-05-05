import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import MenuScene from "./MenuScene";
import LevelSelect from "./level-select";

export default class CompletedLevel6 extends MenuScene {
  animatedSprite: AnimatedSprite;

  startScene(): void {
    super.startScene();
    this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "level_complete", loop: true, holdReference: true});

    // Center the viewport
    let size = new Vec2(600, 400);
    this.viewport.setFocus(size);
    this.viewport.setZoomLevel(1);

    // Back button
    let backButton = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {
      position: new Vec2(100, 50), // Positioning at the bottom left
      text: "Back",
    });
    
    backButton.backgroundColor = Color.TRANSPARENT;
    backButton.borderColor = Color.WHITE;
    backButton.textColor = Color.WHITE;
    backButton.font = "PixelSimple";
    backButton.fontSize = 24;
    backButton.size.set(100, 50); // Set the size of the back button
    backButton.borderRadius = 5;
    backButton.onEnter = () => {backButton.backgroundColor = new Color(255, 255, 255, 0.2);}

    backButton.onClick = () => {
      this.MenuTransitionScreen.tweens.play("fadeIn");
      let selectTimer = new Timer(500, () => {
        this.sceneManager.changeToScene(LevelSelect, {}, {progress: 6});
      });
      selectTimer.start();
  };

    // Main Title Label
    let title = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y - 200),
      text: "It's Amazing",
    });
    title.textColor = Color.WHITE;
    title.font = "PixelSimple";
    title.fontSize = 50;
    title.setHAlign("center");
    title.setVAlign("center");

    let text1 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x, size.y - 40),
        text: "The World is Filled With So Much",
      });
      text1.textColor = Color.WHITE;
      text1.font = "PixelSimple";
      text1.fontSize = 25;
      text1.setHAlign("center");
      text1.setVAlign("center");

    let text2 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x - 100, size.y + 20),
        text: "C",
      });
      text2.textColor = Color.RED;
      text2.font = "PixelSimple";
      text2.fontSize = 50;
      text2.setHAlign("center");
      text2.setVAlign("center");

    let text3 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x - 50, size.y + 20),
        text: "O",
      });
      text3.textColor = Color.YELLOW;
      text3.font = "PixelSimple";
      text3.fontSize = 50;
      text3.setHAlign("center");
      text3.setVAlign("center");

      let text4 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x, size.y + 20),
        text: "L",
      });
      text4.textColor = Color.GREEN;
      text4.font = "PixelSimple";
      text4.fontSize = 50;
      text4.setHAlign("center");
      text4.setVAlign("center");

      let text5 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x + 50, size.y + 20),
        text: "O",
      });
      text5.textColor = Color.BLUE;
      text5.font = "PixelSimple";
      text5.fontSize = 50;
      text5.setHAlign("center");
      text5.setVAlign("center");

      let text6 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x + 100, size.y + 20),
        text: "R",
      });
      text6.textColor = Color.fromStringHex("#4b369d");
      text6.font = "PixelSimple";
      text6.fontSize = 50;
      text6.setHAlign("center");
      text6.setVAlign("center");

  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }

  unloadScene(): void {
    this.load.keepAudio("level_complete");
  }
}