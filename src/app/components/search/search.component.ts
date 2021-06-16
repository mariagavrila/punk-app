import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/model/recipe';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public search: string = '';
  recipes: Recipe[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes() {
    this.apiService.getRecipes(this.search).subscribe((response) => {
      this.recipes = response;
      console.log(this.recipes);
    });
  }
}
