import { Pipe, PipeTransform } from '@angular/core';
import { taskAssignment } from 'src/models/tasks';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {

  transform(tasks:taskAssignment[], term: string): taskAssignment[] {
    if (tasks===undefined || term==='') return tasks;
    return tasks.filter((task: any)=>{
      return task.title.toLowerCase().includes(term.toLowerCase());
    })
  }

}