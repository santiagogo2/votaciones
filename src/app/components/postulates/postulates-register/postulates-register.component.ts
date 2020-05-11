import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PostulatesService } from '../../../services/postulates.service';
import { VotesCategoryService } from '../../../services/votesCategory.service';
import { Postulate } from '../../../models/postulate';

@Component({
	selector: 'app-postulates-register',
	templateUrl: './postulates-register.component.html',
	styleUrls: ['./postulates-register.component.css'],
	providers: [
		UserService,
		PostulatesService,
		VotesCategoryService
	]
})
export class PostulatesRegisterComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public validationMessage: string;
	public preloaderStatus: boolean;
	public document_name: string;
	public documentValider: boolean;
	public resetVar: boolean;

	public token: string;
	public identity: any;
	public postulate: Postulate;
	public categories: any;

	constructor(
		private _userService: UserService,
		private _postulateService: PostulatesService,
		private _votesCategoryService: VotesCategoryService
	) {
		this.page_title = 'Crear Postulado';
		this.status = undefined;
		this.responseMessage = undefined;

		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
		this.postulate = new Postulate(1,null,null,null,null,null,null);
	}

	ngOnInit(){
		this.votesCategoryList();
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

	onSubmit(postulateRegisterForm){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.validationMessage = undefined;
		this.preloaderStatus = true;
		this.postulate.photo = null;
		this.resetVar = false;

		if(this.documentValider) this.postulate.photo = this.document_name;

		this._postulateService.newPostulate(this.postulate, this.token).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.resetVar = true;
					postulateRegisterForm.reset();
					
					let inputSelected = document.querySelector('.afu-attach-pin');
					inputSelected.classList.remove('correct');
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
