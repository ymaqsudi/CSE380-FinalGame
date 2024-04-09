import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Color from "../../Wolfie2D/Utils/Color";
import MenuScene from "./MenuScene";

export default class AboutScene extends MenuScene {
  animatedSprite: AnimatedSprite;

  startScene(): void {
    super.startScene();

    // Center the viewport
    let size = this.viewport.getHalfSize();
    this.viewport.setFocus(size);
    this.viewport.setZoomLevel(1);

    // Back button
    let backButton = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {
      position: new Vec2(100, 50), // Positioning at the top left
      text: "Back",
    });

    backButton.backgroundColor = Color.TRANSPARENT;
    backButton.borderColor = Color.WHITE;
    backButton.borderRadius = 5;
    backButton.textColor = Color.WHITE;
    backButton.font = "PixelSimple";
    backButton.fontSize = 24;
    backButton.size.set(100, 50); // Set the size of the back button
    backButton.onEnter = () => {backButton.backgroundColor = new Color(255, 255, 255, 0.2);}

    backButton.onClick = () => {
      this.MenuTransitionScreen.tweens.play("fadeInToMain");
    };

    // Main Title Label
    let title = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y - 200),
      text: "ABOUT",
    });
    title.textColor = Color.WHITE;
    title.font = "PixelSimple";
    title.fontSize = 48;
    title.setHAlign("center");
    title.setVAlign("center");

    // About text Label
    let text1 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y - 120),
      text: "This world has always been various shades of black, gray, and white.",
    });
    text1.textColor = Color.WHITE;
    text1.font = "PixelSimple";
    text1.fontSize = 24;
    text1.setHAlign("center");
    text1.setVAlign("center");

    let text2 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y - 80),
      text: "But you have recently heard stories of these hidden items that once found,",
    });
    text2.textColor = Color.WHITE;
    text2.font = "PixelSimple";
    text2.fontSize = 24;
    text2.setHAlign("center");
    text2.setVAlign("center");

    let text2_0 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y - 40),
      text: "can help to light the world up in colors never seen before.",
    });
    text2_0.textColor = Color.WHITE;
    text2_0.font = "PixelSimple";
    text2_0.fontSize = 24;
    text2_0.setHAlign("center");
    text2_0.setVAlign("center");

    let text3 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y),
      text: "Enthralled with the story, you head out on an adventure,",
    });
    text3.textColor = Color.WHITE;
    text3.font = "PixelSimple";
    text3.fontSize = 24;
    text3.setHAlign("center");
    text3.setVAlign("center");

    let text3_0 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y + 40),
      text: "seeking to transform the world into one full of vivid color.",
    });
    text3_0.textColor = Color.WHITE;
    text3_0.font = "PixelSimple";
    text3_0.fontSize = 24;
    text3_0.setHAlign("center");
    text3_0.setVAlign("center");

    let authors = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y + 160),
      text: "Presented by Sabrinna K, Zijun W, and Yaseen M",
    });
    authors.textColor = Color.WHITE;
    authors.font = "PixelSimple";
    authors.fontSize = 20;
    authors.setHAlign("center");
    authors.setVAlign("center");
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}
