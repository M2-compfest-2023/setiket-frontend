import Image from 'next/image';
import Link from 'next/link';

const CategoryCard = ({
  category,
  link,
  src,
  className,
}: {
  category: string;
  link: string;
  src: string;
  className?: string;
}) => {

  return (
    <Link href={`${link}`}>
      <div className="card w-[310px] h-[120px] shadow-md image-full rounded-3xl overflow-hidden inline-block hover:shadow-xl hover:scale-105 duration-150"
      >  
        <figure><Image src={src} alt={category} width={310} height={120}></Image></figure>
      </div>
    </Link>
  );
};

export default CategoryCard;