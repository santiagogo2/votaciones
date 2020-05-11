import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PostulatesService } from '../../../services/postulates.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-postulates-edit',
	templateUrl: './postulates-edit.component.html',
	styleUrls: ['./postulates-edit.component.css'],
	providers: [
		UserService,
		PostulatesService,
		VotesCategoryService
	]
})
export class PostulatesEditComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;
	public document_name: string;
	public documentValider: boolean;
	public resetVar: boolean;

	public url: string;
	public token: string;
	public identity: any;
	public categories: any;
	public postulate: any;

	constructor(
		private _userService: UserService,
		private _postulatesService: PostulatesService,
		private _votesCategoryService: VotesCategoryService,
		private _route: ActivatedRoute
	) {
		this.url = global.url;
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.votesCategoryList();
		this.getPostulate();
	}

	votesCategoryList(){
		this._votesCategoryService.votesCategoryList(this.token).subscribe(
			response => {
				if(response.status == 'success'){
					this.categories = response.categories;
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

	getPostulate(){
		this._route.params.subscribe(params => {
			this.status = undefined;
			this.responseMessage = undefined;

			let id = +params['id'];

			this._postulatesService.getPostulate(id, this.token).subscribe(
				response => {
					if(response.status == 'success'){
						this.postulate = response.postulate;
						this.page_title = 'Editar el Postulado ' + this.postulate.name + ' ' + this.postulate.surname;
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

	onSubmit(postulateEditForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;

		if(this.documentValider) this.postulate.photo = this.document_name;

		this._postulatesService.updatePostulate(this.postulate, this.token).subscribe(
			response => {
				console.log(response);
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.page_title = 'Editar el Postulado ' + this.postulate.name + ' ' + this.postulate.surname;
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

	receiveName(data):void{
		this.document_name = data;
		this.documentValider = true;
	}
}
