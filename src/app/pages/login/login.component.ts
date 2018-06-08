import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {BootstrapGrowlService} from '../../shared/growl/bootstrap-growl.service';
import {BootstrapAlertType} from '../../shared/growl/bootstrap-alert-type.enum';
interface User {
  email: String;
  password: String;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  invalidLogin = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router, private authService: AuthService,
              private bootstrapGrowlService: BootstrapGrowlService) {
    if (authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(value: any): void {
    this.checkEmailAndPassword();
  }

  private checkEmailAndPassword(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).subscribe(data => {
        this.bootstrapGrowlService.addAlert('Successfully Signed in', BootstrapAlertType.SUCCESS, 3000, true);
        localStorage.setItem('currentUser', JSON.stringify(data));
        localStorage.setItem('isAuthenticated', 'true');
        this.router.navigate(['home']);
        this.invalidLogin = false;
      },
      error => {
        this.bootstrapGrowlService.addAlert(error.error.error, BootstrapAlertType.DANGER, 3000, true);
        this.invalidLogin = true;
        localStorage.setItem('currentUser', JSON.stringify(''));
        localStorage.setItem('isAuthenticated', 'false');
      }
    );
  }

}
