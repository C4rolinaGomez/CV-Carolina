export interface Product {
    amiiboSeries: string;
    character:    string;
    gameSeries:   string;
    head:         string;
    image:        string;
    name:         string;
    release?:      Release; //Quiere decir que es opcional
    tail:         string;
    type:         string;
    id?:           number;//Quiere decir que es opcional
    price:        number;
}

export interface Release {
    au: String;
    eu: String;
    jp: String;
    na: String;
}

//Creamos esta interfaz para ver como lucen los productos en el carrito
export interface CartProduct {
    id: number;
    name: String;
    image: String;
    quantity: number
    price: number
}