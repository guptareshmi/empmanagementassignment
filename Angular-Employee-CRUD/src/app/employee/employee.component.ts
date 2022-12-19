import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeServiceService } from '../_helpers/employee-service.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any;
  modalRef: any;
  employeeData: any;
  addForm!: FormGroup;
  bsModalRef!: BsModalRef;
  submitted: boolean = false;
  @ViewChild('content') elContent: any;
  constructor(private _employee: EmployeeServiceService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.setFormState();
    this.getAllEmployees();
  }
  setFormState() {
    this.addForm = new FormGroup({
      empId: new FormControl(''),
      fname: new FormControl(''),
      lname: new FormControl(''),
      emailId: new FormControl(''),
      dept: new FormControl('')
    }
    );
  }

  getAllEmployees() {
    this._employee.getEmployees().subscribe(res => {
      this.employeeData = res;
    })
  }

  addUser() {
    console.log(this.addForm.value);
    this._employee.addEmployee(this.addForm.value).subscribe(res => {
      console.log(res);
    })
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
  }

  openLoginModal(content: any) {
    this.bsModalRef = this.modalService.show(content);
  }

  edit(employeeId: any) {
    let empdata = this.employeeData.data.find((u: any) => u.empId === employeeId);
    console.log(empdata)
    this.addForm.patchValue(empdata);
    this.bsModalRef = this.modalService.show(this.elContent);
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this record!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, Keep it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._employee.deleteEmployee(id).subscribe(res => {
          this.getAllEmployees();
          Swal.fire(
            'Deleted!',
            'user data has been deleted.',
            'success'
          )
        });

      } else {
        Swal.fire(
          'Cancel!',
          'Your record is safe',
          'error'
        )
      }
    })
  }

}