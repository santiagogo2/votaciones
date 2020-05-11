import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';
import { VotesCategory } from '../../../models/votesCategory';

@Component({
	selector: 'app-votes-category-register',
	templateUrl: './votes-category-register.component.html',
	styleUrls: ['./votes-category-register.component.css'],
	providers: [
		UserService,
		VotesCategoryService
	]
})
export class VotesCategoryRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public category: VotesCategory;

	public date: any;
	public day: any;
	public month: any;
	public year: any;

	constructor(
		private _userService: UserService,
		private _votesCategoryService: VotesCategoryService
	) {
		this.page_title = 'Crear Categoría de Votación';

		this.category = new VotesCategory(1,null,null,null,null,null);
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();

		this.date = new Date();
		this.day = this.date.getDate();
		this.month = +this.date.getMonth();
		this.month = this.month+1;
		this.year = this.date.getFullYear();
		if(this.day < 9) this.day = "0"+this.day;
		if(this.month < 9) this.month = "0"+this.month;
	}

	ngOnInit() {
	}

	onSubmit(votesCategoryRegisterForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this._votesCategoryService.newVotesCategory(this.category, this.token).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					votesCategoryRegisterForm.reset();
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
}
