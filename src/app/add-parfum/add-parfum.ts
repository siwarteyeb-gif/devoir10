import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ParfumService } from '../services/parfum.service';
import { Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { Parfum } from '../model/parfum.model';

@Component({
  selector: 'app-add-parfum',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-parfum.html',
})
export class AddParfum implements OnInit {
  parfumForm!: FormGroup;
  genres!: Genre[];
  message = '';
  err = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private parfumService: ParfumService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.genres = this.parfumService.listeGenres();

    this.parfumForm = this.fb.group({
      idParfum: ['', Validators.required],
      marqueParfum: ['', [Validators.required, Validators.minLength(5)]],
      nomParfum: ['', [Validators.required, Validators.minLength(5)]],
      prixParfum: ['', [Validators.required,Validators.min(0)]],
      contenanceParfum: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idGen: ['', Validators.required],
    });
  }

  addParfum() {
    if (this.parfumForm.invalid) {
      this.err = '⚠️ Veuillez remplir tous les champs correctement.';
      this.parfumForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const newParfum: Parfum = {
      idParfum: this.parfumForm.value.idParfum,
      marqueParfum: this.parfumForm.value.marqueParfum,
      nomParfum: this.parfumForm.value.nomParfum,
      prixParfum: this.parfumForm.value.prixParfum,
      contenanceParfum: this.parfumForm.value.contenanceParfum,
      genre: this.parfumService.consulterGenre(this.parfumForm.value.idGen),
      email: this.parfumForm.value.email
    };

    this.parfumService.ajouterParfum(newParfum);
    this.message = `✅ Parfum "${newParfum.nomParfum}" ajouté avec succès !`;

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['parfums']);
    }, 1000);
  }
}
