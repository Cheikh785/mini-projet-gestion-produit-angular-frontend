export class Product {
    name        :   String;
    price       :   Number;
    quantity    :   Number;
    image       :   String;

    constructor($_name: String, $_price: Number, $_quantity: Number, $_image: String) {
        this.name       =   $_name;
        this.price      =   $_price;
        this.quantity   =   $_quantity;
        this.image      =   $_image;
    }

    public getName(): String {
        return this.name;
    }

    public getPrice(): Number {
        return this.price;
    }

    public getQuantity(): Number {
        return this.quantity;
    }

    public getImage(): String {
        return this.image;
    }

    public setName($_name: String): void {
        this.name = $_name;
    }

    public setPrice($_price: Number): void {
        this.price = $_price;
    }

    public setQuantity($_quantity: Number): void {
        this.quantity = $_quantity;
    }

    public setImage($_image: String): void {
        this.image = $_image;
    }
}