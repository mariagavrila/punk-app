import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Recipe } from '../model/recipe';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  recipeCache = new Map();

  constructor(private httpClient: HttpClient) {}

  public getRecipes(query: string): Observable<any> {
    let url =
      query === ''
        ? `${environment.serviceUrl}beers`
        : `${environment.serviceUrl}beers?food=${query}`;

    return this.httpClient.get<any>(url);
  }
}
