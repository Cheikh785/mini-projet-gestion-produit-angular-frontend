export class Product {
    private id?: Number;
    private name: String;
    private price: Number;
    private quantity: Number;
    private image: String;

    constructor(public $_name: String, public $_price: Number, public $_quantity: Number, public $_image: String) {
        this.name = $_name;
        this.price = $_price;
        this.quantity = $_quantity;
        this.image = $_image;
    }
}