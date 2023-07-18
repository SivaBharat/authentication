import { Injectable } from '@angular/core';
import { taskAssignment } from 'src/models/tasks';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class TasksServiceService {

  constructor(private http: HttpClient) { }

  tasksApi = environments.tasksApi;
  usersApi = environments.usersApi;

  getTasks(id: string | null) {
    if (id === '0') {
      const userTaskUrl = this.tasksApi;
      return this.http.get<taskAssignment[]>(userTaskUrl);
    }
    const userTaskUrl = this.tasksApi + '?userid=' + id;
    return this.http.get<taskAssignment[]>(userTaskUrl);
  }

  postTasks(taskData: taskAssignment) {
    return this.http.post(this.tasksApi, taskData).subscribe();
  }

  deleteTasks(id: number) {
    const deleteUrl = this.tasksApi + '/' + id;
    return this.http.delete(deleteUrl).subscribe();
  }

  getSingleTask(taskId: number) {
    const singleTaskUrl = this.tasksApi + '/' + taskId;
    return this.http.get<taskAssignment[]>(singleTaskUrl);

  }

  putSingleTask(taskDetails: taskAssignment) { 
    const putSingleTaskUrl = this.tasksApi + '/' + taskDetails.id;
    return this.http.put(putSingleTaskUrl, taskDetails).subscribe();

  }


}