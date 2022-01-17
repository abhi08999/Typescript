/**
 * ModelBase
 */
 export class BaseModal{
    id!: number//id type number
    name!: string//name type string
    constructor() {}
}

/**
 * Employee Object
 */
 export class EmployeeData extends BaseModal{
    age!: number//type number
    constructor() {super()}
}

/**
 * Department Object
 */
export class DepartmentData extends BaseModal{
    constructor() {super()}
}