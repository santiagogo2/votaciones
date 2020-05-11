import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.css'],
	providers: [UserService]
})
export class UserLoginComponent implements OnInit {
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;
	public page_title: string;

	public user: User;

	public token: string;
	public identity: any;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.page_title = 'Iniciar Sesión';
		this.user = new User(1,null,null,null,null,null,null);
		this.preloaderStatus = false;
	}

	ngOnInit() {
		this.identity = this._userService.getIdentity();
		if(this.identity) this._router.navigate(['/inicio']);

		this.logout();
	}

	onSubmit(loginForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		// Obtener el token del usuario identificado si las credenciales son correctas
		this._userService.signup(this.user).subscribe(
			response => {
				if(response.status == 'success'){
					this.token = response.signup;

					// Obtener los datos identity del usuario identificado
					this._userService.signup(this.user, true).subscribe(
						response => {
							if(response.status == 'success'){
								this.identity = response.signup;

								localStorage.setItem('votesUserToken', this.token);
								localStorage.setItem('votesUserIdentity', JSON.stringify(this.identity));
								let expirationTime = (12*60*60*1000) + new Date().getTime();
								localStorage.setItem('votesUserExpiration', expirationTime.toString());

								loginForm.reset();
								this._router.navigate(['inicio']);
							}
						}
					);
				}					
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.responseMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				if(error.error.errors){
					this.validationMessage = JSON.stringify(error.error.errors);
				}
				console.log(<any>error);
			}
		);
	}

	logout(){
		this._route.params.subscribe( params => {
			let logout = +params['sure'];

			if(logout == 1){
				localStorage.removeItem('votesUserIdentity');
				localStorage.removeItem('votesUserToken');
				localStorage.removeItem('votesUserExpiration');
				this.token = null;
				this.identity = null;

				// Redireccionar a la página de inicio de sesión
				this._router.navigate(['/iniciar-sesion']);
			}
		});
	}
}
