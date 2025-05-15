'use client';
import useGetProducts from '@/hooks/products/useGetProducts';
import React, { Suspense } from 'react';
import Image from 'next/image';

function ProductCard({ product }) {
  return (
    <article className="main__products__product" key={product.id}>
      <div className="main__products__product__image__container">
        {product.url && (
          <Image
            src={product.url}
            alt={`Imagen de ${product.name}`}
            width={300}
            height={300}
            loading="lazy"
          />
        )}
      </div>
      <div>
        <h3>{product.name}</h3>
        <p className="product-price" aria-label={`Precio: ${product.price.toLocaleString()} pesos`}>
          ${product.price.toLocaleString()}
        </p>
        <div
          className="product-rating"
          aria-label={`Calificación: ${product.rating || 5} de 5 estrellas`}
        >
          <div role="img" aria-label={`${product.rating || 5} estrellas`}>
            ★★★★★
          </div>
          <span>({product.reviews || 5})</span>
        </div>
      </div>
    </article>
  );
}

function ProductsList({ products }) {
  return (
    <div className="main__products--loaded">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function Home() {
  const { products, loading, error } = useGetProducts();

  return (
    <div className="main__container">
      <section className="main__banner" aria-label="Banner promocional">
        <Image
          src="/images/banner.webp"
          alt="Banner promocional con ofertas especiales"
          width={1920}
          height={300}
          priority
        />
        <div>
          <div className="main__offers-container">
            <h1>¡Ofertas Especiales!</h1>
            <p>Hasta 50% de descuento en productos seleccionados</p>
          </div>
        </div>
      </section>

      <section className="main__products" aria-label="Lista de productos">
        <h2 className="main__products-title">Nuestros Productos</h2>

        <Suspense
          fallback={
            <div className="main__products--loading" role="status" aria-label="Cargando productos">
              <p>Cargando productos...</p>
            </div>
          }
        >
          {error ? (
            <div className="main__products--error" role="alert">
              <p>
                Lo sentimos, hubo un error al cargar los productos. Por favor, intente nuevamente
                más tarde.
              </p>
            </div>
          ) : loading ? (
            <div className="main__products--loading" role="status" aria-label="Cargando productos">
              <p>Cargando productos...</p>
            </div>
          ) : (
            <ProductsList products={products} />
          )}
        </Suspense>
      </section>

      <footer className="main-footer">
        <div className="container">
          <p>© {new Date().getFullYear()} TPO APIS - Todos los derechos reservados</p>
          <nav aria-label="Enlaces legales">
            <a href="/terminos" className="footer-link">
              Términos y condiciones
            </a>
            <a href="/privacidad" className="footer-link">
              Política de privacidad
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
