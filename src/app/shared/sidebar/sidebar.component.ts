import { Component } from '@angular/core';
import { GiftsService } from '../../gifts/services/gifts.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private giftsService: GiftsService){}

  get histories(){
    return this.giftsService.history;
  }

  searchGifts(query:string){
    this.giftsService.searchGifts(query);
  }

}
