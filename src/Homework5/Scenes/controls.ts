import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";

export default class ControlsScene extends Scene {
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
