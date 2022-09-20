import { parse } from 'yamljs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class getYamlDataService {

    constructor(private http: HttpClient) {
        this.getJson().subscribe(data => {
        })
    }


    public getJson(): Observable<any> {
        return this.http.get("./assets/swagger/swagger.yaml", {
            observe: 'body',
            responseType: "text"   // This one here tells HttpClient to parse it as text, not as JSON
        }).pipe(
            // Map Yaml to JavaScript Object
            map(yamlString => parse(yamlString))
            
        );
    }
}