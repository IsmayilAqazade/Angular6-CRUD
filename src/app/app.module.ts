import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RoutingModule} from './routing.module';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {HeaderComponent} from './pages/header/header.component';
import {AuthService} from './service/auth.service';
import {UserService} from './service/user.service';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BootstrapGrowlModule} from './shared/growl/bootstrap-growl.module';
import {ModalService} from './shared/modal/modal.service';
import {AddUserComponent} from './pages/addUser/addUser.component';
import {UpdateUserComponent} from './pages/updateUser/updateUser.component';
import {DeleteUserComponent} from './pages/deleteUser/deleteUser.component';
import {AuthModule} from './module/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    AddUserComponent,
    UpdateUserComponent,
    DeleteUserComponent

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    AuthModule.forRoot(),
    ReactiveFormsModule,
    BootstrapGrowlModule.forRoot(),
    HttpClientModule

  ],
  providers: [
    AuthService,
    UserService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
