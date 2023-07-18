import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TasksServiceService } from 'src/services/tasks-service.service';
import { taskAssignment } from 'src/models/tasks';
import { UsersService } from 'src/services/users.service';
import { HttpClient } from '@angular/common/http';
import { usersData } from 'src/models/users';
import { environments } from 'src/environments/environments';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
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
    status: 'assigned'
  }
  assignedDate!: string;
  todayDate = '08/20/2023';
  adminOps: boolean = false

  taskData!: taskAssignment[];
  noTasks: boolean=false;
  constructor(private actroute: ActivatedRoute, private taskservice: TasksServiceService, private userserv: UsersService, private http: HttpClient) { }

  ngOnInit(): void {

    this.userserv.getSessionInfo().subscribe((data) => {
      if (data.length > 0) {
        if (data[0].role === 'admin') {
          this.adminOps = true;
        }
      }
    })


    this.userId = this.actroute.snapshot.paramMap.get('id');
    this.taskservice.getTasks(this.userId).subscribe(
      (res) => {
        this.taskData = res;
        if(res.length<1){
          this.noTasks=true;
          // alert("No tasks found");
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
    })
  }

  getDaysLeft(assignedDate: string, dueDate: string) {
    const iniDate = new Date(assignedDate);
    const deadlin = new Date(dueDate);
    const milliSec = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs(Number(deadlin) - Number(iniDate)) / milliSec
    )
  }
  // task process
  setUserId() {
    this.userserv.getUserId(this.taskDetails.userName).subscribe((res) => {
      this.taskDetails.userid = res[0].id;
    })
  }

  onSubmit() {
    this.taskservice.postTasks(this.taskDetails);
    // window.location.reload();
    alert(`New Task Added Successfully`);
    this.ngOnInit();
  }

  deleteTask(taskId: number) {
    Swal.fire({
      title: 'Delete Confirmation',
      text: "Do You Want To Remove This Record?",
      showCancelButton: true,
      showLoaderOnConfirm: true,
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
    }
    )
  }

  singleTaskData!:taskAssignment;
  currentStatus!:string
  updateStatus(item:taskAssignment){
    this.singleTaskData=item;
    this.currentStatus=this.singleTaskData.status;
  }

  putTaskStatus(){
        this.singleTaskData.status=this.currentStatus;
    this.taskservice.putSingleTask(this.singleTaskData);
  }

  
}