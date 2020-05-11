import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PostulatesService } from '../../../services/postulates.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-postulates-list',
	templateUrl: './postulates-list.component.html',
	styleUrls: ['./postulates-list.component.css'],
	providers: [
		UserService,
		PostulatesService
	]
})
export class PostulatesListComponent implements OnInit {
	public page_title: string;
	public status: string;
	public errorCode: number;
	public responseMessage: string;
	public preloaderStatus: boolean;
	public actualPage: number;
	public itemsPerPage: number;

	public url: string;
	public token: string;
	public identity: any;
	public postulates: any;

	constructor(
		private _userService: UserService,
		private _postulatesService: PostulatesService
	) {
		this.page_title = 'Postulados Registrados en el Sistema';
		this.actualPage = 1;
		this.itemsPerPage = 20;

		this.url = global.url;
		this.token = this._userService.getToken();
		this.identity = this._userService.getIdentity();
	}

	ngOnInit() {
		this.postulatesList();
	}

	postulatesList(){
		this._postulatesService.postulatesList(this.token).subscribe(
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
	}

	deletePostulate(id){
		this.status = undefined;
		this.errorCode = undefined;
		this.responseMessage = undefined;
		this.preloaderStatus = true;

		this._postulatesService.deletePostulate(id, this.token).subscribe(
			response => {
				this.preloaderStatus = false;

				if(response.status == 'success'){
					this.status = 'success';
					this.responseMessage = response.message;
					this.postulatesList();
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
