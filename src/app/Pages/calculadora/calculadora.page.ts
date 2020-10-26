import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.page.html',
  styleUrls: ['./calculadora.page.scss'],
})
export class CalculadoraPage implements OnInit {

  valor1: number;
  valor2: number;
  res: number = 0;

  constructor() { }

  ngOnInit() {
  }

  calcular(){
    if(this.valor1 > 0 && this.valor2 > 0){
      this.res = this.valor1 * this.valor2; 
    }else{
      console.log("No se puede calcular");
    }
  }

}
