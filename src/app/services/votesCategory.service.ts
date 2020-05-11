// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class VotesCategoryService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	votesCategoryList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'category/votes', {headers:headers});
	}

	getVoteCategory(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'category/votes/' + id, {headers:headers});
	}

	newVotesCategory(category, token): Observable<any>{
		let json = JSON.stringify(category);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'category/votes', params, {headers:headers});
	}

	updateVoteCategory(category, token): Observable<any>{
		let json = JSON.stringify(category);
		let params = "json="+json;
		let id = category.id;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put(this.url + 'category/votes/' + id, params, {headers:headers});
	}

	deleteVoteCategory(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete(this.url + 'category/votes/' + id, {headers:headers})
	}
}