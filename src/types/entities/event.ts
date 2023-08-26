export type Event = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  ticket_total: number;
  location: string;
  category_id: number;
  organizer_id: number;
  verified: boolean;
  city_id: number;
  price: number;
  created_at: string;
  updated_at: string;
  city: string;
  province: string;
  tickets: [
    {
      id: number;
      quantity: number;
      customer_id: number;
      event_id: number;
      created_at: string;
      updated_at: string;
    }
  ];
};

export type Category = {
  id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
};
