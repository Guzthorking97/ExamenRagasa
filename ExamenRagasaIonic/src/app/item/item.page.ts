import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { ItemModel } from '../models/todoitem.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})

export class ItemPage implements OnInit {

  elemento: ItemModel;
  editar:any;

  constructor( private dataService: DataService,
    private navCtrl: NavController) { }

  ngOnInit() {
    this.elemento = this.dataService.getElemento();
    console.log(this.elemento._id);
    this.editar = this.dataService.getEditar();
    if(this.elemento === undefined && this.editar){
      this.navCtrl.navigateRoot('/home');
    }  
  }

  eliminarTodoItem(){
    this.dataService.delete(this.elemento._id).subscribe( items => {
      this.navCtrl.navigateRoot('/home');
    });
  }

  saveTodoItem(){
    const data = {
      titulo: this.elemento.titulo,
      detalle: this.elemento.detalle,
      completada: this.elemento.completada
    };
    if(this.editar){
      this.dataService.update(this.elemento._id, data).subscribe( items => {
        this.navCtrl.navigateRoot('/home');
      });
    }else{
      this.dataService.create(data).subscribe( items => {
        this.navCtrl.navigateRoot('/home');
      });
    }
  }
}
