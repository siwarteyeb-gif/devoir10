import { Component , OnInit} from '@angular/core';
import { Parfum } from '../model/parfum.model';
import { ParfumService } from '../services/parfum.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-parfums',
  imports: [CommonModule,RouterLink],
  templateUrl: './parfums.html'
})
export class Parfums implements OnInit {
  parfums : Parfum[];

  constructor(private parfumService:ParfumService,
    public authService: Auth
  ) { 
    this.parfums=this.parfumService.listeParfum();
   }
ngOnInit():void{

}
supprimerParfum(parf:Parfum){
  
  let conf=confirm("Etes-vous sur?");
  if(conf){
  this.parfumService.supprimerParfum(parf);}
}
}
