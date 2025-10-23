import React from 'react';
import styled from 'styled-components';
import { media } from '../styles/media';

const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 133.33%;
  overflow: hidden;
  background-color: #f5f5f5;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background-color: #ff4757;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 1;

  ${media.tablet`
    font-size: 0.8rem;
    padding: 0.375rem 0.625rem;
  `}
`;

const CardBody = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  ${media.tablet`
    padding: 1rem;
    gap: 0.375rem;
  `}
`;

const Brand = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: #888;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${media.tablet`
    font-size: 0.8rem;
  `}
`;

const Title = styled.h3`
  font-size: 0.875rem;
  font-weight: 400;
  margin: 0;
  color: #222;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${media.tablet`
    font-size: 0.95rem;
  `}

  ${media.desktop`
    font-size: 1rem;
  `}
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.25rem;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: 700;
  margin: 0;
  color: #000;

  ${media.tablet`
    font-size: 1.05rem;
  `}

  ${media.desktop`
    font-size: 1.1rem;
  `}
`;

const OriginalPrice = styled.span`
  font-size: 0.8rem;
  color: #aaa;
  text-decoration: line-through;
  font-weight: 400;

  ${media.tablet`
    font-size: 0.85rem;
  `}
`;

interface ProductCardProps {
  imageUrl: string;
  title: string;
  brand?: string;
  price: string;
  originalPrice?: string;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  brand,
  price,
  originalPrice,
  discount
}) => {
  return (
    <CardWrapper>
      <ImageWrapper>
        {discount && discount > 0 && (
          <DiscountBadge>{discount}%</DiscountBadge>
        )}
        <CardImage src={imageUrl} alt={title} />
      </ImageWrapper>
      <CardBody>
        {brand && <Brand>{brand}</Brand>}
        <Title>{title}</Title>
        <PriceWrapper>
          <Price>{price}원</Price>
          {originalPrice && <OriginalPrice>{originalPrice}원</OriginalPrice>}
        </PriceWrapper>
      </CardBody>
    </CardWrapper>
  );
};

export default ProductCard;
