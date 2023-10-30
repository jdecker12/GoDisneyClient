import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Card, CardContent } from '../models/card';
import { Contact } from '../models/contact';
import { OrlandoWeather, Weather } from '../models/orlando-weather';
import { UserKey } from '../models/userKey';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../models/register-user';

const apiUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class DataService {

  
  constructor(private http: HttpClient) { }

  id: any;

  private token: string = "";
  private tokenExpiration: any;
  private user: RegisterUser = {
      fname: '',
      lname: '',
      email: '',
      username: '',
      password: '',
      userRole: ''
  };

  public card: Card = new Card();
  public contact: Contact = new Contact();
  public messages:[] = [];

  public cards: Card[] = [];
  public orlandoWeather: OrlandoWeather = {} as OrlandoWeather;
  public skies: Weather[] = [];
  public cardContents: CardContent[] = [];

  private userKey: UserKey = {userKey: '', userId: 0};
  public imgArr: {} = [];
  public image: any;
  public testResult: any;

  

  public  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + this.token
      })
  };

  loadCards(): any{
      return this.http.get(apiUrl + "/api/cards/GetAllCards")
          .pipe(
          map((data: any) => {
              this.cards = data;
              return this.cards;
          }));
  }

  loadCardsByCategory(cat: string): any {
      return this.http.get(apiUrl + "/api/cards/GetByCategory/" + cat)
          .pipe(
              map((data: any) => {
                  this.cards = data;
                  return this.cards;
              }));
  }

  loadCardLinks(cat: string): any {
      return this.http.get(apiUrl + "/api/cards/GetCardsLinkData/" + cat)
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
      return this.http.get(apiUrl + "/api/cards/GetCardById/" + id)
          .pipe(
          map((data: any) => {
              this.card = data;
              return true;
          }));
  }

  getCardByName(name: string): Observable<boolean> {
     return this.http.get(apiUrl + "/api/cards/GetCardByName/" + name)
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
      let scrmblCreds = {
        username:  uName,
        password: uPass
      }
    //   creds.username = uName;
    //   creds.password = uPass;
      return this.http.post(apiUrl + "/api/Auth/CreateToken", scrmblCreds)
          .pipe(
              map((data: any) => {
              this.token = data.token;
              this.tokenExpiration = data.expiration;
              localStorage.setItem('authToken', this.token);
              return true;
          }));
  }

  public getToken(): string {
    if (this.token == '') {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.token = token;
        }
    }
    return this.token; 
  }



  public validateToken(token: string ): Observable<boolean> {
    return this.http.get(`${apiUrl}/api/Auth/ValidateToken/${token}`)
    .pipe(
        map((data: any) => {
            console.log(data);
            this.token = token;
            return true;
        })
    );
  }

  public registerUser(user: {fname: string; lname: string; email: string; username:string; password: string; userRole: string} ): Observable<boolean> {
    return this.http.post(`${apiUrl}/api/Auth/RegisterUser`, user)
    .pipe(
        map((data: any) => {
            console.log(data);
            this.user = user;
            return true;
        })
    );
  }

  public getUserRole(email:string): Observable<string> {
    return this.http.get(`${apiUrl}/api/Auth/GetUserRole/${email}`)
    .pipe(
        map((data: any) => {
            console.log(data);
            return data;
        })
    );
  }

  public saveUserKey(key: any): Observable<boolean> {
      return this.http.post(apiUrl + "/api/Auth/StoreKey", key, {
          headers: new HttpHeaders().set('Content-Type','application/json')
      })
          .pipe(
          map((response) => {
              this.userKey = new UserKey();
              return true;
          })
          );
  } 

  public updateCard(name:string, data: any): Observable<boolean> {
      return this.http.put(apiUrl + "/api/cards/"+ name, data, {
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      }).pipe(
          map(() => {
              this.card = new Card();
              return true;
              }));
  }

  public checkout() {
     
      return this.http.post(apiUrl + "/api/orders", this.card, {
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      })
          .pipe(
              map(() => {
                  this.card = new Card();
                  return true;
              }));
  }

  public admin(data: any): Observable<boolean> {
      return this.http.post(apiUrl + "/api/cards", data, {
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      })
       .pipe(
          map(() => {
           this.card = new Card();
              return true;
          }))
  }

  public deleteCard(name:string) {
      return this.http.delete(apiUrl + "/api/cards/"+ name, {
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      })
          .pipe(
              map(() => {
              this.card;
              return true;
              })
          );
  }

  public uploadImage(image:FormData): Observable<any> {
    return this.http.post(apiUrl + "/api/Image/UploadImage", image, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + this.token),
        responseType: 'arraybuffer'
    })
    .pipe(
        map((response: ArrayBuffer) => {
            if(response instanceof ArrayBuffer) {
                return response;
            } else {
                throw new Error("Failed to upload image");
            }  
        }),
        catchError((error:any) => {
            console.log(error);
            return throwError(error);
        })
    );
  }

  getImageList() : Observable<object> {
      (this.token == '') ? this.validateToken(this.getToken()) : this.token;
      return this.http.get(apiUrl + "/api/cards/GetAllImages/",{
          headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
      })
      .pipe(
          map((response) => {
              this.imgArr = response;
              return this.imgArr;
          })
      );
  }

  saveContact(data:any) : Observable<boolean> {
    return this.http.post(`${apiUrl}/api/contact/SaveContact`, data, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
    })
    .pipe(
        map(() => {
            this.contact = new Contact();
            return true;
        })
    )
  }

  getAllMessages() : Observable<object> {
    return this.http.get(`${apiUrl}/api/contact/GetAllEmail`, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
    })
    .pipe(
        map((data: any) => {
            console.log(data);
           this.messages = data;
            return this.messages;
        }),
        catchError((error: any) => {
            console.log(error);
            return throwError(error);
        })
    )
  }

  deleteMessage(name: string) : Observable<object> {
    return this.http.delete(`${apiUrl}/api/contact/DeleteEmail/` + name, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + this.token)
    })
    .pipe(
        map((data: any) => {
            console.log(data);
           this.messages = data;
            return this.messages;
        }),
        catchError((error: any) => {
            console.log(error);
            return throwError(error);
        })
    )
  }

  getCardsThreeAtATime(cat:string, page:number, pageSize:number ): Observable<Card[]> {
    return this.http.get(`${apiUrl}/api/cards/GetCardsInfiniteScroll/${cat}/${page}/${pageSize}`)
    .pipe(
        map((data:any) => {
            this.cards = data;
            return this.cards;
        }),
        catchError((error: any) => {
            console.log(error);
            return throwError(error);
        })
    )
  }
}
