import { useEffect, useRef } from "react";

const Canvas = () => {
  const canvasRef = useRef<any>();
  const canvasCont = useRef<any>();
  const gameArea = useRef<any>();
  const element = useRef<any>();

  class Component {
    constructor(width, height, color, x, y, type) {
      this.type = type;
      if (type == "image") {
        this.image = new Image();
        this.image.src = color;        
      }
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.color = color;
    }

    public move(x, y) {
      const ctx = gameArea.current.context;
      ctx.clearRect(this.x, this.y, this.width, this.height);
      if(x){
        this.previousX = this.x;
        this.x += x;
      }
      if(y){
        this.previousY = this.y;
        this.y += y;
      }
      console.log(this.x, this.y);
      
      this.update();
      ctx.translate(this.x, this.y);
      ctx.rotate(45);
      ctx.save();
      ctx.restore();
       
    }

    public update() {
      console.log(this.x, this.y);
      const ctx = gameArea.current.context;
      if (this.type == "image") {
        ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width,
           this.height);
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      // ctx.save();
    }
  }
  useEffect(() => {
    document.addEventListener("keypress", (e:KeyboardEvent) => {
      console.log(`pressed key ${e.key}`);
      if(e.key === "d") {
        element.current.move(2, null);
      }
      if(e.key === "a") {
        element.current.move(-2, null);
      }
      if(e.key === "w") {
        element.current.move(null, -2);
      }
      if(e.key === "s") {
        element.current.move(null, 2);
      }
    })
    gameArea.current = {
      canvas: canvasRef.current,
      start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.canvas.style.border = "2px solid white";
        this.context = this.canvas.getContext("2d");
        canvasCont.current.appendChild(this.canvas);
      }
    }
    gameArea.current.start();
    element.current = new Component(80, 80, "/sharkHunt/shark.png", 10, 120, "image");

    setTimeout(() => {
      element.current.update();

    }, 200)
  }, [])

  return (
    <div ref={canvasCont} style={{
      paddingTop: "70px"
    }}>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default Canvas;