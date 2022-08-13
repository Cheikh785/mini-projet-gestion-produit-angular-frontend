export class User {
    public firstname    :   String  =   "";
    public lastname     :   String  =   "";
    public address      :   String  =   "";

    constructor(
        public $_firstname  ?: String, 
        public $_lastname   ?: String, 
        public $_address    ?: String, 
        public $_user       ?: User
    ) {
        if($_firstname)     this.firstname  =   $_firstname;
        if($_lastname)      this.lastname   =   $_lastname;
        if($_address)       this.address    =   $_address;
        if ($_user) {
            this.firstname = $_user.firstname;
            this.lastname  = $_user.lastname;
            this.address   = $_user.address;
        }
    }

    public getFirstName(): String {
        return this.firstname;
    }

    public getLastName(): String {
        return this.lastname;
    }

    public getAddress(): String {
        return this.address;
    }

    public setFirstName($_firstname: String): void {
        this.firstname = $_firstname;
    }

    public setLastName($_lastname: String): void {
        this.lastname = $_lastname;
    }

    public setAddress($_address: String): void {
        this.address = $_address;
    }
}