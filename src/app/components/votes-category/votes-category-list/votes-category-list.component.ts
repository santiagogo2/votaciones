import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';

@Component({
	selector: 'app-votes-category-list',
	templateUrl: './votes-category-list.component.html',
	styleUrls: ['./votes-category-list.component.css'],
	providers: [
		UserService,
		VotesCategoryService
	]
})
export class VotesCategoryListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public categories: any;

	public date: any;

	constructor(
		private _userService: UserService,
		private _votesCategoryService: VotesCategoryService
	) {
		this.page_title = 'Categorias de Votaciones Registradas en el Sistema';
		this.actualPage = 1;
		this.itemsPerPage = 10;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();

		this.date = new Date();
	}

	ngOnInit() {
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;

		this.votesCategoryList();
	}

	votesCategoryList(){
		this._votesCategoryService.votesCategoryList(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.categories = response.categories;
					this.verifyDate();
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

	verifyDate(){
		this.categories.forEach(element => {
			let endDate = element.endDate.split("-");
			let endTime = element.endTime.split(":");

			endDate = new Date(endDate[0], +endDate[1]-1, endDate[2], endTime[0], endTime[1]);
			if((endDate - this.date) < 0 || this.identity.role == 'admin'){
				element.flag = true;
			} else{
				element.flag = false;
			}
		});
	}

	deleteVotesCategory(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._votesCategoryService.deleteVoteCategory(id, this.token).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.votesCategoryList();
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

	pageChange(event){
		this.actualPage = event;
	}
}
