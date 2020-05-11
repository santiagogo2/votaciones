import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';

@Component({
	selector: 'app-votes-category-edit',
	templateUrl: './votes-category-edit.component.html',
	styleUrls: ['./votes-category-edit.component.css'],
	providers: [
		UserService,
		VotesCategoryService
	]
})
export class VotesCategoryEditComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public category: any;

	public date: any;
	public day: any;
	public month: any;
	public year: any;

	constructor(
		private _userService: UserService,
		private _votesCategoryService: VotesCategoryService,
		private _route: ActivatedRoute
	) {
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
		this.getVoteCategory();
	}

	getVoteCategory(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.validationMessage = undefined;

			let id = +params['id'];

			this._votesCategoryService.getVoteCategory(id, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.category = response.category;
						this.page_title = 'Editar Categoría de Votación ' + this.category.id;
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

	onSubmit(){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this._votesCategoryService.updateVoteCategory(this.category, this.token).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
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
