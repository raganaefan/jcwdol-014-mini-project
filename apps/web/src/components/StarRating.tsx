import { HStack, IconButton } from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, setRating }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <HStack spacing={1}>
      {[1, 2, 3, 4, 5].map((star) => (
        <IconButton
          key={star}
          icon={<FaStar />}
          colorScheme={star <= (hover || rating) ? 'yellow' : 'gray'}
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          aria-label={`${star} stars`}
          variant="ghost"
          size="lg"
        />
      ))}
    </HStack>
  );
};

export default StarRating;
