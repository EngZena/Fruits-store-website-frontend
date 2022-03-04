import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { FruitsModel } from 'src/app/core/models/FruitsModel';
import { SummerFruitsService } from 'src/app/core/services/SummerFruits.service';
import { WinterFruitsService } from 'src/app/core/services/WinterFruits.service';
import * as paginationFunctions from '../../shared';
import * as fromApp from '../../store/app.reducer';
import * as fromCheckoutActions from '../checkout/store/checkout.actions';
@Component({
  selector: 'app-fruits-store',
  templateUrl: './fruits-store.component.html',
  styleUrls: ['./fruits-store.component.scss'],
})
export class FruitsStoreComponent implements OnInit, OnDestroy {
  summerFruitsArray: FruitsModel[] = [];
  winterFruitsArray: FruitsModel[] = [];
  isLoading: boolean = false;
  errorMessage: String = null;
  private errorSummerSub: Subscription;
  private errorWinterSub: Subscription;
  currentSummerPage: number = 1;
  currentWinterPage: number = 1;
  summerFruitsPage: FruitsModel[] = [];
  winterFruitsPage: FruitsModel[] = [];

  constructor(
    private summerFruitsService: SummerFruitsService,
    private winterFruitsService: WinterFruitsService,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.errorSummerSub = this.summerFruitsService.requestError.subscribe(
      errorMessageService => {
        this.errorMessage = errorMessageService;
      }
    );
    this.errorWinterSub = this.winterFruitsService.requestError.subscribe(
      errorMessageService => {
        this.errorMessage = errorMessageService;
      }
    );
    this.isLoading = true;

    let value$ = this.loadData();
    value$.subscribe(() => {
      this.isLoading = false;
    });
  }

  loadData() {
    return forkJoin(
      this.summerFruitsService.getSummerFruits(),
      this.winterFruitsService.getWinterFruits()
    ).pipe(
      map(([summerFruits, winterFruits]) => {
        this.summerFruitsArray = summerFruits;
        this.summerFruitsPage = paginationFunctions.pagination(
          this.summerFruitsArray,
          4,
          1
        );
        this.winterFruitsArray = winterFruits;
        this.winterFruitsPage = paginationFunctions.pagination(
          this.winterFruitsArray,
          4,
          1
        );
      })
    );
  }

  NextPage(currentPage: number, fullArray: FruitsModel[], season: string) {
    const result = paginationFunctions.NextPage(currentPage, fullArray);
    season === 'winter'
      ? (this.winterFruitsPage = result.arrayData)
      : (this.summerFruitsPage = result.arrayData);
    season === 'winter'
      ? (this.currentWinterPage = result.pageNumber)
      : (this.currentSummerPage = result.pageNumber);
  }

  PreviousPage(currentPage: number, fullArray: FruitsModel[], season: string) {
    const result = paginationFunctions.PreviousPage(currentPage, fullArray);
    season === 'winter'
      ? (this.winterFruitsPage = result.arrayData)
      : (this.summerFruitsPage = result.arrayData);
    season === 'winter'
      ? (this.currentWinterPage = result.pageNumber)
      : (this.currentSummerPage = result.pageNumber);
  }

  ngOnDestroy(): void {
    this.errorSummerSub.unsubscribe();
    this.errorWinterSub.unsubscribe();
  }

  onAddItemToShoppingList = (fruitData: {
    name: string;
    image: string;
    price: number;
  }) => {
    this.store.dispatch(
      new fromCheckoutActions.AddToCheckoutList({
        name: fruitData.name,
        price: fruitData.price,
        image: fruitData.image,
      })
    );
  };

  onRemoveItemFromShoppingList = (fruitData: {
    name: string;
    image: string;
    price: number;
  }) => {
    this.store.dispatch(
      new fromCheckoutActions.RemoveFromCheckoutList({
        name: fruitData.name,
        price: fruitData.price,
        image: fruitData.image,
      })
    );
  };
}
