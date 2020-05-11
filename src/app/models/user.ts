export class User{
	constructor(
		public id: number,
		public id_number: string,
		public name: string,
		public surname: string,
		public role: string,
		public password: string,
		public autorized_categories: string
	){}
}