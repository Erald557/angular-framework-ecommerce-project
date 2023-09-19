import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cards=[];
  cardsForHandset = [];
  cardsForWeb = [];

  isHandset:boolean = false;

  isHandsetObserver: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
    public appService:AppService) { }
  ngOnInIt(){
    this.isHandsetObserver.subscribe(currentObserverValue => {
      this.isHandset = currentObserverValue;
      this.loadCards();
    });

    this.appService.getDeals().subscribe(
      response => {
        this.cardsForHandset = response.handsetCard;
        this.cardsForWeb = response.webCard;
        this.loadCards();
      },
      error => {
      alert("An error has happend!");
      }
    );
  }
  loadCards(){
    this.cards = this.isHandset? this.cardsForHandset: this.cardsForWeb;
  }
}
