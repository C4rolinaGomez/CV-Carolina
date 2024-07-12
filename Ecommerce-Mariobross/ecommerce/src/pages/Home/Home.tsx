import { useState } from 'react'
import { useQuery } from 'react-query'
import { Toaster } from 'sonner'
import { CardProduct } from '../../components/ui/CardProduct'
import Hero from '../../components/ui/Hero/Hero'
import { getProducts } from '../../service'
import styles from "./Home.module.css"



const Home = () => {

    //estado local para manejar la paginación
    const [page, setPage] = useState(1);

    //Para usar query, re4cibe por parametros lo quie quiere traer, es decir todos los p´roductos y la funcion que se encarga de hacer el fetching en la PI
    const { data, isLoading, error } = useQuery(
        //pasa la key
        ["products", page],
        //invoca la funcion que va a hacer el fetching
        () => getProducts(page),
        //se habilida el keepPreviusData en true
        { keepPreviousData: true }
    );

    // const [products, setProducts] = useState<Product[]>([])
    // //Revisa cuando se esté cargando ala data y revisa en caso de que haya un error
    // const [error, setError] = useState(false)
    // const [isloading, setIsLoading] = useState(true)


    //Vamos a utilizar useEfect para disparar un efecto secundario que va a hacer una llamada a la API
    // useEffect(()=>{
    //     //con el then el catch y el finally pasaremos la data
    //     getProducts().then((data) =>{
    //         setProducts(data)
    //     }).catch(()=>{
    //         setError(true)
    //     }).finally(()=>{
    //         setIsLoading(false)
    //     })
    // }, [])


    return (
        <>
            <Hero />
            {/* //importa el toaster del sunner para notificar al usuario */}
            <Toaster richColors />
            {isLoading && <p>Loading . . . </p>}
            {error && <p>Someting went wrong</p>}
            <div className={styles.container}>
                {data?.map((products) => (
                    <CardProduct key={products.tail} product={products} />

                ))}
            </div>
            <div className={styles.paginationContainer}>
                {/* //Para hacer la paginación como tal */}
                <button
                    onClick={() => setPage(page - 1)}
                    //se desabilita si page =1
                    disabled={page === 1}
                    className={styles.paginationButton}
                >
                    previus page</button>
                <div className={styles.paginationActive}>
                    <span>{page}</span>
                </div>
                <button
                    onClick={() => setPage(page + 1)}
                    className={styles.paginationButton}
                >
                    next page
                </button>
            </div>
        </>
    );
};

export default Home