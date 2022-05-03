import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  todoitems: any [] = [];

  constructor( private dataService: DataService,
              private navCtrl: NavController ) {}
 
  ionViewWillEnter(){
    this.dataService.getAll().subscribe( items => {
      console.log(items);
      this.todoitems = items;
    });
  }

  onSearchTitulo(event){
    this.dataService.findByTitle(event.detail.value).subscribe( items => {
      console.log(items);
      this.todoitems = items;
    });
  }

  onSearchCancel(){
    this.dataService.getAll().subscribe( items => {
      console.log(items);
      this.todoitems = items;
    });
  }

  eliminarTodoList(){
    this.dataService.deleteAll().subscribe( items => {
      this.onSearchCancel();
    });
  }

  addoredit(editar: any, elemento:any){
    if(editar){
      this.dataService.setElemento(elemento);
      this.dataService.setEditar(editar);
      this.navCtrl.navigateForward('/item');
    }else{
      this.dataService.setElemento({});
      this.dataService.setEditar(false);
      this.navCtrl.navigateForward('/item');}
  }
}
