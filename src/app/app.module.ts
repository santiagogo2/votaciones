import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';

// Front Page
import { FrontPageComponent } from './components/front-page/front-page.component';

// Users
import { IdentityGuard } from './services/identity.guard';
import { IdentityAdminGuard } from './services/identity.admin.guard';
import { IdentityJuradoGuard } from './services/identity.jurado.guard';
import { UserService } from './services/user.service';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserMassiveComponent } from './components/user/user-massive/user-massive.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserEditPasswordComponent } from './components/user/user-edit-password/user-edit-password.component';

// Documentos
import { DocumentRegisterComponent } from './components/document/document-register/document-register.component';

// Postulates
import { PostulatesVoteComponent } from './components/postulates/postulates-vote/postulates-vote.component';
import { PostulatesListComponent } from './components/postulates/postulates-list/postulates-list.component';
import { PostulatesRegisterComponent } from './components/postulates/postulates-register/postulates-register.component';
import { PostulatesEditComponent } from './components/postulates/postulates-edit/postulates-edit.component';

// Categorias de votación
import { VotesCategoryListComponent } from './components/votes-category/votes-category-list/votes-category-list.component';
import { VotesCategoryRegisterComponent } from './components/votes-category/votes-category-register/votes-category-register.component';
import { VotesCategoryEditComponent } from './components/votes-category/votes-category-edit/votes-category-edit.component';
import { VotesCategoryResultsComponent } from './components/votes-category/votes-category-results/votes-category-results.component';

@NgModule({
	declarations: [
		AppComponent,
		UserLoginComponent,
		PostulatesVoteComponent,
		UserListComponent,
		UserRegisterComponent,
		UserEditComponent,
		UserEditPasswordComponent,
		PostulatesRegisterComponent,
		DocumentRegisterComponent,
		PostulatesListComponent,
		VotesCategoryListComponent,
		VotesCategoryRegisterComponent,
		FrontPageComponent,
		PostulatesEditComponent,
		VotesCategoryEditComponent,
		VotesCategoryResultsComponent,
		UserMassiveComponent
	],
	imports: [
  		BrowserModule,
  		routing,
  		FormsModule,
  		HttpClientModule,
  		NgxPaginationModule,
  		AngularFileUploaderModule,
  		AngularFontAwesomeModule
	],
	providers: [
		appRoutingProviders,
		{provide: LocationStrategy, useClass: HashLocationStrategy},
		UserService,
		IdentityGuard,
		IdentityAdminGuard,
		IdentityJuradoGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
