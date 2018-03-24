import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {LoaderService} from '../../../services/loader.service';
import {UserService} from '../../../services/user.service';
import 'rxjs/add/operator/map';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {FlashService} from '../../../services/flash.service';
import swal from 'sweetalert2';
class Person{
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: boolean;
  contactno: number;
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  persons: Person[] = [];
  dtTrigger: Subject<any> = new Subject();
  constructor(private flashService: FlashService, private router: Router, private loaderService: LoaderService, private userService: UserService, private dataService:DataService) {}
  @Output() getEdit: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
     this.dtOptions = {
       pagingType: 'full_numbers',
       pageLength: 6,
       lengthChange: false
     };
     this.userService.getUser()
       .map(this.extractData)
       .subscribe(persons => {
         console.log('persons', persons);
         this.persons = persons;
         // Calling the DT trigger to manually render the table
         this.dtTrigger.next();
       });
   }

   extractData(res: Response) {
    console.log(res);
    //const body = res.json();
    return res['obj'] || {};
  }
  onEdit(id, index) {
   // this.getEdit.emit(id);
    this.dataService.data = this.persons[index];
    this.router.navigate(['user']);
  }
  onDelete(id, index){
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.loaderService.display(true);
        this.userService.deleteUser(id)
          .subscribe(
            response => {
              this.loaderService.display(false);
              this.persons.splice(index,1);
              swal(
                'Deleted!',
                'Your  has been deleted.',
                'success'
              );
            },
            error => {
              this.flashService.message('error', error.error.error.message);
              this.loaderService.display(false);
            }
          );
      }
    });
  }
}
