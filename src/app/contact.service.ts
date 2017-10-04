import { Injectable } from '@angular/core';
import { IContact } from './contact';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';


@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  list() {
    return this.http.get('http://localhost:3000/api/contacts').map(response => response.json()).catch(error => Observable.throw(error));
  }

  view(objectID) {
    return this.http.get(`http://localhost:3000/api/contacts/${objectID}`)
            .map(response => response.json()).catch(error => Observable.throw(error));
  }

  add(contact) {
    // console.log(add);
    return this.http.post(`http://localhost:3000/api/contacts`, contact);
  }

  save(objectID, contact) {
    return this.http.post(`http://localhost:3000/api/contacts/${objectID}`, contact);
  }

  delete(objectID) {
    return this.http.delete(`http://localhost:3000/api/contacts/${objectID}`);
  }
}
