import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../../Cocktail';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CocktailServerService } from 'src/app/services/cocktail-server.service';

@Component({
  selector: 'app-add-cocktail',
  templateUrl: './add-cocktail.component.html',
  styleUrls: ['./add-cocktail.component.css'],
})
export class AddCocktailComponent implements OnInit {
  
  faXmark = faXmark;
  name!: string;
  author!: string;
  ingredients: string[] = [];
  description!: string;
  image!: string;
  alcohol!: boolean;

  constructor(private cocktailServer: CocktailServerService) {}

  ngOnInit(): void {
    console.log('init');
  }

  addTag(e: any) {
    console.log(e);
    if (e.key == 'Enter') {
      let tag: string = e.target.value.replace(/\s+/g, ' ');
      if (tag.length > 1 && !this.ingredients.includes(tag)) {
        tag.split(',').forEach((tag) => {
          this.ingredients.push(tag);
        });
      }

    } else return;
    e.target.value = '';
  }

  onSubmit() {
    const newCocktail = {
      name: this.name,
      author: this.author,
      ingredients: this.ingredients,
      description: this.description,
      image: this.image,
      alcohol: this.alcohol
    };
    this.cocktailServer.addCocktail(newCocktail).subscribe();
    console.log(newCocktail);

    this.name = ''
    this.author = '';
    this.ingredients = [];
    this.description = '';
    this.image = '';
    this.alcohol = true;
  }

  remove(tag: string) {
    let index = this.ingredients.indexOf(tag);
    this.ingredients = [
      ...this.ingredients.slice(0, index),
      ...this.ingredients.slice(index + 1),
    ];
    console.log(this.ingredients);
  }

  removeAll() {
    this.ingredients.length = 0;
    const ingredientTags = document.querySelectorAll('.ingredient-tags');
    ingredientTags.forEach((ingredientTags) => ingredientTags.remove());
  }
}
