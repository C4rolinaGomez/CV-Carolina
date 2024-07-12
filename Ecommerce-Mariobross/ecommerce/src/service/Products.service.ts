
import {Product} from "../Interface"

//Funcion para traer los datos de prodycts localizados en el localhost 3000
export const getProducts = async (page=0):Promise<Product[]> => {
    try {
        const response = await fetch(`http://localhost:3000/products?_page=${page}&_per_page=24`)

        // //Aquí envia directamente la data a lo que es el estado del producto

        //Valida si el dato de la respuesta es ok
        if (response.ok) {
            const data = await response.json()
            return data.data
        } else {
            throw new Error("Failed to fetch products")
        }

    } catch (error) {
        throw new Error("Network error")

    }
}

//crea un servicio
export const createProduct = async (product: Product): Promise<Product> =>{
    //Ejecuta todo mediante un trycatch
    try {
        //se le hace el post a la url
        const response = await fetch("http://localhost:3000/products", {
           method: "POST",
           headers: {
            "Content-Type": "application/json"
           } ,
           body: JSON.stringify(product)
        })

        //valida que los datos seean correctos
        if (response.ok){
            //permite validar la respuesta o retornar el status
            const data = await response.json()
            return data. data
        }else{
            //en caso de error retorna los respectivos mensajes
            throw new Error ("Faild to create product")
        }
    } catch (error) {
        throw new Error ("Network error")
    }
}