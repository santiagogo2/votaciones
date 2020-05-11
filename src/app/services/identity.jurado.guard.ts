import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { global } from './global';

@Injectable()
export class IdentityJuradoGuard implements CanActivate{

	constructor(
		private _userService: UserService,
		private _router: Router
	){}

	canActivate(){
		let identity: any = this._userService.getIdentity();

		if(identity && (identity.role == 'admin' || identity.role == 'jurado')){ // Condición del administrador
			return true;
		} else {
			this._router.navigate(['/inicio']);
			return false;
		}
	}
}