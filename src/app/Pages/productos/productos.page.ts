import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {


  products: any[];

  automaticClose = false;

  sliderConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.3
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('assets/productos.json').subscribe(
      res => {
        this.products = res['Categorias'];


      }
    )
  }

  toggleSelection(index){
    this.products[index].open = !this.products[index].open;

    
    if(this.automaticClose && this.products[index].open){
      this.products.filter((item, itemIndex) => itemIndex != index).map(item => item.open = false);
    }
  }

  toggleItem(index, childIndex){
    this.products[index].productos[childIndex].open = !this.products[index].productos[childIndex].open;

  }

}
