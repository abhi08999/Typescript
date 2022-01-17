import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeData } from 'src/data';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})  
export class EmployeeComponent extends BaseComponent<EmployeeData> implements OnInit{

  empData: EmployeeData[]=[]
  
  totalEmpData: EmployeeData[] = []

  currentpage:number=1
  totalPages:number=1
  numberOfRecordsPerPage:number=3

  filter:any
  

    constructor(private router: Router) {
      super() // calling constructor of base class
    }
    ngOnInit(){
      if(localStorage.getItem("currentPageEmp") === null){
        localStorage.setItem("currentPageEmp", JSON.stringify(1))
      }
    
      // Setting the fromEditEmployee variable false
      sessionStorage.setItem("EditEmployee", JSON.stringify(false));
      this.totalEmpData = JSON.parse(localStorage.getItem("empArray") || "[]")
  
      this.setPageData();
    
    }
  
    setPageData(){
      this.totalPages = Math.ceil(this.totalEmpData.length/this.numberOfRecordsPerPage)
      this.currentpage = JSON.parse(localStorage.getItem("currentPageEmp")||'1')
  
      // calling Generic paginate funtion to obtain trimmed data in correspondance to page number.
      this.empData = this.paginate(this.totalEmpData, this.currentpage, this.numberOfRecordsPerPage)
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

//********************clear ************************************************************************************* */

clear(){
  this.filter = ''
  this.totalEmpData = JSON.parse(localStorage.getItem("empArray") || "[]")
  this.setPageData()
}
  //********************DeleteData****************************************************************************************** */
/** 
 * @param emp object which is to be delete
*/
  delete(emp:EmployeeData,arrayName:string){
  this.deleteData(this.totalEmpData,emp,arrayName)
  this.setPageData();
}
     
  /**
  * @param obj Employee object which is to be edited.
  */

 Edit(obj: EmployeeData){
   const idx = this.totalEmpData.indexOf(obj)//index of object to be edited
   this.totalEmpData.splice(idx, 1)//to modify content of array by removing existing element.
   sessionStorage.setItem("empObjectToEdit", JSON.stringify(obj))
   localStorage.setItem("empArray",JSON.stringify(this.totalEmpData))
   sessionStorage.setItem("EditEmployee",JSON.stringify(true))

   this.router.navigate(['/employeeform'])
 }

//***************sorting*************************************************************************************** */
  /**
   * @param key Column name according to which data is to be sorted.
   */
   sort(key: string){
    const arr = this.sortData(this.totalEmpData, key)
    this.empData = arr;
    this.setPageData()
  }

  //****************searching******************************************************************************* */
  search(){
    this.totalEmpData = this.searchData(this.totalEmpData, this.filter)
    this.setPageData()
  }
}