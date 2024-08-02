class Sneaker {
    constructor(ID,
        name,
        brand,
        size,
        price,
        gender,
        sport,
        stock,
        image,
        description){
            this.ID = ID;
            this.name = name;
            this.brand = brand;
            this.size= size;
            this.price = price;
            this.gender = gender;
            this.sport = sport;
            this.stock = stock;
            this.image = image;
            this.description = description
        }
}

module.exports = Sneaker;