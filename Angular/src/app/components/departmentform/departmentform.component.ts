import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  DepartmentData } from 'src/data';

@Component({
  selector: 'app-departmentform',
  templateUrl: './departmentform.component.html',
  styleUrls: ['./departmentform.component.css']
})
export class DepartmentformComponent implements OnInit {

  deptId!: number
  deptName!: string
  deptArray!: DepartmentData[]
  deptObj = new DepartmentData()
  
  constructor(private router: Router) {
    
  if(localStorage.getItem("hasCodeRunBefore2") === null ){
      this.deptArray = [];
      localStorage.setItem("hasCodeRunBefore2", JSON.stringify(true))
   
    }
    else{
      this.deptArray = JSON.parse(localStorage.getItem("deptArray") || "[]");
    }
  }


  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem("EditDepartment")|| '') === false){
      this.deptId = JSON.parse(localStorage.getItem("currDeptID")||'[]') 
      localStorage.setItem("currDeptID", JSON.stringify(this.deptId));
    }
    else{
      this.deptObj = JSON.parse(sessionStorage.getItem("deptObjectToEdit")||'')
      this.deptId = this.deptObj.id
      this.deptName = this.deptObj.name
      sessionStorage.setItem("EditDepartment", JSON.stringify(false))
    }
  }
  
  onClickSubmit(){
    const dept = {
      id: this.deptId,
      name: this.deptName,
    }
    this.deptArray.push(dept)
    localStorage.setItem("deptArray", JSON.stringify(this.deptArray))
  }

 submit(){
   this.router.navigate(['/department'])
  }
}
