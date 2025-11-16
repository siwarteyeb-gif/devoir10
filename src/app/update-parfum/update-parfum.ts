import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParfumService } from '../services/parfum.service';
import { Parfum } from '../model/parfum.model';
import { Genre } from '../model/genre.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-parfum',
  imports: [FormsModule, CommonModule],
  templateUrl: './update-parfum.html',
  styles: ``
})
export class UpdateParfum implements OnInit {

  currentParfum = new Parfum();
  genres!: Genre[];
  updatedGenId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private parfumService: ParfumService
  ) {}

  ngOnInit(): void {
    // Charger la liste des genres
    this.genres = this.parfumService.listeGenres();

    // Charger le parfum à modifier
    this.currentParfum = this.parfumService.consulterParfum(
      this.activatedRoute.snapshot.params['id']
    );

    // Initialiser l'id du genre sélectionné
    this.updatedGenId = this.currentParfum.genre.idGen;
  }

  updateParfum() {
    // Mettre à jour le genre du parfum
    this.currentParfum.genre = this.parfumService.consulterGenre(this.updatedGenId);

    
    this.parfumService.updateParfum(this.currentParfum);

 
    this.router.navigate(['parfums']); // ou [''] si ton home est vide
  }
}
