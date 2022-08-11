export class User {
    public id?: Number;
    public firstname: String;
    public lastname: String;
    public address: String;

    constructor(public $_firstname: String, public $_lastname: String, public $_address: String) {
        this.firstname = $_firstname;
        this.lastname = $_lastname;
        this.address = $_address;
    }
}