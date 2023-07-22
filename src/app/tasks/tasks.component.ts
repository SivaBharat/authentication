import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { TasksServiceService } from 'src/services/tasks-service.service';
import { taskAssignment } from 'src/models/tasks';
import { UsersService } from 'src/services/users.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  userId!: string | null;
  userNames: string[] = [];
  taskDetails: taskAssignment = {
    userid: 0,
    title: '',
    id: 0,
    assignedDate: '',
    dueDate: '',
    userName: '',
    status: 'assigned',
    assignedBy: '',
  };
  assignedDate!: string;

  todayDate = '08/20/2023';
  adminOps: boolean = false;

  taskData!: taskAssignment[];
  noTasks: boolean = false;
  filterTerm: string = '';
  sortingParam: string = '';
  sortingDirection: string = '';
  optionSelected: string = '';
  taskDone: boolean = false;

  onSelectingOption(event: any) {
    this.optionSelected = event.target.value;
    console.log(this.optionSelected);
    if (this.optionSelected === 'uasc') {
      (this.sortingParam = 'userName'), (this.sortingDirection = 'asc');
    } else if (this.optionSelected === 'udesc') {
      (this.sortingParam = 'userName'), (this.sortingDirection = 'desc');
    } else if (this.optionSelected === 'statassng') {
      (this.sortingParam = 'status'), (this.sortingDirection = 'assigned');
    } else if (this.optionSelected === 'statpending') {
      (this.sortingParam = 'status'), (this.sortingDirection = 'Pending');
    } else if (this.optionSelected === 'statdone') {
      (this.sortingParam = 'status'), (this.sortingDirection = 'Done');
    }
  }
  constructor(
    private actroute: ActivatedRoute,
    private taskservice: TasksServiceService,
    private userserv: UsersService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userserv.getSessionInfo().subscribe((data) => {
      if (data.length > 0) {
        if (data[0].role === 'admin') {
          this.adminOps = true;
          this.taskDetails.assignedBy = data[0].firstName;
        }
      }
      this.todayDate=new Date().toLocaleDateString();
      this.taskDetails.assignedDate=this.todayDate;     
      console.log(this.todayDate);
    });

    this.userId = this.actroute.snapshot.paramMap.get('id');
    this.taskservice.getTasks(this.userId).subscribe((res) => {
      this.taskData = res;
      if (res.length < 1) {
        this.noTasks = true;
        
      }
    });

    const d = new Date();
    this.assignedDate = d.toUTCString();

    this.userserv.getUserData().subscribe((res) => {
      for (const u of res) {
        if (u.role === 'user') {
          this.userNames.push(u.firstName);
        }
      }
    });
  }

  getDaysLeft(assignedDate: string, dueDate: string) {
    const iniDate = new Date(assignedDate);
    const deadlin = new Date(dueDate);
    const milliSec = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(Number(deadlin) - Number(iniDate)) / milliSec);
  }
  
  setUserId() {
    this.userserv.getUserId(this.taskDetails.userName).subscribe((res) => {
      this.taskDetails.userid = res[0].id;
    });
  }

  onSubmit() {
    this.taskservice.postTasks(this.taskDetails);
    alert(`New Task Added Successfully`);
    this.ngOnInit();
  }

  deleteTask(taskId: number) {
    Swal.fire({
      title: 'Delete Confirmation',
      text: 'Do You Want To Remove This Record?',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskservice.deleteTasks(taskId);
        Swal.fire({
          icon: 'success',
          title: `Record Deleted`,
          timer: 3000,
        });
        this.ngOnInit();
      }
    });
  }

  singleTaskData!: taskAssignment;
  currentStatus!: string;
  updateStatus(item: taskAssignment) {
    this.singleTaskData = item;
    this.currentStatus = this.singleTaskData.status;
  }

  putTaskStatus() {
    this.singleTaskData.status = this.currentStatus;
    this.taskservice.putSingleTask(this.singleTaskData);
  }

  adminEdit(item:taskAssignment){
    this.taskDetails=item;
  };
  adminEditPut(){
    this.taskservice.putAdminUpdate(this.taskDetails,this.taskDetails.id);
  }
}