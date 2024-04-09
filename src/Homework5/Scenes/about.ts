import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export default class AboutScene extends Scene {
  animatedSprite: AnimatedSprite;

  loadScene(): void {
    // Load the menu song
    this.load.audio("menu", "hw5_assets/music/game-soundtrack.mp3");
  }

  startScene(): void {
    this.addUILayer("Main");

    // Center the viewport
    let size = this.viewport.getHalfSize();
    this.viewport.setFocus(size);

    this.viewport.setZoomLevel(1);

    // Back button
    let backButton = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {
      position: new Vec2(100, 50), // Positioning at the bottom left
      text: "Back",
    });
    backButton.backgroundColor = new Color(67, 67, 67);
    backButton.textColor = Color.WHITE;
    backButton.font = "PixelSimple";
    backButton.fontSize = 24;
    backButton.size.set(100, 50); // Set the size of the back button
    backButton.borderRadius = 5;

    backButton.onClick = () => {
      this.sceneManager.changeToScene(MainMenu, {}, {});
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
      position: new Vec2(size.x, size.y - 100),
      text: "This world has always been various shades of black, gray, and white.",
    });
    text1.textColor = Color.WHITE;
    text1.font = "PixelSimple";
    text1.fontSize = 22;
    text1.setHAlign("center");
    text1.setVAlign("center");

    // About text Label
    let text2 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y - 75),
      text: "But you have recently heard stories of these hidden items that once found, can help to light the world up in colors never seen before.",
    });
    text2.textColor = Color.WHITE;
    text2.font = "PixelSimple";
    text2.fontSize = 22;
    text2.setHAlign("center");
    text2.setVAlign("center");

    let text3 = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y - 50),
      text: "Enthralled with the story, you head out on an adventure, seeking to transform the world into one full of vivid color.",
    });
    text3.textColor = Color.WHITE;
    text3.font = "PixelSimple";
    text3.fontSize = 22;
    text3.setHAlign("center");
    text3.setVAlign("center");

    let authors = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
      position: new Vec2(size.x, size.y + 100),
      text: "Presented by Sabrinna K, Zijun W, and Yaseen M",
    });
    authors.textColor = Color.WHITE;
    authors.font = "PixelSimple";
    authors.fontSize = 22;
    authors.setHAlign("center");
    authors.setVAlign("center");

    // Scene has started, so start playing music
    this.emitter.fireEvent(GameEventType.PLAY_SOUND, {
      key: "menu",
      loop: true,
      holdReference: true,
    });
  }

  unloadScene(): void {
    // The scene is being destroyed, so we can stop playing the song
    this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "menu" });
  }
}
