import ReferFriendsIcon from '@components/icons/featured/refer-friends-icon';
import DeliveryIcon from '@components/icons/featured/delivery-icon';
import ChatIcon from '@components/icons/featured/chat-icon';
import FeedbackIcon from '@components/icons/featured/feedback-icon';
import FeaturedCard from '@components/cards/featured-card';
import useWindowSize from '@utils/use-window-size';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { ROUTES } from '@utils/routes';

interface Props {
  className?: string;
  data?: any;
  end?: boolean;
}

const breakpoints = {
  '2024': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  '640 ': {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  '0': {
    slidesPerView: 1,
  },
};

const FeatureGrid: React.FC<Props> = ({
  className = 'mb-12 md:mb-14 xl:mb-16',
  data,
  end,
}) => {
  const { width } = useWindowSize();
  return (
    <div className={`heightFull ${className}`}>
      {/* {width! < 1536 ? (
        <Carousel
          autoplay={false}
          breakpoints={breakpoints}
          prevActivateId="featured-carousel-button-prev"
          nextActivateId="featured-carousel-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide key={`featured-key-${item.id}`}>
              <FeaturedCard item={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="2xl:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {data?.map((item) => (
            <FeaturedCard item={item} key={`featured-key-${item.id}`} />
          ))}
        </div>
      )} */}
      {end ? (
        <div className="md:grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
          {data?.map((item) => (
            <FeaturedCard item={item} key={`featured-key-${item.id}`} />
          ))}
        </div>
      ) : (
        <div className="md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {data?.map((item) => (
            <FeaturedCard item={item} key={`featured-key-${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureGrid;
