import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';
import { global } from '../../../services/global';
import { User } from '../../../models/user';

@Component({
	selector: 'app-user-register',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.css'],
	providers: [
		UserService,
		VotesCategoryService
	]
})
export class UserRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public passwordConfirm: string;
	public preloader2Status: boolean;
	public categoryFlag: boolean;
	public selectedAll: boolean;

	public user: User;
	public voteCategories: any;
	public roles: any;
	public token: string;
	public identity: any;

	constructor(
		private _userService: UserService,
		private _votesCategoryService: VotesCategoryService
	) {
		this.page_title = 'Crear Usuario';
		this.passwordConfirm = '';
		this.preloader2Status = false;
		this.selectedAll = false;

		this.user = new User(1,null,null,null,null,null,null);
		this.roles = global.roles;
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.votesCategoryList();
	}

	onSubmit(userRegisterForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.preloader2Status = true;

		let autorized_categories: string = '';

		this.voteCategories.forEach(element => {
			if(element.isSelected){
				autorized_categories = autorized_categories + element.id.toString() + '-';
			}
		});
		this.user.autorized_categories = autorized_categories.slice(0, -1);

		this._userService.newUser(this.user, this.token).subscribe(
			response => {
				this.preloader2Status = false;
				
				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					userRegisterForm.reset();
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

	votesCategoryList(){
		this._votesCategoryService.votesCategoryList(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.voteCategories = response.categories;
				}
			},
			error => {
				this.status = 'error';
				this.responseMessage = error.error.message;
				console.log(<any> error);
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
