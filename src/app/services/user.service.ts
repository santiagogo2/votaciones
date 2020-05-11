// Imports necesarios para el funcionamiento del servicio
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class UserService{
	public url: string;
	public token: string;
	public identity: string;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	signup(user, gettoken=null):Observable<any>{
		if(gettoken != null){
			user.gettoken = 'true';
		}
		let json = JSON.stringify(user);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'user/login', params, {headers:headers});
	}

	userList(token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'user', {headers:headers});
	}

	getUser(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url +  'user/' + id, {headers:headers});
	}

	getUserByIdNumber(idNumber, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.get(this.url + 'user/cc/' + idNumber, {headers:headers});
	}

	newUser(user, token): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json=" + json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'user', params, {headers:headers});
	}
	newMassiveUser(users, token): Observable<any>{
		let json = JSON.stringify(users);
		let params = "json="+json;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url + 'user/massive', params, {headers:headers});
	}

	updateUser(user, token): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json=" + json;
		let id = user.id;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.put(this.url + 'user/' + id, params, {headers:headers});
	}

	updatePassword(user, token): Observable<any>{
		let json = JSON.stringify(user);
		let params = "json=" + json;
		let id = user.id;
		let headers = new HttpHeaders().set('Authorization', token)
									   .set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url + 'user/update/password/' + id, params, {headers:headers});
	}

	deleteUser(id, token): Observable<any>{
		let headers = new HttpHeaders().set('Authorization', token);

		return this._http.delete(this.url + 'user/' + id, {headers:headers});
	}

	getIdentity(){
		let identity = JSON.parse(localStorage.getItem('votesUserIdentity'));

		if(identity && identity != undefined){
			this.identity = identity;
		} else{
			this.identity = null;
		}

		return this.identity;
	}

	getToken(){
		let token = localStorage.getItem('votesUserToken');

		if(token && token != undefined){
			this.token = token;
		} else{
			this.token = null;
		}

		return this.token;
	}
}