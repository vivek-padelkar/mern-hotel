import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const Carousel = ({ arrImages }) => {
  SwiperCore.use(Navigation)
  return (
    <>
      <Swiper navigation>
        {arrImages.map((imageUrls) => (
          <SwiperSlide key={imageUrls}>
            {console.log('hi' + imageUrls)}
            <div
              className="h-[500px]"
              style={{
                background: `url(${imageUrls}) center no-repeat`,
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default Carousel
