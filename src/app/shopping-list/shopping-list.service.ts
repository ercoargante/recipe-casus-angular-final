import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import { Ingredient } from '../shared/ingredient.model';
import { environment } from '../../environments/environment'; // Toegevoegd

@Injectable()
export class ShoppingListService {

  // Toegevoegd voor communcitie met de server
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private serverUrl = environment.serverUrl + '/ingredients/'; // URL to web api

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [];
  // Delete this: we halen nu de Ingredients van de server.
  //  [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];

  // Toegevoegd voor Http DI en initialisatie van shoppinglist
  constructor(public http: Http) {
    this.readIngredients();
  }

  //
  // Deze method is toegevoegd.
  // Bij initialisatie van de component lees je de shoppinglist van de server.
  // Er is geen Shoppinglist model; de shoppinglist is een array van Ingredients.
  //
  private readIngredients() {
    this.http.get(this.serverUrl)
      .map((response) => {
        console.log('map');
        const ingredients = response.json() as Ingredient[];
        return ingredients;
      })
      .subscribe((ingredients: Ingredient[]) => {
        console.log('subscribe');
        this.ingredients = ingredients;
        console.dir(this.ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
      });
  }
  // Einde toevoeging.

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    // Oorspronkelijke code
    // this.ingredients.push(ingredient);
    // this.ingredientsChanged.next(this.ingredients.slice());

    // Start aanpassing
    console.log('addIngredient');
    this.http.post(this.serverUrl, ingredient)
      .map((response) => response.json() as Ingredient)
      .subscribe((result: Ingredient) => {
        console.log('subscribe');
        this.ingredients.push(result);
        console.dir(result);
        this.ingredientsChanged.next(this.ingredients.slice());
      });
    // Einde aanpassing
  }

  addIngredients(ingredients: Ingredient[]) {
    // Oorspronkelijke code
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.next(this.ingredients.slice());

    // Start aanpassing
    console.log('addIngredients');
    this.http.post(this.serverUrl, ingredients)
      .map((response) => response.json() as Ingredient[])
      .subscribe((result: Ingredient[]) => {
        console.log('subscribe');
        this.ingredients.push(...result);
        console.dir(result);
        this.ingredientsChanged.next(this.ingredients.slice());
      });
    // Einde aanpassing
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    // Oorspronkelijke code
    // this.ingredients[index] = newIngredient;
    // this.ingredientsChanged.next(this.ingredients.slice());

    // Toegevoegde code
    console.log('updateIngredient');
    console.dir(newIngredient);
    console.log(this.ingredients[index]._id);
    // Hier zou je moeten checken dat _id bestaat. Is alleen aanwezig op ingredients uit database.
    newIngredient._id = this.ingredients[index]._id;
    return this.http.put(this.serverUrl + this.ingredients[index]._id, newIngredient)
      .map((response: Response) => {
        console.log('map');
        // We krijgen een array van resultaten. Er is echter maar 1 resultaat.
        const ingredient = response.json();
        return ingredient;
      })
      .subscribe((ingredient) => {
        console.log('subscribe');
        console.dir(ingredient as Ingredient);
        this.ingredients[index] = ingredient as Ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      });
    // Einde toegevoegde code
  }

  deleteIngredient(index: number) {
    // Oorspronkelijke code
    // this.ingredients.splice(index, 1);
    // this.ingredientsChanged.next(this.ingredients.slice());

    // Start aanpassing
    console.log('deleteIngredient');
    this.http.delete(this.serverUrl + this.ingredients[index]._id)
      .map((response) => response.json() as Ingredient)
      .subscribe((result: Ingredient) => {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      });
    // Einde aanpassing
  }
}
