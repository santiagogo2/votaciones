// IMPORTS NECESARIOS
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTAR LOS COMPONENTES

// FRONT PAGE
import { FrontPageComponent } from './components/front-page/front-page.component';

// USUARIOS
import { IdentityGuard } from './services/identity.guard';
import { IdentityAdminGuard } from './services/identity.admin.guard';
import { IdentityJuradoGuard } from './services/identity.jurado.guard';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserMassiveComponent } from './components/user/user-massive/user-massive.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserEditPasswordComponent } from './components/user/user-edit-password/user-edit-password.component';

// POSTULADOS
import { PostulatesVoteComponent } from './components/postulates/postulates-vote/postulates-vote.component';
import { PostulatesListComponent } from './components/postulates/postulates-list/postulates-list.component';
import { PostulatesRegisterComponent } from './components/postulates/postulates-register/postulates-register.component';
import { PostulatesEditComponent } from './components/postulates/postulates-edit/postulates-edit.component';

// CATEGORÍAS DE VOTACIÓN
import { VotesCategoryListComponent } from './components/votes-category/votes-category-list/votes-category-list.component';
import { VotesCategoryRegisterComponent } from './components/votes-category/votes-category-register/votes-category-register.component';
import { VotesCategoryEditComponent } from './components/votes-category/votes-category-edit/votes-category-edit.component';
import { VotesCategoryResultsComponent } from './components/votes-category/votes-category-results/votes-category-results.component';

// DEFINIR LAS RUTAS
const appRoutes: Routes = [
	{ path: '', component:  UserLoginComponent },
	{ path: 'iniciar-sesion', component: UserLoginComponent},
	{ path: 'logout/:sure', component: UserLoginComponent},

	{ path: 'inicio', component:  FrontPageComponent, canActivate:[IdentityGuard] },

	{ path: 'listar-usuarios', component: UserListComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{ path: 'registrar-usuario', component: UserRegisterComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{ path: 'registrar-usuarios-masivo', component: UserMassiveComponent, canActivate: [IdentityGuard]},
	{ path: 'editar-usuario/:id', component: UserEditComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{ path: 'editar-password-usuario/:id', component: UserEditPasswordComponent, canActivate: [IdentityGuard]},

	{ path: 'votar/:category', component: PostulatesVoteComponent, canActivate: [IdentityGuard]},
	{ path: 'listar-postulados', component: PostulatesListComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{ path: 'registrar-postulado', component: PostulatesRegisterComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{ path: 'editar-postulado/:id', component: PostulatesEditComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},

	{ path: 'listar-categorias-votacion', component:VotesCategoryListComponent, canActivate: [IdentityGuard, IdentityJuradoGuard]},
	{ path: 'registrar-categorias-votacion', component:VotesCategoryRegisterComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{ path: 'editar-categorias-votacion/:id', component:VotesCategoryEditComponent, canActivate: [IdentityGuard, IdentityAdminGuard]},
	{ path: 'ver-resultados/:id', component: VotesCategoryResultsComponent, canActivate: [IdentityGuard, IdentityJuradoGuard]}
];

// EXPORTAR LA CONFIGURACIÓN
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);