import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './Components/menu/menu.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { DatePipe } from '@angular/common';
import { ReadMeComponent } from './Components/read-me/read-me.component';
import { AboutMeComponent } from './Components/about-me/about-me.component';

export const routes: Routes = [
  { path: 'app-menu', component: MenuComponent },
  { path: 'app-user-details', component: UserDetailsComponent },
  {path: 'app-user-list', component : UserListComponent},
   {path: 'app-read-me', component : ReadMeComponent},
   {path: 'app-about-me', component : AboutMeComponent},


  
  { path: 'edit-user/:id', component: UserDetailsComponent },
  { path: 'add-policy/:id', component: UserDetailsComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes), HttpClientModule, ReactiveFormsModule, FormsModule,DatePipe],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }