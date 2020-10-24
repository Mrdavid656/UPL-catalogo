import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  arrayImg = [
    {
      img: 'assets/img/inicio/1.jpg'
    },
    {
      img: 'assets/img/inicio/2.jpg'
    }
  ]

  slideOpts = {
    initialSlide: 0,
    speed: 500,
    slidesPerView: 1,
    effect: 'flip',
    autoplay:true
   };

   @ViewChild('slides', {static:false}) slider: IonSlides;
  constructor() { }

  ngOnInit() {
  }

}
