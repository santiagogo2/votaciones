import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from'../../../services/user.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';
import { PostulatesService } from '../../../services/postulates.service';

@Component({
	selector: 'app-votes-category-results',
	templateUrl: './votes-category-results.component.html',
	styleUrls: ['./votes-category-results.component.css'],
	providers: [
		UserService,
		VotesCategoryService,
		PostulatesService
	]
})
export class VotesCategoryResultsComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public actualPage: number;
	public itemsPerPage: number;
	public preloaderStatus: boolean;
	public categoryId: number;
	public verifyFlag: boolean;
	public totalVotes: number;

	public token: string;
	public identity: any;
	public results: any;
	public category: any;
	public postulates: any;

	public date: any;

	constructor(
		private _userService: UserService,
		private _votesCategoryService: VotesCategoryService,
		private _postulatesService: PostulatesService,
		private _route: ActivatedRoute
	) {
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();

		this.date = new Date();
	}

	ngOnInit() {
		this.verifyFlag = false;
		this.getPostulatesByCategory();
	}

	getPostulatesByCategory(){
		this._route.params.subscribe( params =>{
			this.status = undefined;
			this.responseMessage = undefined;

			this.categoryId = +params['id'];

			this._votesCategoryService.getVoteCategory(this.categoryId, this.token).subscribe(
				response => {
					this.category = response.category;
					this.page_title = 'Resultado de las votaciones ' + this.category.name.toLowerCase();
					let endDate = this.category.endDate.split("-");
					let endTime = this.category.endTime.split(":");

					endDate = new Date(endDate[0], +endDate[1]-1, endDate[2], endTime[0], endTime[1]);

					if((endDate - this.date) < 0 || this.identity.role == 'admin'){
						this.verifyFlag = true;

						this._postulatesService.getPostulatesByCategoryWithResults(this.categoryId, this.token).subscribe(
							response => {
								this.postulates = response.postulates;
								// if(this.postulates.votes.categor)
								console.log(this.postulates);
								this.getTotalVotes();
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
	getTotalVotes(){
		let totalVotes: number;
		totalVotes = 0;
		this.postulates.forEach(element => {
			totalVotes = totalVotes + element.votes.length;
		});
		this.totalVotes = totalVotes;
	}
}
