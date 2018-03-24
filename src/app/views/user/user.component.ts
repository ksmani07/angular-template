import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {FlashService} from '../../services/flash.service';
import {LoaderService} from '../../services/loader.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit{
  passwordText: any;
  confirmpasswordText: any;
  @ViewChild('f') userForm: NgForm;
  geteditId: string;
  dataParms: any;
  statusDefault = 1;
  isUserEdit: boolean = false;
  username: string;
  constructor( private userService: UserService, private flashService: FlashService, private loaderService: LoaderService, private dataService: DataService, private router: Router) {}
  ngOnInit() {
    this.dataParms = this.dataService.data;
    console.log('dataParms', this.dataService.data);
    this.geteditId = (( this.dataParms && this.dataParms._id ) ? this.dataParms._id : '') ;
    console.log('ID value', this.geteditId);
    if( this.geteditId ) {
      console.log('ID is available', this.geteditId);
      this.isUserEdit = true;
      setTimeout(()=>{
        this.userFill(this.dataParms)
      }, 10);
    } else {
      console.log('ID is not available');
      this.isUserEdit = false;
    }
    this.dataService.data = {};
  }

  userFill(userData) {
    this.userForm.form.patchValue({
      firstname : userData.profile.firstname,
      lastname : userData.profile.lastname,
      email: userData.profile.email,
      contactno : userData.profile.mobileno,
      status : userData.auth.status
    });
  }

  onSubmit(userForm: NgForm) {
    console.log(userForm);
    this.loaderService.display(true);
    if(this.isUserEdit){
      this.userService.updateUser(userForm.value, this.geteditId)
        .subscribe(
          response => {
            console.log(response)
            this.loaderService.display(false);
            this.flashService.message('success', 'User Updated successfully');
            this.router.navigate(['user/list']);
          },
          error => {
            console.log(error);
            if (error.error.error.code === 11000){
              this.flashService.message('error', 'Email id already exists, Plase try other email id')
            } else {
              this.flashService.message('error', error.error.error.message)
            }
            this.loaderService.display(false);
          }
        );
    }else{
      this.userService.createUser(userForm.value)
        .subscribe(
          response => {
            console.log(response)
            this.loaderService.display(false);
            this.flashService.message('success', 'User create successfully');
            userForm.reset();
          },
          error => {
            console.log(error);
            if (error.error.error.code === 11000){
              this.flashService.message('error', 'Email id already exists, Plase try other email id')
            } else {
              this.flashService.message('error', error.error.error.message)
            }
            this.loaderService.display(false);
          }
        );
    }
  }

}
