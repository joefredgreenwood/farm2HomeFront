import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Farm } from './farm';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  rootURL: string

  constructor(private httpsvc: HttpClient) {
    this.rootURL="http://localhost:7777/farmtoshop/farm"
   }

   getFarm():Observable<Farm[]>{
     return this.httpsvc.get<Farm[]>(this.rootURL+"/list")
   }

   findFarmByID(farmID:number):Observable<Farm>{
     return this.httpsvc.get<Farm>(this.rootURL+"/find/"+farmID)
   }

   createFarm(newFarm:Farm):Observable<Farm>{

    var contentData= "farmName="+newFarm.farmName+
                  "&farmLocation="+newFarm.farmLocation+
                  "&farmType="+newFarm.farmType+
                  "&farmUsername="+newFarm.farmUsername+
                  "&farmPassword="+newFarm.farmPassword

                  const httpOptions= {
                    headers: new HttpHeaders(
                      {"Content-Type":"application/x-www-form-urlencoded"})
                  }
                  return this.httpsvc.post<Farm>(
                    this.rootURL+"/register/", //URL
                    contentData, //data for the server
                    httpOptions) //header options
   }
}
