import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentData } from 'src/data';
import { BaseComponent } from '../base/base.component';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent extends BaseComponent<DepartmentData> implements OnInit {

  totalDeptData: DepartmentData[] = []
  deptData: DepartmentData[] = []
  
  currentpage:number=1
  totalPages:number=1
  numberOfRecordsPerPage:number=3
  filter:any
  constructor(private router: Router) {
    super()//calling base class constructor
   }

  ngOnInit(): void {
    if(localStorage.getItem("currentPageDept") === null){
      localStorage.setItem("currentPageDept", JSON.stringify(1))
    }
  sessionStorage.setItem("EditDepartment", JSON.stringify(false));
  this.totalDeptData = JSON.parse(localStorage.getItem("deptArray") || "[]");
  this.setPageData();
    
}
//***********pagination******************************************************************************* */
setPageData(){
  this.totalPages = Math.ceil(this.totalDeptData.length/this.numberOfRecordsPerPage)
  this.currentpage = JSON.parse(localStorage.getItem("currentPageDept")||'1')

  // calling Generic paginate funtion to obtain trimmed data in correspondance to page number.
  this.deptData = this.paginate(this.totalDeptData, this.currentpage, this.numberOfRecordsPerPage)
}

/** Pagination Helper Functions */
first(key:string){
  this.firtPage(key, this.currentpage)
  this.setPageData()
}

prev(key:string){
  this.prevPage(key, this.currentpage)
  this.setPageData()
}

next(key:string){
  this.nextPage(key,this.currentpage,this.totalPages)
  this.setPageData()

}

last(key:string){
  this.lastPage( key,this.currentpage, this.totalPages)
  this.setPageData()
}
//********************EditData********************************************************************************************* */

  /**
  * @param obj Employee object which is to be edited.
  */

   Edit(obj: DepartmentData){
    const idx = this.totalDeptData.indexOf(obj)//index of object to be edited
    this.totalDeptData.splice(idx, 1)//to modify content of array by removing existing element.
    sessionStorage.setItem("deptObjectToEdit", JSON.stringify(obj))
    localStorage.setItem("deptArray",JSON.stringify(this.totalDeptData))
    sessionStorage.setItem("EditDepartment",JSON.stringify(true))
 
    this.router.navigate(['/departmentform'])
  }
  //*****************************Delete************************************************************************************************** */
/** 
 * @param emp object which is to be delete
*/
delete(emp:DepartmentData,arrayName:string){
  this.deleteData(this.totalDeptData,emp,arrayName)
  this.setPageData();
}
//****************sorting*********************************************************************************** */
 /**
   * @param key Column name according to which data is to be sorted.
   */
  sort(key: string){
    const arr = this.sortData(this.totalDeptData, key)
    this.deptData = arr;
    this.setPageData()
  }
//********************searching**************************************************************************************************** */
search(){
  this.totalDeptData = this.searchData(this.totalDeptData, this.filter)
  this.setPageData()
}
//************clear************************************************************************************************************** */
clear(){
  this.filter = ''
  this.totalDeptData = JSON.parse(localStorage.getItem("deptArray") || "[]")
  this.setPageData()
}

}
