import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-document-register',
	templateUrl: './document-register.component.html',
	styleUrls: ['./document-register.component.css'],
	providers: [UserService]
})
export class DocumentRegisterComponent implements OnInit {
	@Input() public resetVar: boolean;
	@Output() sendName: EventEmitter<any> = new EventEmitter();

	public status: string;
	public errorCode: number;
	public errorMessage: string;
	public fileStatus: string;
	public responseMessage: string;
	public documentLoad: boolean;

	public afuConfig = {
		multiple: false,
		formatsAllowed:  ".jpg, .jpeg, .png, .gif",
		maxSize: "500",
		uploadAPI:  {
			url: global.url + 'postulates/upload/image',
			headers: {
				"Authorization" : this._userService.getToken()
			}
		},
		theme: "attachPin",
		hideProgressBar: false,
		hideResetBtn: false,
		hideSelectBtn: false,
		replaceTexts: {
			attachPinBtn: 'Seleccionar Imágen',
			afterUploadMsg_success: 'Imágen cargada correctamente',
			afterUploadMsg_error: 'No se ha podido cargar la imágen'
		}
	};

	constructor(
		private _userService: UserService
	) {}

	ngOnInit() {
	}

	fileUpload(info){		
		let inputSelected = document.querySelector('.afu-attach-pin');
		inputSelected.classList.remove('correct');
		inputSelected.classList.remove('incorrect');

		if(info.response != "" && info.response != null){
			let data = JSON.parse(info.response);

			if(data.status == 'success'){
				this.fileStatus = 'success';
				this.responseMessage = data.message;

				inputSelected.classList.add('correct');
				this.passName(data.image);
			} else{
				this.fileStatus = 'error';
				this.responseMessage = data.error.message;
				inputSelected.classList.add('incorrect');
			}
		} else {			
			inputSelected.classList.add('incorrect');
		}
	}

	passName(document_name){
		this.sendName.emit(document_name);
	}
}
