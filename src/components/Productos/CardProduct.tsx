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

const CardProduct: React.FC<ComponenteProps> = ({ productos }) => {
  const { addToCart } = useCartStore();
  const notify = () => toast.success('¡Producto añadido al carrito!');
  return (
    <>
      {productos.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-center justify-items-center gap-y-10">
            {productos.map((producto) => (
              <div
                className="shadow-xl p-1 border border-pink-100 rounded-lg"
                key={producto.id}
              >
                <h2 className="text-xl text-zinc-200 text-center">
                  {producto.nombre}
                </h2>

                <Image
                  className="object-cover"
                  width={300}
                  height={300}
                  src={producto.img}
                  alt={producto.nombre}
                />
                <p className="text-sm text-gray-200">Marca: {producto.marca}</p>
                <p className="font-semibold text-pink-200">
                  Precio: S/.{producto.precio}
                </p>
                <div className="flex flex-col justify-center items-center mt-5 space-y-5">
                  <button
                    onClick={() => {
                      addToCart(producto);
                      notify();
                    }}
                    className="w-40 border-2 text-pink-100 border-pink-400 rounded-lg font-bold hover:transition-all hover:delay-100 hover:bg-pink-400 hover:text-white p-2"
                  >
                    Añadir al carrito
                  </button>
                  <a
                    href={`/productos/${producto.url}`}
                    className="w-40 text-center border-2 text-cyan-100 border-cyan-400 rounded-lg font-bold hover:transition-all hover:delay-100 hover:bg-cyan-400 hover:text-white p-2"
                  >
                    Ver Detalles
                  </a>
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

export default CardProduct;
