export class Product {
    public name        :   String   =   "";
    public price       :   Number   =   0;
    public quantity    :   Number   =   0;
    public imagePath   :   String   =   "";

    constructor(
        public $_name       ?:  String, 
        public $_price      ?:  Number, 
        public $_quantity   ?:  Number, 
        public $_imagePath      ?:  String
    ) {
        if ($_name)         this.name           =   $_name;
        if($_price)         this.price          =   $_price;
        if($_quantity)      this.quantity       =   $_quantity;
        if($_imagePath)     this.imagePath      =   $_imagePath;
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
        return this.imagePath;
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

    public setImagePath($_imagePath: String): void {
        this.imagePath = $_imagePath;
    }
}