import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Cocktail } from '../../../Cocktail';
import { CocktailServerService } from '../../../services/cocktail-server.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CocktailModalComponent } from '../cocktail-modal/cocktail-modal.component';
import { catchError, NEVER, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css'],
})
export class CocktailsComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  cocktails: Cocktail[] = [];
  name!: string;

  filter: 'all' | 'alcohol' | 'noAlcohol' = 'all';

  constructor(
    private cocktailServerService: CocktailServerService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.cocktailServerService.getCocktails().subscribe((cocktails) => this.cocktails = cocktails);
  }

  deleteCocktail(cocktail: Cocktail) {
    this.cocktailServerService.deleteCocktail(cocktail).subscribe(
      () => this.cocktails = this.cocktails.filter((c) => c.id !== cocktail.id)
    );
  }

  filterCocktails() {
    if (this.filter === 'all') {
      this.cocktailServerService.getCocktails().subscribe((cocktails) => this.cocktails = cocktails);
    } else if (this.filter === 'alcohol') {
      this.cocktailServerService.getCocktails().subscribe(
        (cocktails) => (this.cocktails = cocktails.filter((c) => c.alcohol = true))
      )
    } else if (this.filter === 'noAlcohol'){
      this.cocktailServerService
        .getCocktails()
        .subscribe(
          (cocktails) =>
            (this.cocktails = cocktails.filter((c) => c.alcohol == false))
        );
      }
  }

  search() {
    if (this.name == '') {
      this.ngOnInit();
    } else {
      this.cocktails = this.cocktails.filter((res) => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      });
    }
  }

  showEditCocktail(cocktail: Cocktail) {
    const modalRef = this.modalService.open(CocktailModalComponent);
    modalRef.componentInstance.clonedCocktail = {
      ...cocktail,
    };

    modalRef.closed.pipe(
      switchMap((updatedCocktail) => {
        return this.cocktailServerService.updateCocktail(updatedCocktail);
      }),
      tap((updatedCocktail) => {
        this.cocktails = this.cocktails.map((c) => {
          if (c.id === updatedCocktail.id) {
            return updatedCocktail;
          }
          return c;
        })
      }),
      catchError((err) => {
        alert(err);
        return NEVER;
      })
    )
    .subscribe();
  }
}
