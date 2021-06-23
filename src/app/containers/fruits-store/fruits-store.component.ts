import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FruitsModel } from 'src/app/models/FruitsModel';
import { SummerFruitsService } from 'src/app/services/SummerFruitsService';
import { WinterFruitsService } from 'src/app/services/WinterFruitsService';
import * as  paginationFunctions  from '../../shared'
@Component({
  selector: 'app-fruits-store',
  templateUrl: './fruits-store.component.html',
  styleUrls: ['./fruits-store.component.scss']
})
export class FruitsStoreComponent implements OnInit, OnDestroy {

  summerFruitsArray: FruitsModel[] = [];
  winterFruitsArray: FruitsModel[] = [];
  isLoading:boolean = false;
  errorMessage: String = null;
  private errorSummerSub: Subscription;
  private errorWinterSub: Subscription;
  currentSummerPage: number = 1;
  currentWinterPage: number = 1;
  summerFruitsPage: FruitsModel[] = [];
  winterFruitsPage: FruitsModel[] = [];
  constructor(private http: HttpClient,
    private summerFruitsService: SummerFruitsService,
    private winterFruitsService: WinterFruitsService,
    ) { }
 


  ngOnInit(): void {
    this.errorSummerSub = this.summerFruitsService.requestError.subscribe(
      errorMessageService => {
        this.errorMessage = errorMessageService;
    });
    this.errorWinterSub = this.summerFruitsService.requestError.subscribe(
      errorMessageService => {
        this.errorMessage = errorMessageService;
    });
    this.isLoading = true;
    this.summerFruitsService.getSummerFruits().subscribe(
      fruits =>{
        this.isLoading = false;
        this.summerFruitsArray = fruits;
        this.summerFruitsPage =  paginationFunctions.pagination(this.summerFruitsArray, 5, 1);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    );
    this.winterFruitsService.getWinterFruits().subscribe(
      fruits =>{
        this.isLoading = false;
        this.winterFruitsArray = fruits;
        this.winterFruitsPage = paginationFunctions.pagination(this.winterFruitsArray, 5, 1);
      },
      error => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    );
  }

  NextPage(currentPage, fullArray, season) {
  const result =  paginationFunctions.NextPage(currentPage, fullArray)
    season === 'winter'
      ? (this.winterFruitsPage = result.arrayData)
      : (this.summerFruitsPage = result.arrayData);
    season === 'winter'
      ? (this.currentWinterPage = result.pageNumber)
      : (this.currentSummerPage = result.pageNumber);
  }
 
  PreviousPage(currentPage, fullArray, season) {
    const result =  paginationFunctions.PreviousPage(currentPage, fullArray)
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

}
