import { Routes } from '@angular/router';
import { AddParfum } from './add-parfum/add-parfum';
import { Parfums } from './parfums/parfums';
import { UpdateParfum } from './update-parfum/update-parfum';
import { RechercheParGenre } from './recherche-par-genre/recherche-par-genre';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { parfumGuard } from './parfum-guard';

export const routes: Routes = [
    {path: "parfums", component :Parfums},
    {path: "add-parfum", component : AddParfum,canActivate:[parfumGuard]},
    {path : "updateParfum/:id",component:UpdateParfum},
    {path : "rechercheParGenre",component:RechercheParGenre},
    {path : "rechercheParNom",component:RechercheParNom} ,
    {path: 'login', component: Login},
    {path: 'app-forbidden', component: Forbidden},
    {path: "", redirectTo: "parfums", pathMatch: "full"}

];
