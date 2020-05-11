import { Component, OnInit, DoCheck } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [
		UserService
	]
})
export class AppComponent implements OnInit, DoCheck{
	public title = 'Votaciones Subred Sur';
	public page_title: string;

	public token: string;
	public identity: any;

	constructor(
		private _userService: UserService,
		private _router: Router
	){
		this.page_title = 'Votaciones Subred Sur';
		this.loadUser();
	}

	ngOnInit(): void{}

	ngDoCheck(): void{
		this.loadUser();
	}

	loadUser(){
		let actualDate = new Date().getTime();
		let expiresDate = +localStorage.getItem('votesUserExpiration');
		if( expiresDate && actualDate >= expiresDate ){
			localStorage.clear();

			this.token = null;
			this.identity = null;

			this._router.navigate(['iniciar-sesion']);
		} else{
			this.token = this._userService.getToken();
			this.identity = this._userService.getIdentity();
		}	
	}
}
