import { Component } from '@angular/core';
import { GiftsService } from '../services/gifts.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent {
  constructor(private giftsService: GiftsService){}

  get results(){
    return this.giftsService.results;
  }

}
