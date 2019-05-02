import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { switchMap, scan, takeWhile, startWith, mapTo,tap } from 'rxjs/operators';

@Injectable()
export class SearchService {
private data$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: Http) {}

  search(term: string) {
     return this.data$.pipe(
      switchMap(data => {
        if (data) {
          return of(data); // If data was saved, just return it (you're actually returning an observable of data, because switchMap needs observables to switch for every other observable emission)
        } else {
          return this.http  .get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=517c7bbf790248290ad52d57725c4d5f')
     // If it wasn't, make a new http request
            .pipe(tap(newData => this.data$.next(newData))); 
           // And save the data on the subject
        }
      })
    );
  //  return this.http
    //  .get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=517c7bbf790248290ad52d57725c4d5f')
    //  .map((res) => {return res.json()})
    //                .catch((error:any) => 
    //                    Observable.throw(error.json().error || 'Server error')).share();}
                    //.publishReplay(1).refCount();  }
}
}