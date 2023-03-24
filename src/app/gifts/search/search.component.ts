import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  constructor(private giftsService: GiftsService) { }

  // El símbolo ! indica que es Non-null assertion operator, es decir, que siempre va a existir esa etiqueta en el elemento.
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(): void {
    const valor = this.txtBuscar.nativeElement.value;

    this.giftsService.searchGifts(valor);

    //Para reiniciar el buscador
    this.txtBuscar.nativeElement.value = '';
  }
}
