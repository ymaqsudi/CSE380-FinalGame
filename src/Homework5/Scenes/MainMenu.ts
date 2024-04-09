import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { TweenableProperties } from "../../Wolfie2D/Nodes/GameNode";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import { EaseFunctionType } from "../../Wolfie2D/Utils/EaseFunctions";
import { HW5_Events } from "../hw5_enums";
import MenuScene from "./MenuScene";
import AboutScene from "./about";
import ControlsScene from "./controls";
import LevelSelect from "./level-select";

export default class MainMenu extends MenuScene {
  animatedSprite: AnimatedSprite;

  startScene(): void {
    super.startScene();
    this.addLayer("MainUI", 2);
    let background = this.add.sprite("introBackground", "Main");

    // Center the viewport
    let size = this.viewport.getHalfSize();
    this.viewport.setFocus(size);
    this.viewport.setZoomLevel(1);

    // Display background image
    background.position.set(size.x, size.y);
    background.scale.set(
      (this.viewport.getHalfSize().x / background.size.x) * 2,
      (this.viewport.getHalfSize().y / background.size.y) * 2
    );

    // Main Title Label
    let title = <Label>(
      this.add.uiElement(UIElementType.LABEL, "MainUI", {
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
      this.add.uiElement(UIElementType.LABEL, "MainUI", {
        position: new Vec2(size.x, size.y - 150),
        text: "there will be a rainbow",
      })
    );
    subtitle.textColor = Color.WHITE;
    subtitle.font = "PixelSimple";
    subtitle.fontSize = 24;
    subtitle.setHAlign("center");
    subtitle.setVAlign("center");

    // Create a play button
    let playBtn = <Button>(
      this.add.uiElement(UIElementType.BUTTON, "MainUI", {
        position: new Vec2(size.x, size.y),
        text: "play",
      })
    );
    playBtn.backgroundColor = Color.TRANSPARENT;
    playBtn.borderColor = Color.WHITE;
    playBtn.borderRadius = 0;
    playBtn.setPadding(new Vec2(50, 10));
    playBtn.font = "PixelSimple";
    playBtn.onEnter = () => {playBtn.backgroundColor = new Color(255, 255, 255, 0.2);}

    // Create about button
    let aboutBtn = <Button>(
      this.add.uiElement(UIElementType.BUTTON, "MainUI", {
        position: new Vec2(size.x, size.y + 100),
        text: "about",
      })
    );
    aboutBtn.backgroundColor = Color.TRANSPARENT;
    aboutBtn.borderColor = Color.WHITE;
    aboutBtn.borderRadius = 0;
    aboutBtn.setPadding(new Vec2(50, 10));
    aboutBtn.font = "PixelSimple";
    aboutBtn.onEnter = () => {aboutBtn.backgroundColor = new Color(255, 255, 255, 0.2);}

    // Create controls button
    let controlsBtn = <Button>(
      this.add.uiElement(UIElementType.BUTTON, "MainUI", {
        position: new Vec2(size.x, size.y + 200),
        text: "controls",
      })
    );
    controlsBtn.backgroundColor = Color.TRANSPARENT;
    controlsBtn.borderColor = Color.WHITE;
    controlsBtn.borderRadius = 0;
    controlsBtn.setPadding(new Vec2(50, 10));
    controlsBtn.font = "PixelSimple";
    controlsBtn.onEnter = () => {controlsBtn.backgroundColor = new Color(255, 255, 255, 0.2);}

    // When the play button is clicked, go to the next scene
    playBtn.onClick = () => {
      let sceneOptions = {
        // scene options maybe
      };
      //this.sceneManager.changeToScene(LevelSelect);
      this.MenuTransitionScreen.tweens.play("fadeIn");
      let selectTimer = new Timer(500, () => {
        this.sceneManager.changeToScene(LevelSelect);
      });
      selectTimer.start();
    };

    aboutBtn.onClick = () => {
      //this.sceneManager.changeToScene(AboutScene);
      this.MenuTransitionScreen.tweens.play("fadeIn");
      let aboutTimer = new Timer(500, () => {
        this.sceneManager.changeToScene(AboutScene);
      });
      aboutTimer.start();
    };

    controlsBtn.onClick = () => {
      //this.sceneManager.changeToScene(ControlsScene);
      this.MenuTransitionScreen.tweens.play("fadeIn");
      let controlsTimer = new Timer(500, () => {
        this.sceneManager.changeToScene(ControlsScene);
      });
      controlsTimer.start();
    };

  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }
}
