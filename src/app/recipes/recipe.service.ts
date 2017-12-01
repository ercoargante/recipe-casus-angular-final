import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
// Deze import is toegevoegd om http responses te kunnen verwerken
import 'rxjs/add/operator/map';
// Einde toevoeging
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl; // URL to web api
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: Http) {
    //
    // Call toegevoegd om te zorgen dat bij reboot alle recipes worden gelezen.
    //
    this.readRecipes();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  //
  // Deze method is toegevoegd.
  // Bij initialisatie van de component lees je alle recipes uit de db.
  //
  private readRecipes() {
    this.http.get(this.serverUrl + '/recipes')
      .map((response: Response) => {
        console.log('map');
        const recipes: Recipe[] = response.json();
        return recipes;
      })
      .subscribe((recipes: Recipe[]) => {
        console.log('subscribe');
        this.recipes = recipes;
        console.dir(this.recipes);
        this.recipesChanged.next(this.recipes.slice());
      });
  }
  // Einde toevoeging.

  getRecipe(index: number) {
    console.log('getRecipe[index]');
    console.dir(this.recipes[index]);
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    // Oorspronkelijke code
    // this.recipes.push(recipe);
    // this.recipesChanged.next(this.recipes.slice());

    // Toegevoegde code
    console.log('addRecipe');
    console.dir(recipe);
    this.http.post(this.serverUrl + '/recipes/', recipe)
      .map(response => response.json() as Recipe)
      .subscribe(result => {
        this.recipes.push(result as Recipe);
        this.recipesChanged.next(this.recipes.slice());
      });
    // Einde toegevoegde code

  }

  updateRecipe(index: number, newRecipe: Recipe) {
    // Oorspronkelijke code
    // this.recipes[index] = newRecipe;
    // this.recipesChanged.next(this.recipes.slice());

    // Toegevoegde code
    console.log('updateRecipe');
    console.dir(newRecipe);
    console.log(this.recipes[index]._id);
    return this.http.put(this.serverUrl + '/recipes/' + this.recipes[index]._id, newRecipe)
      .map((response: Response) => {
        const recipe: Recipe = response.json();
        console.log('map');
        console.dir(recipe as Recipe);
        return recipe;
      })
      .subscribe((recipe) => {
        console.log('subscribe');
        console.dir(recipe as Recipe);
        this.recipes[index] = recipe as Recipe;
        this.recipesChanged.next(this.recipes.slice());
      });
    // Einde toegevoegde code
  }

  deleteRecipe(index: number) {
    // Oorspronkelijke code
    // this.recipes.splice(index, 1);
    // this.recipesChanged.next(this.recipes.slice());

    // Toegevoegde code
    console.log('deleteRecipe ' + this.recipes[index]._id);
    this.http.delete(this.serverUrl + '/recipes/' + this.recipes[index]._id)
      .map(response => response.json() as Recipe)
      .subscribe(recipe => {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      });
    // Einde toegevoegde code
  }
}
