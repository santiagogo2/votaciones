import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-user-edit',
	templateUrl: './user-edit.component.html',
	styleUrls: ['./user-edit.component.css'],
	providers: [
		UserService,
		VotesCategoryService
	]
})
export class UserEditComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloader2Status: boolean;
	public categoryFlag: boolean;
	public selectedAll: boolean;

	public token: string;
	public identity: any;
	public user: any;
	public voteCategories: any;
	public roles: any;

	constructor(
		private _userService: UserService,
		private _votesCategoryService: VotesCategoryService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.roles = global.roles;
	}

	ngOnInit() {
		this.getUser();
	}

	getUser(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.errorCode = undefined;
			this.responseMessage = undefined;
			this.user = null;

			let id = +params['id'];

			this._userService.getUser(id, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.user = response.user;
						this.page_title = 'Editar el usuario ' + this.user.name + ' ' + this.user.surname;
						this.votesCategoryList();
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
		});
	}

	votesCategoryList(){
		this.status = undefined;
		this.responseMessage = undefined;
		this.voteCategories = undefined;

		this._votesCategoryService.votesCategoryList(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.voteCategories = response.categories;
					let autorized_categories = this.user.autorized_categories.split('-');
					let allSelected = 0;
					autorized_categories.forEach(element => {
						for(let i = 0; i < this.voteCategories.length; i++){
							if(this.voteCategories[i].id == +element){
								this.voteCategories[i].isSelected = true;
								this.categoryFlag = true;
								allSelected++;
							}
						}
					});
					if(allSelected == this.voteCategories.length) this.selectedAll = true;
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(<any> error);
			}
		);
	}

	onSubmit(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;

		let autorized_categories: string = '';

		this.voteCategories.forEach(element => {
			if(element.isSelected){
				autorized_categories = autorized_categories + element.id.toString() + '-';
			}
		});
		this.user.autorized_categories = autorized_categories.slice(0, -1);

		this._userService.updateUser(this.user, this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.page_title = 'Editar el usuario ' + this.user.name + ' ' + this.user.surname;
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

	setVoteCategory(){
		this.selectedAll = false;
		this.categoryFlag = false;

		let allSelected = 0;

		this.voteCategories.forEach(element => {
			if(element.isSelected){
				this.categoryFlag = true;
				allSelected++;
			}
		});
		if(allSelected == this.voteCategories.length) this.selectedAll = true;
	}

	checkUncheckAll(){
		this.categoryFlag = this.selectedAll;

		this.voteCategories.forEach(element => {
			element.isSelected = this.selectedAll;
		});
	}
}
