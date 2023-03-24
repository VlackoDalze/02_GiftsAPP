import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGiftsResponse, Gift } from '../interfaces/gift.interface';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  private _urlGiphyService = 'https://api.giphy.com/v1/gifs';
  private _api_keys: string = 'dYM4jYD8BedQxb8lhB8H6MVDboUH3PH7';
  private _limitSearch: number = 10;

  private _searchHistory: string[] = [];
  //Storage Key
  private _giftHistoryStorageKey: string = 'giftHistory';
  private _resultsKey: string = 'giftResults';

  public results: Gift[] = [];

  get history(): string[] {
    return [...this._searchHistory];
  }

  //Se ejecuta una vez sin importar la cantidad 
  constructor(private http: HttpClient) {
    // if (localStorage.getItem(this._giftHistoryStorageKey)) {
    //   this._history = JSON.parse(localStorage.getItem(this._giftHistoryStorageKey)!);
    // }
    this._searchHistory = JSON.parse(localStorage.getItem(this._giftHistoryStorageKey)!) || [];
    this.results = JSON.parse(localStorage.getItem(this._resultsKey)!) || [];
  }

  searchGifts(query: string) {

    query = query.trim().toLowerCase();

    if (!this._searchHistory.includes(query) && query.trim().length > 0) {
      this._searchHistory.unshift(query);
      //Corta el array desde 0 al 10, es decir, que pone como máximo 10 elementos. 
      this._searchHistory = this._searchHistory.splice(0, 10);

      localStorage.setItem(this._giftHistoryStorageKey, JSON.stringify(this._searchHistory));
    }

    const params = new HttpParams()
      .set('api_key', this._api_keys)
      .set('limit', this._limitSearch)
      .set('q', query);

    this.http.get<SearchGiftsResponse>(`${this._urlGiphyService}/search`, { params })
      .subscribe(resp => {
        this.results = resp.data;
        //Almaceno el primer resultado en un localStorage.
        localStorage.setItem(this._resultsKey, JSON.stringify(this.results));
      })
  }





}
