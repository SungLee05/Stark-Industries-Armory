import React from 'react'
import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade'

import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore, {EffectCoverflow, Pagination} from 'swiper'

import accounting from 'accounting'

SwiperCore.use([EffectCoverflow, Pagination])

const ProductCard = props => {
  const {products} = props

  return (
    <div className="products-container">
      <Swiper
        effect="coverflow"
        grabCursor="true"
        centeredSlides="true"
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet`,
          dynamicBullets: true
        }}
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
              <Fade top ssrFadeout={true} delay={1000}>
                <div className="product-name">{product.name}</div>
              </Fade>
              <Fade big ssrFadeout={true} delay={1500}>
                <img
                  src={product.imageUrl}
                  height="300"
                  className="product-img"
                />
              </Fade>
              <Fade bottom ssrFadeout={true} distance="50%" delay={1250}>
                <div className="product-price">
                  {accounting.formatMoney((product.price * 1).toFixed(2))}
                </div>
              </Fade>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ProductCard
