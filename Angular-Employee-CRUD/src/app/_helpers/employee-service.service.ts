import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private _httpService: HttpClient) {

   }

   getEmployees(){
    return this._httpService.get('https://ml.thelightbulb.ai/api/employees');
   }
   addEmployee(user:any){
    return this._httpService.post('https://ml.thelightbulb.ai/api/employees', user)
  }
  getEmployee(emp:any){
    return this._httpService.delete(`https://ml.thelightbulb.ai/api/employees/${emp}`)
  }
  updateEmployee(user:any){
    return this._httpService.put('https://ml.thelightbulb.ai/api/employees/',user)
  }
  deleteEmployee(emp:any){
    return this._httpService.delete(`https://ml.thelightbulb.ai/api/employees/${emp}`)
  }
}
