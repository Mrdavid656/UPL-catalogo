import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ControlService } from '../../services/control.service';
import { Info } from '../../model/info';
import { Storage } from '@ionic/storage';
import { NetworkServiceService } from '../../services/network-service.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  infoData: Info = {info: '', permiso: ''};
  connection: string = '';
  
  acceso: boolean = false;
  isConnected = false;
  
  constructor(public control: ControlService, public storage: Storage, public alertController: AlertController, 
    public navCtrl: NavController, private networkService: NetworkServiceService) { 
    
      this.storage.length().then((length) => {
        if(length == 0){
          this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
            this.isConnected = connected;
            if (!this.isConnected && length == 0) {
              console.log('Por favor enciende tu conexión a Internet');
              if(this.validar() == true){
                console.log(this.validar() + "ENTRO A TRUE EN VALIDAR");
                this.navCtrl.navigateForward(['/noauth']);
              }
            }else{            
              this.control.getVerificacion().subscribe((response) => {
                this.infoData.info = response['info'];
                this.infoData.permiso = response['permiso'];
                console.log(this.infoData.info);
                console.log(this.infoData.permiso);
                this.storage.clear();
                if(this.infoData.permiso == 'Conectado'){
                  this.storage.set("KEY", "ADMIN1234");
                }else{
                  if(this.validar() == true){
                    this.navCtrl.navigateForward(['/noauth']);
                  }
                }
              });
            }
          });
        }else{
          console.log("Encontro una llave");
          this.storage.get("KEY").then((data) => {
            this.connection = data;
            if(this.connection == 'ADMIN1234'){
              console.log("Esta conectado...");
            }else{
              this.navCtrl.navigateForward(['/noauth']);
            }
          });
        }
      });
  }

  ngOnInit() {
  }

  validar(): boolean{
    this.storage.get("KEY").then((data) => {
      if(data == 'ADMIN1234'){
        console.log("ENCONTRO TRUE");
        return false;
      }else{
        console.log("NO ENCONTRO FALSE");
        return true;
      }
    });
    return true;
  }

  ngOnViewDidEnter(){
    this.storage.length().then((length) => {
      if(length == 0){
        this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
          this.isConnected = connected;
          if (!this.isConnected) {
            console.log('Por favor enciende tu conexión a Internet');
            this.navCtrl.navigateForward(['/noauth']);
          }else{            
            this.control.getVerificacion().subscribe((response) => {
              this.infoData.info = response['info'];
              this.infoData.permiso = response['permiso'];
              console.log(this.infoData.info);
              console.log(this.infoData.permiso);
              if(this.infoData.permiso == 'Conectado'){
                this.storage.set("KEY", "ADMIN1234");
              }else{
                this.navCtrl.navigateForward(['/noauth']);
              }
            });
          }
        });
      }else{
        console.log("Encontro una llave");
        this.storage.get("KEY").then((data) => {
          this.connection = data;
          if(this.connection == 'Conectado'){
            console.log("Esta conectado...");
          }else{
            this.navCtrl.navigateForward(['/noauth']);
          }
        });
      }
    });
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Acceso Denegado',
      subHeader: 'AppControl',
      message: 'No tiene autorización para ver el contenido de este producto.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
