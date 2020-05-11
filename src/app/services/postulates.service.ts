// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class PostulatesService{
	public url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	postulatesList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'postulates', {headers:headers});
	}

	getPostulate(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'postulates/' + id, {headers:headers});		
	}

	getPostulatesByCategory(category, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'postulates/by/category/' + category, {headers:headers});		
	}

	getPostulatesByCategoryWithResults(category, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'postulates/by/category/results/' + category, {headers:headers});		
	}

	newPostulate(postulate, token): Observable<any>{
		let json = JSON.stringify(postulate);
		let params = "json=" + json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'postulates', params, {headers:headers});
	}

	updatePostulate(postulate, token): Observable<any>{
		let json = JSON.stringify(postulate);
		let params = "json=" + json;
		let id = postulate.id;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put(this.url + 'postulates/' + id, params, {headers:headers});
	}

	deletePostulate(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete(this.url + 'postulates/' + id, {headers:headers});
	}
}