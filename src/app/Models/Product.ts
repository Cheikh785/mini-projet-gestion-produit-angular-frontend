export class Product {
    public name        :   String   =   "";
    public price       :   Number   =   0;
    public quantity    :   Number   =   0;
    public image       :   String   =   "";

    constructor(
        public $_name       ?:  String, 
        public $_price      ?:  Number, 
        public $_quantity   ?:  Number, 
        public $_image      ?:  String
    ) {
        if ($_name)         this.name           =   $_name;
        if($_price)         this.price          =   $_price;
        if($_quantity)      this.quantity       =   $_quantity;
        if($_image)         this.image          =   $_image;
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

    public getImagePath(): String {
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

    public setImagePath($_image: String): void {
        this.image = $_image;
    }
}