import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cocktail } from '../../../Cocktail';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cocktail-modal',
  templateUrl: './cocktail-modal.component.html',
  styleUrls: ['./cocktail-modal.component.css'],
})
export class CocktailModalComponent implements OnInit {
  faXmark = faXmark;
  name!: string;
  author!: string;
  ingredients!: string[];
  description!: string;
  image!: string;
  alcohol!: boolean;
  @Input() clonedCocktail!: Cocktail;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  
}
