// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class VotesService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	verifyAuthorizationVote(user_id, category_id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'votes/search/vote/' + user_id + '/' + category_id, {headers:headers});
	}

	newVote(vote, token): Observable<any>{
		let json = JSON.stringify(vote);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'votes', params, {headers:headers});
	}
}