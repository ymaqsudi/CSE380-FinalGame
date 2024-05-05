import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import Input from "../../Wolfie2D/Input/Input";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";
import MenuScene from "./MenuScene";

export default class firstScene extends MenuScene {
  animatedSprite: AnimatedSprite;

  loadScene(): void {
    // Load the bg image
    this.load.image("introBackground", "hw5_assets/img/bg.jpeg");

    // Load the menu song
    this.load.audio("menu", "hw5_assets/music/game-soundtrack.mp3");
  }

  startScene(): void {
    super.startScene();

    this.addLayer("MainUI", 2);

    // Center the viewport
    let size = this.viewport.getHalfSize();
    this.viewport.setFocus(size);
    this.viewport.setZoomLevel(1);

    // Display background image
    let background = this.add.sprite("introBackground", "Main");
    background.position.set(size.x, size.y);
    background.scale.set(
      (this.viewport.getHalfSize().x / background.size.x) * 2,
      (this.viewport.getHalfSize().y / background.size.y) * 2
    );

    // Label for Title
    let title = <Label>this.add.uiElement(UIElementType.LABEL, "MainUI", {
      position: new Vec2(size.x, size.y - 200),
      text: "Eritque Arcus",
    });
    title.textColor = Color.WHITE;
    title.font = "PixelSimple";
    title.fontSize = 64;
    title.setHAlign("center");
    title.setVAlign("center");


    // Label for click anywhere text
    let continueText = <Label>this.add.uiElement(UIElementType.LABEL, "MainUI", {
      position: new Vec2(size.x, this.viewport.getHalfSize().y * 2 - 120),
      text: "click anywhere to continue",
    });
    continueText.textColor = Color.WHITE;
    continueText.font = "PixelSimple";
    continueText.fontSize = 24;
    continueText.setHAlign("center");
    continueText.setVAlign("center");


    // Scene has started, so start playing music
    this.emitter.fireEvent(GameEventType.PLAY_SOUND, {key: "menu", loop: true, holdReference: true});
  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);

    // Check for mouse click to continue
    if (Input.isMouseJustPressed()) {
      this.MenuTransitionScreen.tweens.play("fadeIn");
      let mainTimer = new Timer(500, () => {
        this.sceneManager.changeToScene(MainMenu, {}, {progress: 0});
      });
      mainTimer.start();
    }
}

  unloadScene(): void {
    // The scene is being destroyed, so we can stop playing the song
    // this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "menu" });
    this.load.keepImage("introBackground");
  }
}
