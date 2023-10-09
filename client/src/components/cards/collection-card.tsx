import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { LinkProps } from 'next/link';
import Text from '@components/ui/text';
import { useTranslation } from 'next-i18next';
import { collectionPlaceholder } from '@assets/placeholders';
import { CDN_BASE_URL } from '@framework/utils/api-endpoints';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  href: LinkProps['href'];
  collection: {
    image: string;
    name: string;
    description?: string;
  };
}

const CollectionCard: React.FC<Props> = ({
  collection,
  imgWidth = 440,
  imgHeight = 280,
  href,
}) => {
  const { image, name: title, description } = collection;
  const { t } = useTranslation('common');

  const imageSrc = `${CDN_BASE_URL}/${image}`;
  const myLoader = () => {
    return `${CDN_BASE_URL}/${image}`;
  };
  return (
    <Link
      href={href}
      className="flex flex-col overflow-hidden rounded-md group shadow-card "
    >
      <Image
        loader={myLoader}
        src={imageSrc ?? collectionPlaceholder}
        alt={t(title) || t('text-card-thumbnail')}
        width={imgWidth}
        height={imgHeight}
        className="object-cover transition duration-300 ease-in-out transform bg-fill-thumbnail group-hover:opacity-90 group-hover:scale-105"
      />
      <div className="flex flex-col px-4 pt-4 pb-4 lg:px-5 xl:px-6 lg:pt-5 md:pb-5 lg:pb-6 xl:pb-4">
        <Heading
          variant="title"
          className="mb-1 lg:mb-1.5 truncate group-hover:text-brand"
        >
          {t(title)}
        </Heading>
      </div>
    </Link>
  );
};

export default CollectionCard;
