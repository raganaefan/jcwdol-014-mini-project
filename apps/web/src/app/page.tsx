import Hero from '@/components/Hero';
import Container from '@/components/Container';
import EventHub from '@/components/EventHub';
import EventCategories from '@/components/EventCategories';
import ReviewRating from '@/components/ReviewRating';
export default function Home() {
  return (
    <div>
      <EventHub />
      <EventCategories />
      <Hero />
      <ReviewRating />
      <Container />
    </div>
  );
}
