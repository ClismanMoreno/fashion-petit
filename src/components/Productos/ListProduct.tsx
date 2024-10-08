import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  img: string;
  cintura: number;
  cadera: number;
  largo_tiro: number;
  pierna: number;
  marca: string;
  url: string;
}

interface ComponenteProps {
  productos: Producto[];
}

const ListProduct: React.FC<ComponenteProps> = ({ productos }) => {
  const { addToCart } = useCartStore();

  const notify = () => toast.success('¡Producto añadido al carrito!');
  return (
    <>
      {productos.length !== 0 ? (
        <>
          <div className="flex flex-col justify-center items-center space-y-8 my-5">
            {productos.map((producto) => (
              <div
                className="shadow-xl p-1 w-full md:w-2/3 flex justify-around border border-pink-100 rounded-lg"
                key={producto.id}
              >
                <div>
                  <Image
                    className="object-cover w-3/4 sm:w-full"
                    width={300}
                    height={300}
                    src={producto.img}
                    alt={producto.nombre}
                  />
                </div>
                <div className="mt-5">
                  <h2 className="text-base md:text-2xl text-zinc-200 text-center font-semibold">
                    {producto.nombre}
                  </h2>
                  <p className="text-sm text-gray-200 mt-10 mb-5 text-center">
                    Marca: {producto.marca}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-pink-200 text-center">
                    Precio: S/.{producto.precio}
                  </p>
                  <div className="flex flex-col justify-center items-center mt-5 md:mt-10 space-y-3 md:space-y-5">
                    <button
                      onClick={() => {
                        addToCart(producto);
                        notify();
                      }}
                      className="w-28 md:w-40 border-2 text-pink-100 border-pink-400 rounded-lg font-bold hover:transition-all hover:delay-100 hover:bg-pink-400 hover:text-white p-2 text-sm md:text-base"
                    >
                      Añadir al carrito
                    </button>
                    <a
                      href={`/productos/${producto.url}`}
                      className="w-28 md:w-40 text-center border-2 text-cyan-100 border-cyan-400 rounded-lg font-bold hover:transition-all hover:delay-100 hover:bg-cyan-400 hover:text-white p-2 text-sm md:text-base"
                    >
                      Ver Detalles
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="w-full h-[40dvh] flex justify-center items-center">
            <p className="text-center font-semibold text-4xl text-red-200">
              NO HAY PRODUCTOS
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default ListProduct;
