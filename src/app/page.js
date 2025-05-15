'use client'
import useGetProducts from "@/hooks/products/useGetProducts";
import React from "react";
import Image from "next/image";

export default function Home() {
  const { products, loading } = useGetProducts();

  return (
    <div className="main__container">
      <div className='main__banner'>
        <img src='/banner.webp' />
        <div>
          <div className="main__offers-container">
            <h2 >¡Ofertas Especiales!</h2>
            <p className="text-xl">Hasta 50% de descuento en productos seleccionados</p>
          </div>
        </div>
      </div>
      <main className="main__products">
        <h2 className="main__products-title">Nuestros Productos</h2>
        {loading ? (
          <div className="main__products--loading">
            CARGANDO...
          </div>
        ) : (
          <div className="main__products--loaded">
            {products.map((product) => (
              <div className='main__products__product' key={product.id}>
                <div className='main__products__product__image__container'>
                  <img src={product.url} />
                </div>
                <div>
                  <h3>{product.name}</h3>
                  <p>${product.price.toLocaleString()}</p>
                  <div>
                    <div>★★★★★</div>
                    <span>(5)</span>
                  </div>
                  <button>
                    Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} TPO APIS - Todos los derechos reservados</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-indigo-300">Términos y condiciones</a>
            <a href="#" className="hover:text-indigo-300">Política de privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}