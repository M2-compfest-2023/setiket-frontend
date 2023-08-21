import IconCard from '@/components/cards/IconCard';
import { events } from '@/contents/categories';

export default function Temp() {
  console.table(events)

  return (
    <>
        <div>
          <IconCard />
        </div>
    </>
  )
}