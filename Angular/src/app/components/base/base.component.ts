import { Component, OnInit } from '@angular/core';
import { BaseModal } from 'src/data';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent <T extends BaseModal> {
   
    sortOrder : boolean = true

  constructor() { }
  

  //***********************pagination Data*********************************************************************** */
 /**
     * Pagiantion Data Extraction
     * @param objArray Array of objects.
     * @param currentpage Page number .
     * @param numberOfRecordsPerPage records per page.
     * @returns Data(Array of objects) extracted for particular page number.
     */
    public paginate(objArray:Array<T>, currentpage:number,numberOfRecordsPerPage: number) : Array<T>{

        const begin  = (currentpage - 1) * numberOfRecordsPerPage
        const End = begin +numberOfRecordsPerPage
        const EmpData = objArray.slice(begin, End)
        return EmpData;
    }

    ///////////////////// Pagination helper function /////////////////////////
    /**
     * 
     * @param key Localstorage key name
     * @param currentpage Page number
     */
    firtPage(key: string, currentpage: number): void{
        if(currentpage > 1){
            localStorage.setItem(key, JSON.stringify(1))
        }
    }

    /**
     * 
     * @param key Localstorage key name
     * @param currentpage Page number
     */
    prevPage(key: string, currentpage: number){
        if(currentpage > 1){
            localStorage.setItem(key, JSON.stringify(currentpage - 1))
        }
    }

    /**
     * 
     * @param key Localstorage key name
     * @param currentpage Page number
     * @param totalPages number of pages
     */
    nextPage(key: string, currentpage: number, totalPages: number){
        if(currentpage < totalPages){
            localStorage.setItem(key, JSON.stringify(currentpage + 1))
        }
    }

    /**
     * 
     * @param key Localstorage key name
     * @param currentpage Page number
     * @param totalPages number of pages
     */
    lastPage(key: string, currentpage: number, totalPages: number){
        if(currentpage < totalPages){
            localStorage.setItem(key, JSON.stringify(totalPages))
        }
    }

 
  //*******************delete********************************************************************************************************* */


  /** 
    * @param objArray Array of objects.
     * @param obj object to be deleted.*
     * */
  public deleteData(objArray:Array<T>, obj: T, arrayName: string){
    if(confirm("Do you want to delete this record ?")){
        const idx = objArray.indexOf(obj)
        objArray.splice(idx,1)
        localStorage.setItem(arrayName, JSON.stringify(objArray))
    }
}

//************************sorting*********************************************************************************************************** */
  /**
     * Sort Function
     * @param objArray Array of objects.
     * @param sortOrder order(ascending/descending) to sort data.
     * @param key Column name according to which data is to be sorted.
     * @returns sorted array of objects
     */
   public sortData(objArray:Array<any>, key = 'id'): Array<T>{
    /** If passed key is a numerical parameter*/
    if(typeof objArray[0][key] === "number"){
        if(this.sortOrder){
            objArray.sort((a, b)=>{
                return a[key] - b[key]
            })
        }
        else{
            objArray.sort((a, b)=>{
                return b[key] - a[key]
            })
        }
    }
    /** If passed key is a string parameter*/
    else if(typeof objArray[0][key] === "string"){
        if(this.sortOrder){
            objArray.sort((a, b)=>{
                if (a[key] < b[key]) return -1
                return a[key] > b[key] ? 1 : 0
            })
        }
        else{
            objArray.sort((a, b)=>{
                if (a[key] > b[key]) return -1
                return a[key] < b[key] ? 1 : 0
            })
        }
    }

    this.sortOrder = !this.sortOrder
    return objArray
}
//********************searching************************************************************************* */
 /**
     * Search Function
     * @param objArray Array of objects.
     * @param searchValue value to be searched in given array of objects.
     * @returns resultant array with matching values.
     */
  public searchData(objArray:Array<any>, searchValue: string): Array<T>{
    const searchRegExp = new RegExp(searchValue , 'i');
    if(searchValue.match(/^[a-z]/i)){
        const result = objArray.filter((obj)=>{ 
            return searchRegExp.test(obj.name)
        })
        return result
    }

    const result = objArray.filter((obj)=>{ 
        return searchRegExp.test(obj.age)
    })
    return result
}


}