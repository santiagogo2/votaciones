import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css'],
	providers: [UserService]
})
export class UserListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public searchStatus: string;
	public searchMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public searchType: number;
	public searchContent: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public users: any;

	constructor(
		private _userService: UserService,
		private _router: Router
	) {
		this.page_title = 'Usuarios registrados en el sistema';
		this.actualPage = 1;
		this.itemsPerPage = 20;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.userList();
	}

	userList(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;

		this._userService.userList(this.token).subscribe(
			response => {
				this.preloaderStatus = false;
				if(response.status == 'success'){
					this.users = response.users;
				}
			},
			error => {
				this.preloaderStatus = false;
				this.status = 'error';
				this.errorCode = error.error.code;
				this.responseMessage = error.error.message;
				if(error.status && error.status == 500) this.errorCode = 500;
				console.log(<any>error);
			}
		);
	}

	onSubmit(){
		this.searchStatus = undefined;
		this.searchMessage = undefined;
		this.preloaderStatus = true;

		if(this.searchType == 1){
			this._userService.getUserByIdNumber(this.searchContent, this.token).subscribe(
				response => {
					this.preloaderStatus = false;
					if(response.status == 'success'){
						this.users = response.user;
					}
				},
				error => {
					this.preloaderStatus = false;
					this.searchStatus = 'error';
					this.searchMessage = error.error.message;
					console.log(<any> error);
				}
			);
		}
	}

	reset(){
		this.preloaderStatus = true;
		this.userList();
	}

	deleteUser(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;

		this._userService.deleteUser(id, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.userList();
					this.status = 'success';
					this.responseMessage = response.message;
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
	}

	pageChange(event){
		this.actualPage = event;
	}
}
