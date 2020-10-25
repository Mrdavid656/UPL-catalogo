import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  base_path = 'https://testercontrol.000webhostapp.com/';

  constructor(private http: HttpClient) { }

  getVerificacion(){
      var url_data = 'documento.php';
      return this.http.get(this.base_path + url_data);
  }
}
