import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PostulatesService } from '../../../services/postulates.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';
import { VotesService } from '../../../services/votes.service';
import { global } from '../../../services/global';
import { Votes } from '../../../models/votes';

@Component({
	selector: 'app-postulates-vote',
	templateUrl: './postulates-vote.component.html',
	styleUrls: ['./postulates-vote.component.css'],
	providers: [
		UserService,
		PostulatesService,
		VotesCategoryService,
		VotesService
	]
})
export class PostulatesVoteComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;
	public authorization: boolean;
	public voteMessage: string;
	public voteRegister: boolean;
	public verifyFlag: boolean;

	public token: string;
	public identity: any;
	public url: string;
	public postulates: any;
	public category: any;
	public votes: Votes;

	public date: any;

	constructor(
		private _userService: UserService,
		private _postulatesService: PostulatesService,
		private _votesCategoryService: VotesCategoryService,
		private _votesService: VotesService,
		private _router: Router,
		private _route: ActivatedRoute
	) {
		this.actualPage = 1;
		this.itemsPerPage = 10;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.url = global.url;
		this.votes = new Votes(1,null,null,null);
		this.authorization = true;
		this.voteRegister = false;

		this.date = new Date();
	}

	ngOnInit() {
		this.getPostulatesByCategory();
	}

	getPostulatesByCategory(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.responseMessage = undefined;
			this.validationMessage = undefined;
			this.verifyFlag = false;

			let categoryId = +params['category'];

			// Verificar si el usuario tiene autorización para votar
			let autorizedFlag = false;

			let autorized_categories = this.identity.autorized_categories.split('-');
			autorized_categories.forEach( element => {
				if(categoryId == +element) autorizedFlag = true;
			});
			if(this.identity.role == 'admin') autorizedFlag = true;

			if(!autorizedFlag){
				this.status = 'error';
				this.responseMessage = 'Usted no está autorizado para realizar esta votación';
			} else {
				this._votesCategoryService.getVoteCategory(categoryId, this.token).subscribe(
					response => {
						if(response.status == 'success'){
							this.category = response.category;
							this.page_title = 'Votaciones ' + this.category.name.toLowerCase();
							let startDate = this.category.startDate.split("-");
							let startTime = this.category.startTime.split(":");
							let endDate = this.category.endDate.split("-");
							let endTime = this.category.endTime.split(":");

							startDate = new Date(startDate[0], +startDate[1]-1, startDate[2], startTime[0], startTime[1]);
							endDate = new Date(endDate[0], +endDate[1]-1, endDate[2], endTime[0], endTime[1]);

							if(((this.date - startDate) > 0 && (endDate - this.date) > 0) || this.identity.role == 'admin'){
								this.verifyFlag = true;
								this._votesService.verifyAuthorizationVote(this.identity.sub, this.category.id, this.token).subscribe(
									response => {
										this._postulatesService.getPostulatesByCategory(categoryId, this.token).subscribe(
											response => {
												if(response.status == 'success'){
													this.postulates = response.postulates;
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
									},
									error => {
										this.authorization = false;
										this.voteMessage = error.error.message + this.category.name.toLowerCase();
										console.log(<any>error);
									}
								);
							}
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

		});
	}

	vote(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		this.votes.user_id = this.identity.sub;
		this.votes.postulates_id = id;
		this.votes.votes_category_id = this.category.id;

		this._votesService.newVote(this.votes, this.token).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.voteRegister = true;
					this.voteMessage = response.message;
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

	pageChange(event){
		this.actualPage = event;
	}	
}
