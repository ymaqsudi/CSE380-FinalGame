import Vec2 from "../../Wolfie2D/DataTypes/Vec2";
import { GameEventType } from "../../Wolfie2D/Events/GameEventType";
import { GraphicType } from "../../Wolfie2D/Nodes/Graphics/GraphicTypes";
import Rect from "../../Wolfie2D/Nodes/Graphics/Rect";
import AnimatedSprite from "../../Wolfie2D/Nodes/Sprites/AnimatedSprite";
import Button from "../../Wolfie2D/Nodes/UIElements/Button";
import Label from "../../Wolfie2D/Nodes/UIElements/Label";
import { UIElementType } from "../../Wolfie2D/Nodes/UIElements/UIElementTypes";
import Timer from "../../Wolfie2D/Timing/Timer";
import Color from "../../Wolfie2D/Utils/Color";
import Level1 from "./Level1";
import Level2 from "./Level2";
import Level3 from "./Level3";
import Level4 from "./Level4";
import Level5 from "./Level5";
import Level6 from "./Level6";
import MenuScene from "./MenuScene";

export default class LevelSelect extends MenuScene {
  animatedSprite: AnimatedSprite;

  loadScene(): void {
    this.load.audio("level_complete", "hw5_assets/music/victory.mp3");
    this.load.image("introBackground_complete", "hw5_assets/img/complete_background.jpg");
  }

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

    for (let i = 0; i < (this.progress === 6 ? 6 : this.progress + 1); i++) {
      // Calculate position for each box
      let posX = startX + (i % 3) * spacing; // Move each box to the right
      let posY = startY + Math.floor(i / 3) * (boxHeight + labelOffset * 1.5); // Adjusted calculation for posY

      // Create button for level
      let levelBtn = <Button>this.add.uiElement(UIElementType.BUTTON, "Main", {
        position: new Vec2(posX, posY),
        text: "",
        size: new Vec2(boxWidth, boxHeight),
      });
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

      switch(i) {
        case 0:
          {
            levelBtn.backgroundColor = new Color(67, 67, 67);
            break;
          }
        case 1:
          {
            levelBtn.backgroundColor = new Color(255, 0, 0);
            break;
          }
        case 2:
          {
            levelBtn.backgroundColor = new Color(255, 255, 0);
            break;
          }
        case 3:
          {
            levelBtn.backgroundColor = new Color(0, 255, 0);
            break;
          }
        case 4:
          {
            levelBtn.backgroundColor = new Color(0, 0, 255);
            break;
          }
        case 5:
          {
            levelBtn.backgroundColor = new Color(255, 0, 255);
            break;
          }
      }

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
        },
        progress: this.progress
    }


      // Fill out click events
      levelBtn.onClick = () => {
        // Implement scene change
        // for testing
        this.MenuTransitionScreen.tweens.play("fadeIn");
        switch(i) {
          case 0:
            {
              let levelStartTimer = new Timer(500, () => {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_complete" });
                this.sceneManager.changeToScene(Level1, {}, sceneOptions);
              });
              levelStartTimer.start();
              break;
            }
          case 1:
            {
              let levelStartTimer = new Timer(500, () => {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_complete" });
                this.sceneManager.changeToScene(Level2, {}, sceneOptions);
              });
              levelStartTimer.start();
              break;
            }
          case 2:
            {
              let levelStartTimer = new Timer(500, () => {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_complete" });
                this.sceneManager.changeToScene(Level3, {}, sceneOptions);
              });
              levelStartTimer.start();
              break;
            }
          case 3:
            {
              let levelStartTimer = new Timer(500, () => {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_complete" });
                this.sceneManager.changeToScene(Level4, {}, sceneOptions);
              });
              levelStartTimer.start();
              break;
            }
          case 4:
            {
              let levelStartTimer = new Timer(500, () => {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_complete" });
                this.sceneManager.changeToScene(Level5, {}, sceneOptions);
              });
              levelStartTimer.start();
              break;
            }
          case 5:
            {
              let levelStartTimer = new Timer(500, () => {
                this.emitter.fireEvent(GameEventType.STOP_SOUND, { key: "level_complete" });
                this.sceneManager.changeToScene(Level6, {}, sceneOptions);
              });
              levelStartTimer.start();
              break;
            }
        }
        
      };
    }

  }

  updateScene(deltaT: number): void {
    super.updateScene(deltaT);
  }

  unloadScene(): void {
  }
}
