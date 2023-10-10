// import Phaser from "phaser"
import { useCallback, useEffect, useRef } from "react"

// import Canvas from "./components/Canvas/Canvas"

// const GameComp = () => {
//   const gameRef = useRef<any>();

//   useEffect(() => {
//     const preload = () => {
      
//       console.log(this);

//       if (this) {
//         // this.load.image("shark", "/sharkHunt/shark.png");
//       }
//     }

//     const create = () => {
//       console.log(this);

      
//       if (this) {
//         // this.add.image(100, 200, "shark");
//       }
//     }
//     const config: Phaser.Types.Core.GameConfig = {
//       type: Phaser.AUTO as any,
//       width: "400px",
//       height: "400px",
//       parent: 'phaser-container',
//       backgroundColor: '#93cbee',
//       pixelArt: true, // Prevent pixel art from becoming blurred when scaled.
//       physics: {
//         default: 'arcade',
//         arcade: {
//           gravity: { y: 300 },
//           debug: false
//         }
//       },
//       autoFocus: true,
//       scene: {
//         preload: preload,
//         create: create
//       }
//     }

//     gameRef.current = new Phaser.Game(config);
//   }, [])

//   return (
//     <div id="phaser-container" />
//   )
// }

// export default GameComp;
import React, { useState } from "react";
import Phaser from "phaser";

interface Fish {
  x: number;
  y: number;
  sprite: Phaser.GameObjects.Sprite;
}

const Game: React.FC = () => {
  const gameRef = useRef<any>();

  const [shark, setShark] = useState<any | null>(null);
  const [fish, setFish] = useState<Fish[]>([]);

  useEffect(() => {
      class Example extends Phaser.Scene {
        constructor(){
          super()
        }
          preload = () => {
            this.load.image("shark", "./sharkHunt/shark.png");
          }
          create = () => {
            const sharkl = this.add.sprite(100, 100, "shark").setScale(0.1);
            sharkl.anims.create({
              key: 'left',
              frameRate: 10,
              repeat: -1,
              duration: 1
          });
          console.log({sharkl});
          
          setShark(sharkl);

          }
          update = () => {
            if (shark && gameRef.current) {
              shark.sprite.x += (fish[0].x - shark.x) / 10;
              shark.sprite.y += (fish[0].y - shark.y) / 10;
            }
          }
      }


      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "phaser-container",
        backgroundColor: "blue",
        scene: Example
      });

       
  }, []);

  useEffect(() => {
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if(e.key === "1") {
        console.log("here 1");
        console.log({shark});
        
        shark.anims.play("left")
      }
     })
  }, [shark])

  return (
    <div>
      <h1>Shark Game</h1>
      <div id="phaser-container" />
    </div>
  );
};

export default Game;