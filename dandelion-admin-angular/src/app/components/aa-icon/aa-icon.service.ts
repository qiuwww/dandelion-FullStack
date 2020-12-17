// dandelion-admin-angular qww$ ng g service components/aa-icon/aa-icon --module components/aa-icon
// service就是一个方法集，不需要导入到module中
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AaIconService {
  constructor() { }
}
