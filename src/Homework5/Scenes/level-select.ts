import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Scene from "../../Wolfie2D/Scene/Scene";
import Color from "../../Wolfie2D/Utils/Color";
import MainMenu from "./MainMenu";
import Level1 from "./Level1";

export default class LevelSelect extends Scene {
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
      backButton.backgroundColor = Color.RED;
      backButton.textColor = Color.WHITE;
      backButton.font = "PixelSimple";
      backButton.fontSize = 24;
      backButton.size.set(100, 50); // Set the size of the back button
      backButton.borderRadius = 5;
  
      backButton.onClick = () => {
          this.sceneManager.changeToScene(MainMenu, {}, {});
      };

    // Variables to help align everything
    let center = this.viewport.getCenter();
    let boxWidth = 150;
    let boxHeight = 100;
    let spacing = 200; // horizontal spacing between each box
    let yOffset = -50; // vertical offset from center for the top row
    let labelOffset = 60; // vertical offset from center of box to the label

    let LevelNames = [
      "Level 1",
      "Level 2",
      "Level 3",
      "Level 4",
      "Level 5",
      "Level 6",
    ];

    // Main Title Label
    let title = <Label>(
      this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(size.x, size.y - 200),
        text: "SELECT LEVEL",
      })
    );
    title.textColor = Color.WHITE;
    title.font = "PixelSimple";
    title.fontSize = 48;
    title.setHAlign("center");
    title.setVAlign("center");

    

    // Calculate starting pos for first box in top row
    let startX = center.x - spacing;
    let startY = center.y + yOffset;

    for (let i = 0; i < 6; i++) {
      // Calculate position for each box
      let posX = startX + (i % 3) * spacing; // Move each box to the right
      let posY = startY + Math.floor(i / 3) * (boxHeight + labelOffset * 1.5); // Adjusted calculation for posY

      // Create button for level
      let levelBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {
        position: new Vec2(posX, posY),
        text: "",
        size: new Vec2(boxWidth, boxHeight),
      });
      levelBtn.backgroundColor = Color.GREEN;
      levelBtn.borderColor = Color.WHITE;
      levelBtn.borderRadius = 5;
      levelBtn.setPadding(new Vec2(50, 10));

      // Create label for the level
      let levelLabel = <Label>this.add.uiElement(UIElementType.LABEL, "Main", {
        position: new Vec2(posX, posY + boxHeight / 2 + labelOffset / 2), // Adjusted to place labels below boxes
        text: LevelNames[i],
      });
      levelLabel.textColor = Color.WHITE;
      levelLabel.font = "PixelSimple";
      levelLabel.fontSize = 24;
      levelLabel.setHAlign("center");
      levelLabel.setVAlign("center");

      // set up scene options
      let sceneOptions = {
        physics: {
            groupNames: ["ground", "player", "balloon"],
            collisions:
            [
                [0, 1, 1],
                [1, 0, 0],
                [1, 0, 0]
            ]
        }
    }

      // Fill out click events
      levelBtn.onClick = () => {
        console.log(LevelNames[i] + " clicked");
        // Implement scene change
        // for testing
        this.sceneManager.changeToScene(Level1, {}, sceneOptions);
      };
    }

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
