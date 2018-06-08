import {Component, OnInit} from '@angular/core';
import {BootstrapGrowlService} from '../../shared/growl/bootstrap-growl.service';
import {AuthService} from '../../service/auth.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../model/user.model';
import {UserService} from '../../service/user.service';
import {map} from 'rxjs/operators';
import {ModalService} from '../../shared/modal/modal.service';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users: User[];
  action  = new BehaviorSubject<string>('');
  selectedUser: User ;
  constructor(private formBuilder: FormBuilder,
              private router: Router, private authService: AuthService,
              private bootstrapGrowlService: BootstrapGrowlService,
              private userService: UserService,
              private modalService: ModalService
              ) {  }

  ngOnInit(): void {
    this.userService.getUsers().pipe(map(res => {
      return res['data'];
    }))
      .subscribe(data => {
        this.users = data;
      });
  }

  showModal(param): void {
    this.selectedUser = arguments.length > 1 ? arguments[1] : -1;
    this.action.next(param);
    console.log(this.action)
      this.modalService.showModal();

  }


}
