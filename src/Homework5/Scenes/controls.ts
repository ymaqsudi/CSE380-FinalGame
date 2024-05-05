import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "../../Wolfie2D/Utils/Color";
import MenuScene from "./MenuScene";

export default class ControlsScene extends MenuScene {
  animatedSprite: AnimatedSprite;

  startScene(): void {
    super.startScene();

    // Center the viewport
    let size = this.viewport.getHalfSize();
    this.viewport.setFocus(size);
    this.viewport.setZoomLevel(1);
    this.addLayer("main_background", 0);
    this.addLayer("main_background2", 0.5);

    // Display background image
    if(this.progress !== 6) {
      let background = this.add.sprite("introBackground", "main_background");
      background.position.set(size.x, size.y);
      background.scale.set(
        (this.viewport.getHalfSize().x / background.size.x) * 2,
        (this.viewport.getHalfSize().y / background.size.y) * 2
      );
    }
    else {
      let background = this.add.sprite("introBackground_complete", "main_background");
      background.position.set(size.x, size.y);
      background.scale.set(
        (this.viewport.getHalfSize().x / background.size.x) * 2,
        (this.viewport.getHalfSize().y / background.size.y) * 2
      );
    }

    let rect = <Rect>this.add.graphic(GraphicType.RECT, "main_background2", {position: size, size: new Vec2(600, 600)});
    rect.color = new Color(0, 0, 0, 0.67);

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
      this.MenuTransitionScreen.tweens.play("fadeInToMain");
    };

    // Main Title Label
    let title = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y - 200),
      text: "CONTROLS",
    });
    title.textColor = Color.WHITE;
    title.font = "PixelSimple";
    title.fontSize = 48;
    title.setHAlign("center");
    title.setVAlign("center");

    // move around Label
    let moveAround = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x - 100, size.y),
      text: "Move Around",
    });
    moveAround.textColor = Color.WHITE;
    moveAround.font = "PixelSimple";
    moveAround.fontSize = 22;
    moveAround.setHAlign("center");
    moveAround.setVAlign("center");

    // wasd Label
    let wasd = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x + 100, size.y),
      text: "W A S D",
    });
    wasd.textColor = Color.WHITE;
    wasd.font = "PixelSimple";
    wasd.fontSize = 22;
    wasd.setHAlign("center");
    wasd.setVAlign("center");

    // Jump Label
    let jump = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x - 100, size.y + 100),
      text: "Jump",
    });
    jump.textColor = Color.WHITE;
    jump.font = "PixelSimple";
    jump.fontSize = 22;
    jump.setHAlign("center");
    jump.setVAlign("center");

    // wasd Label
    let space = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x + 100, size.y + 100),
      text: "Space",
    });
    space.textColor = Color.WHITE;
    space.font = "PixelSimple";
    space.fontSize = 22;
    space.setHAlign("center");
    space.setVAlign("center");

    // Interact Label
    let interact = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x - 100, size.y + 200),
      text: "Interact",
    });
    interact.textColor = Color.WHITE;
    interact.font = "PixelSimple";
    interact.fontSize = 22;
    interact.setHAlign("center");
    interact.setVAlign("center");

    // interact Label
    let f = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x + 100, size.y + 200),
      text: "F",
    });
    f.textColor = Color.WHITE;
    f.font = "PixelSimple";
    f.fontSize = 22;
    f.setHAlign("center");
    f.setVAlign("center");

  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}
