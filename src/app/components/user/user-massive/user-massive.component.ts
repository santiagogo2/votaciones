import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { UserService } from '../../../services/user.service';
import { global } from '../../../services/global';

@Component({
	selector: 'app-user-massive',
	templateUrl: './user-massive.component.html',
	styleUrls: ['./user-massive.component.css'],
	providers: [
		UserService
	]
})
export class UserMassiveComponent implements OnInit {
	public page_title: string;
	public file: any;
	public arrayBuffer: any;
	public actualPage: number;
	public itemsPerPage: number;
	public preloaderStatus: boolean;
	public preloader2Status: boolean;
	public status: string;
	public responseMessage: string;
	public successesMessage: string;
	public errorLoadMessage: string;

	public token: string;
	public users: any;

	constructor(
		private _userService: UserService
	) {
		this.page_title = 'Subir usuarios';
		this.actualPage = 1;
		this.itemsPerPage = 30;
	}

	ngOnInit() {
		this.token = this._userService.getToken();
	}

	registerMassive(){
		this.preloader2Status = true;
		this.successesMessage = undefined;
		this.errorLoadMessage = undefined;

		this._userService.newMassiveUser(this.users, this.token).subscribe(
			response => {
				this.preloader2Status = false;
				if(response.status == 'success'){
					this.successesMessage = 'Se han guardado correctamente ' + response.successes + ' usuarios';
					if(+response.errors != 0) {
						this.errorLoadMessage = 'No se han podido guardar ' + response.errors + ' usuarios. ' + response.errorsMessage;
					}
				}
			},
			error => {
				this.preloader2Status = false;
				this.errorLoadMessage = 'Ha ocurrido un error al intentar guardar los usuarios importados';
			}
		);
	}

	addFile(event){
		this.status = undefined;
		this.responseMessage = undefined;
		this.users = undefined;
		this.preloaderStatus = true;

		this.file = event.target.files[0];
		let fileReader = new FileReader();
		fileReader.readAsArrayBuffer(this.file);
		fileReader.onload = (element) => {
			this.arrayBuffer = fileReader.result;
			var data = new Uint8Array(this.arrayBuffer);
			var arr = new Array();
			for(var i=0; i!=data.length; i++){
				arr[i] = String.fromCharCode(data[i]);
			}
			var bstr = arr.join("");
			var workbook = XLSX.read(bstr, {type: "binary"});
			var first_sheet_name = workbook.SheetNames[0];
			var worksheet = workbook.Sheets[first_sheet_name];
			let arrayData = XLSX.utils.sheet_to_json(worksheet, {raw: true});
			let documentHeader = this.getKeys(arrayData[0]);
			let flag = false;

			documentHeader.forEach(element => {
				if(element.key == 'id_number' || element.key == 'name' ||
				   element.key == 'surname' || element.key == 'password' ||
				   element.key == 'autorized_categories'){
					flag = true;
				} else {
					flag = false;
				}
			});

			if(flag){
				this.preloaderStatus = false;
				this.users = arrayData;
			} else {
				this.preloaderStatus = false;
				this.status = 'error';
				this.responseMessage = 'Debe cargar el archivo con los siguientes indicies: id_number: Número de cédula; name: Nombre; surname: Apellidos; password: Contraseña; autorized_categories: Votaciones autorizadas';

			}
		}
	}

	getKeys(obj){
		return Object.keys(obj).map( x => {
			return {
				key: x,
				value: obj[x]
			}
		});
	}

	pageChange(event){
		this.actualPage = event;
	}
}
