import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FaChevronCircleRight } from 'react-icons/fa';

import EventCard from '@/components/cards/EventCard';
import IconCard from '@/components/cards/IconCard';
import Typography from '@/components/Typography';
import Layout from '@/layouts/Layout';
import { ApiReturn } from '@/types/api';
import { Category, Event } from '@/types/entities/event';

export default function CategoryEvent() {
  const router = useRouter();
  const catId = router.query.id;

  const categories = useQuery<ApiReturn<Category[]>>(['/category/']);
  const categoryItem = categories.data?.data?.find(
    (category) => category.id.toString() == catId
  );
  const category_name = categoryItem ? categoryItem.category_name : undefined;

  const events = useQuery<ApiReturn<Event[]>>([
    `/events/filter?category=${catId}`,
  ]);

  return (
    <Layout withFooter withNavbar>
      <div className='md:px-10 flex flex-col gap-5 min-h-screen'>
        <Typography variant='h4' font='ubuntu' color='cyan'>
          {category_name} Events
        </Typography>
        <div className='flex flex-col gap-5 md:grid w-[80%] md:grid-cols-3 md:gap-x-10 md:gap-y-5 md:place-content-start'>
          {events.data?.data
            ?.filter((event) => event.verified === true) // Filter events where verified is true
            // .slice(0, 10) // Limit to a maximum of 5 events
            .map((event) => (
              <EventCard
                key={event.id}
                eventName={event.title}
                startDate={event.start_date.substring(0, 10)}
                endDate={event.end_date.substring(0, 10)}
                startTime={event.start_date.substring(11, 16)}
                endTime={event.end_date.substring(11, 16)}
                verified={event.verified}
                link={`/events/detail/${event.id}`}
                ticketPrice={event.price}
              />
            ))}
          <IconCard
            Icon={FaChevronCircleRight}
            link='/events'
            text='See All Events'
            className='hover:shadow-xl'
          />
        </div>
      </div>
    </Layout>
  );
}
