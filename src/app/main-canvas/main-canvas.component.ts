import { RENDER_FLAGS } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';



@Component({
  selector: 'app-main-canvas',
  templateUrl: './main-canvas.component.html',
  styleUrls: ['./main-canvas.component.css']
})
export class MainCanvasComponent implements OnInit {

  public sketch: p5 | null;

  //pos: number[] = new Array(2);
  reset_flag = false;
  pen_r = 5;
  black = [0,0,0];
  red = [255,0,0];
  blue = [0, 0, 255];
  pen_speed = 0;

  pen_color = this.black;

  onclick() {
    this.reset_flag = true;
  }
  
  public p5f = (p:p5) =>{
    p.setup = () =>{
      // 画面全体に表示する場合
      //p.createCanvas(p.windowWidth, p.windowHeight);
      p.createCanvas(600, 600);
      p.background(0);
    }
    p.draw = () => {
      //p.background(0);
      p.noStroke();
      p.fill(this.pen_color);
      p.circle(p.mouseX, p.mouseY, this.pen_r);
      
      this.pen_speed = Math.sqrt(Math.pow(Math.abs(p.mouseX - p.pmouseX), 2) + Math.pow(Math.abs(p.mouseY - p.pmouseY), 2));
      if (this.pen_speed > 50) {
        this.pen_speed = 50;
      }
      
      //console.log(Math.abs(p.mouseX - p.pmouseX) < 2 && Math.abs(p.mouseY - p.pmouseY) < 2);
      
      console.log(this.pen_r);
      //console.log(this.pen_color);
      
      this.pen_color = [this.pen_speed / 50 * 255, 0, (1 - this.pen_speed / 50) * 255];

      if (this.pen_speed <= 5) {
        if (this.pen_r > 5) {
          this.pen_r -= 2;
        } else { }
      } else {
        this.pen_r += 2;
      }     


      if (this.reset_flag==true) {
        p.background(0);
        this.reset_flag = false;
        this.pen_r = 5;
      }
    }
  }
  constructor() {
    this.sketch = null;
  }

  ngOnInit(): void {
    const canvasElm = document.getElementById('mainCanvas') || undefined;
    this.sketch = new p5(this.p5f,canvasElm) ;
  }

}

