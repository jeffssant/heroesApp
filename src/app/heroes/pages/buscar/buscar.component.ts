import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = "";

  heroes: Heroe[] = [];

  heroe!: Heroe;
  

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {

    this.heroesService.getSugerencias(this.termino.trim())
    .subscribe(heroes=> {
      if(heroes.length != 0){
        this.heroes = heroes;            
      }
      else{
        this.heroes = [];         
       }
    })
    
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    
    if(!event.option.value){
      this.heroe = event.option.value;
      return;
    }

    this.heroe = event.option.value;
    this.termino = this.heroe.superhero;
   
  }

}
