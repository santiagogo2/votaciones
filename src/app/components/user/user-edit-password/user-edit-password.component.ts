import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service'; 

@Component({
	selector: 'app-user-edit-password',
	templateUrl: './user-edit-password.component.html',
	styleUrls: ['./user-edit-password.component.css'],
	providers: [UserService]
})
export class UserEditPasswordComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloader2Status: boolean;
	public passwordConfirm: string;

	public token: string;
	public identity: any;
	public user: any;

	constructor(
		private _userService: UserService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.getUser();
	}

	getUser(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.errorCode = undefined;
			this.responseMessage = undefined;
			this.user = undefined;

			let id = +params['id'];

			this._userService.getUser(id, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.user = response.user;
						if(this.identity.role != 'admin' && this.identity.sub != this.user.id){
							this._router.navigate(['/inicio']);
						}
						this.page_title = 'Actualizar contraseña de ' + this.user.name + ' ' + this.user.surname;
					}
				},
				error => {
					this.status = 'error';
					this.errorCode = error.error.code;
					this.responseMessage = error.error.message;
					if(error.status && error.status == 500) this.errorCode = 500;
					console.log(<any>error);
				}
			);
		})
	}

	onSubmit(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloader2Status = true;

		this._userService.updatePassword(this.user, this.token).subscribe(
			response => {
				this.preloader2Status = false;
				
				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
				}
			},
			error => {
				this.preloader2Status = false;
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
}
