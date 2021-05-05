import React from 'react'
import {Link} from 'react-router-dom'

import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {EffectCoverflow, Pagination, Navigation} from 'swiper'

SwiperCore.use([EffectCoverflow, Pagination, Navigation])

const ProductCard = props => {
  const {products} = props

  return (
    <div className="products-container">
      <Swiper
        effect="coverflow"
        grabCursor="true"
        centeredSlides="true"
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }}
        pagination={{clickable: true, bulletClass: `swiper-pagination-bullet`}}
        dynamicBullets="true"
        dynamicMainBullets={4}
        spaceBetween={2}
        slidesPerView={4}
        loop="true"
        coverflowEffect={{
          rotate: 10,
          stretch: 50,
          depth: 300,
          modifier: 1,
          slideShadows: false
        }}
      >
        {products.map(product => (
          <SwiperSlide key={product.id}>
            <Link to={`/product/${product.id}`} className="product-container">
              <div className="product-name">{product.name}</div>
              <img
                src={product.imageUrl}
                height="300"
                className="product-img"
              />
              <div className="product-price">
                ${(product.price * 1).toFixed(2)}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductCard
