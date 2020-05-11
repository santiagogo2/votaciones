import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { VotesCategoryService } from '../../services/votesCategory.service';
import { VotesService } from '../../services/votes.service';

@Component({
	selector: 'app-front-page',
	templateUrl: './front-page.component.html',
	styleUrls: ['./front-page.component.css'],
	providers: [
		UserService,
		VotesCategoryService,
		VotesService
	]
})
export class FrontPageComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public preloaderStatus: boolean;

	public token: string;
	public identity: any;
	public categories: any;

	public date: any;

	constructor(
		private _userService: UserService,
		private _votesCategoryService :VotesCategoryService,
		private _votesService: VotesService
	) {
		this.page_title = 'Votaciones activas';
		this.status = undefined;
		this.responseMessage = undefined;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();

		this.date = new Date();
	}

	ngOnInit() {
		this.votesCategoryList();
	}

	votesCategoryList(){
		this._votesCategoryService.votesCategoryList(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.categories = response.categories;
					if(this.identity.role != 'admin') this.dateCheck();
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

	dateCheck(){
		let array = new Array();
		this.categories.forEach(element => {
			let startDate = element.startDate.split("-");
			let startTime = element.startTime.split(":");
			let endDate = element.endDate.split("-");
			let endTime = element.endTime.split(":");
			let categoryId = element.id;
			let autorizedFlag = false;
			let autorized_categories = this.identity.autorized_categories.split('-');

			startDate = new Date(startDate[0], +startDate[1]-1, startDate[2], startTime[0], startTime[1]);
			endDate = new Date(endDate[0], +endDate[1]-1, endDate[2], endTime[0], endTime[1]);

			if((this.date - startDate) > 0 && (endDate - this.date) > 0){
				autorized_categories.forEach( element => {
					if(categoryId == +element) autorizedFlag = true;
				});
				if(autorizedFlag || this.identity.role == 'admin') array.push(element);
			}
		});

		this.categories = array;
	}
}
