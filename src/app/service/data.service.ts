import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Card, CardContent } from '../models/card';
import { OrlandoWeather, Weather } from '../models/orlando-weather';
import { UserKey } from '../models/userKey';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
  constructor(private http: HttpClient) { }

  id: any;

  private token: string = "";
  private tokenExpiration: any;

  public card: Card = new Card();

  public cards: Card[] = [];
  public orlandoWeather: OrlandoWeather = {} as OrlandoWeather;
  public skies: Weather[] = [];
  public cardContents: CardContent[] = [];

  private userKey: UserKey = {userKey: '', userId: 0};
  public imgArr: {} = [];

  public  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + this.token
      })
  };

  loadCards(): any{
      return this.http.get("/api/cards/GetAllCards")
          .pipe(
          map((data: any) => {
              this.cards = data;
              return this.cards;
          }));
  }

  loadCardsByCategory(cat: string): any {
      return this.http.get("/api/cards/GetByCategory/" + cat)
          .pipe(
              map((data: any) => {
                  this.cards = data;
                  return this.cards;
              }));
  }

  loadCardLinks(cat: string): any {
      return this.http.get("/api/cards/GetCardsLinkData/" + cat)
          .pipe(
              map((data: any) => {
                  this.cards = data;
                  return this.cards;
              }));
  }

  getCardById(id: string) {
      return this.cards.find(x => x.cardTitle == id);
  }

  getMyCardById(id: number): Observable<boolean> {
      return this.http.get("/api/cards/GetCardById/" + id)
          .pipe(
          map((data: any) => {
              this.card = data;
              return true;
          }));
  }

  getCardByName(name: string): Observable<boolean> {
     return this.http.get("/api/cards/GetCardByName/" + name)
          .pipe(
          map((data: any) => {
              this.card = data;
              return true;
          }));
  }

  getOrlandoWeather(): any{
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?q=Orlando,us&APPID=3b0c29db4bff5ea1086bec2b9b476c3d")
    .pipe(
        map((data: any) => {
            this.orlandoWeather = data;
            console.log(this.orlandoWeather);
            return this.orlandoWeather;
        }));
  }

  public get loginRequired(): boolean {
      return this.token.length == 0 || this.tokenExpiration > new Date();
  }

  public login(creds: { username: string; password: string; }): Observable<boolean> {
      /// encrypt the request payload so user creds not visible to hackers and nefarious types
      let uName: string = btoa(creds.username);
      let uPass: string = btoa(creds.password);
      creds.username = uName;
      creds.password = uPass;
      return this.http.post("/api/Auth/CreateToken", creds)
          .pipe(
              map((data: any) => {
              this.token = data.token;
              this.tokenExpiration = data.expiration;
              return true;
          }));
  }

  public saveUserKey(key: any): Observable<boolean> {
      return this.http.post("/api/Auth/StoreKey", key, {
          headers: new HttpHeaders().set('Content-Type','application/json')
      })
          .pipe(
          map((response) => {
            console.log(response);
              this.userKey = new UserKey();
              return true;
          })
          );
  } 

  public updateCard(name:string, data: any) {
      return this.http.put("/api/cards/"+ name, data, {
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      }).pipe(
          map(() => {
              this.card = new Card();
              return true;
              }));
  }

  public checkout() {
     
      return this.http.post("/api/orders", this.card, {
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      })
          .pipe(
              map(() => {
                  this.card = new Card();
                  return true;
              }));
  }

  public admin(data: any): Observable<boolean> {
      return this.http.post("/api/cards", data, {
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      })
       .pipe(
          map(() => {
           this.card = new Card();
              return true;
          }))
  }

  public deleteCard(name:string) {
      return this.http.delete("/api/cards/"+ name, {
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      })
          .pipe(
              map(() => {
              this.card;
              return true;
              })
          );
  }

  getImageList() : Observable<object> {
      return this.http.get("/api/Cards/GetAllImages/",{
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      })
      .pipe(
          map((response) => {
            console.log(response);
              this.imgArr = response;
              return this.imgArr;
          })
      )
  }
}
