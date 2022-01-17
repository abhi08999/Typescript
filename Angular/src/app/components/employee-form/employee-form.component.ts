import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/data';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {


  empId!: number
  empName!: string
  empAge!: number
  empArray!: EmployeeData[]
  empObj = new EmployeeData()

  constructor(private router: Router) {
     if(localStorage.getItem("hasCodeRunBefore1") === null ){
      this.empArray = [];
      localStorage.setItem("hasCodeRunBefore1", JSON.stringify(true))
    }
    else{
      this.empArray = JSON.parse(localStorage.getItem("empArray") || "[]");
    }

  }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem("EditEmployee")|| '') === false){
      
      this.empId = JSON.parse(localStorage.getItem("currEmpID")||'') 
      localStorage.setItem("currEmpID", JSON.stringify(this.empId));
    }
    else{
      this.empObj = JSON.parse(sessionStorage.getItem("empObjectToEdit")||'')
      this.empId = this.empObj.id
      this.empName = this.empObj.name
      this.empAge = this.empObj.age
      sessionStorage.setItem("EditEmployee", JSON.stringify(false))
    }
  }
    
    
  

  onClickSubmit(){
    const emp = {
      id: this.empId,
      name: this.empName,
      age: this.empAge
    }
    this.empArray.push(emp);
    localStorage.setItem("empArray", JSON.stringify(this.empArray))
  }

  submit(){
    this.router.navigate(['./employee'])
  }
}

