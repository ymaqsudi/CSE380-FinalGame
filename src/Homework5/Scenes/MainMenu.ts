import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import LevelSelect from "./level-select";
import AboutScene from "./about";
import ControlsScene from "./controls";

export default class MainMenu extends Scene {
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

    // Display background image
    let background = this.add.sprite("introBackground", "Main");
    background.position.set(size.x, size.y);
    background.scale.set(
      (this.viewport.getHalfSize().x / background.size.x) * 2,
      (this.viewport.getHalfSize().y / background.size.y) * 2
    );

    // Main Title Label
    let title = <Label>(
      this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x, size.y - 200),
        text: "ERITQUE ARCUS",
      })
    );
    title.textColor = Color.WHITE;
    title.font = "PixelSimple";
    title.fontSize = 48;
    title.setHAlign("center");
    title.setVAlign("center");

    // Subtitle Label
    let subtitle = <Label>(
      this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x, size.y - 150),
        text: "there will be a rainbow",
      })
    );
    subtitle.textColor = Color.WHITE;
    subtitle.font = "PixelSimple";
    subtitle.fontSize = 18;
    subtitle.setHAlign("center");
    subtitle.setVAlign("center");

    // Create a play button
    let playBtn = <Button>(
      this.add.uiElement(UIElementType.BUTTON, "Main", {
        position: new Vec2(size.x, size.y),
        text: "play",
      })
    );
    playBtn.backgroundColor = Color.TRANSPARENT;
    playBtn.borderColor = Color.WHITE;
    playBtn.borderRadius = 0;
    playBtn.setPadding(new Vec2(50, 10));
    playBtn.font = "PixelSimple";

    // Create about button
    let aboutBtn = <Button>(
      this.add.uiElement(UIElementType.BUTTON, "Main", {
        position: new Vec2(size.x, size.y + 100),
        text: "about",
      })
    );
    aboutBtn.backgroundColor = Color.TRANSPARENT;
    aboutBtn.borderColor = Color.WHITE;
    aboutBtn.borderRadius = 0;
    aboutBtn.setPadding(new Vec2(50, 10));
    aboutBtn.font = "PixelSimple";

    // Create controls button
    let controlsBtn = <Button>(
      this.add.uiElement(UIElementType.BUTTON, "Main", {
        position: new Vec2(size.x, size.y + 200),
        text: "controls",
      })
    );
    controlsBtn.backgroundColor = Color.TRANSPARENT;
    controlsBtn.borderColor = Color.WHITE;
    controlsBtn.borderRadius = 0;
    controlsBtn.setPadding(new Vec2(50, 10));
    controlsBtn.font = "PixelSimple";

    // When the play button is clicked, go to the next scene
    playBtn.onClick = () => {
      let sceneOptions = {
        // scene options maybe
      };
      this.sceneManager.changeToScene(LevelSelect, {}, sceneOptions);
    };

    aboutBtn.onClick = () => {
      this.sceneManager.changeToScene(AboutScene, {}, {});
    };

    controlsBtn.onClick = () => {
      this.sceneManager.changeToScene(ControlsScene, {}, {});
    };

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
