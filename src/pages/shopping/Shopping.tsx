import { useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/ProductCard';
import { media } from '../../styles/media';
import productsData from '../../data/products.json'; // JSON 데이터 import

const ShoppingPageWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f8f8;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const Header = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.tablet`
    padding: 1.25rem 2rem;
  `}

  ${media.desktop`
    padding: 1.5rem 2.5rem;
  `}
`;

const StyledLogoLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLogoImage = styled.img`
  border-radius: 6px;
`;

const StyledLogoText = styled.span`
  color: #111827;
  font-weight: 800;
  font-size: 22px;
`;

const NavMenu = styled.nav`
  display: none;
  gap: 2rem;

  ${media.tablet`
    display: flex;
  `}
`;

const NavItem = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  font-size: 0.95rem;
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#000' : '#666'};
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.2s;
  border-bottom: ${props => props.active ? '2px solid #000' : '2px solid transparent'};

  &:hover {
    color: #000;
  }
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 1rem;
  text-align: center;

  ${media.tablet`
    padding: 3rem 2rem;
  `}

  ${media.desktop`
    padding: 4rem 2.5rem;
  `}
`;

const HeroContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const HeroTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0 0 1rem;
  letter-spacing: -1px;

  ${media.tablet`
    font-size: 2.5rem;
  `}

  ${media.desktop`
    font-size: 3rem;
  `}
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.95;
  margin: 0;
  font-weight: 300;

  ${media.tablet`
    font-size: 1.1rem;
  `}
`;

const MainContent = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;

  ${media.tablet`
    padding: 2rem;
  `}

  ${media.desktop`
    padding: 2.5rem;
  `}
`;

const FilterSection = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  ${media.tablet`
    padding: 1.5rem;
  `}
`;

const FilterTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: #666;
  margin: 0 0 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1.25rem;
  border: 1px solid ${props => props.active ? '#000' : '#e5e5e5'};
  background-color: ${props => props.active ? '#000' : '#fff'};
  color: ${props => props.active ? '#fff' : '#666'};
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #000;
    color: ${props => props.active ? '#fff' : '#000'};
  }

  ${media.tablet`
    padding: 0.625rem 1.5rem;
    font-size: 0.9rem;
  `}
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  ${media.tablet`
    margin-bottom: 2rem;
  `}
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
  margin: 0;

  ${media.tablet`
    font-size: 1.5rem;
  `}
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.875rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: #000;
  }

  &::after {
    content: '→';
    font-size: 1rem;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  ${media.tablet`
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  `}

  ${media.desktop`
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  `}
`;

const categories = ['전체', '아우터', '상의', '하의', '신발', '액세서리'];

const Shopping: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredProducts = selectedCategory === '전체'
    ? productsData
    : productsData.filter(product => product.category === selectedCategory);

  return (
    <ShoppingPageWrapper>
      <Header>
        <HeaderContent>
          <StyledLogoLink href="/">
            <StyledLogoImage src="/VOIDDOT.svg" alt="VOID." width={36} height={36} />
            <StyledLogoText>VOID.</StyledLogoText>
          </StyledLogoLink>
          <NavMenu>
            <NavItem active>홈</NavItem>
            <NavItem>장바구니</NavItem>
            <NavItem>좋아요</NavItem>
            <NavItem>마이페이지</NavItem>
          </NavMenu>
        </HeaderContent>
      </Header>

      <HeroSection>
        <HeroContent>
          <HeroTitle>2025 Winter Collection</HeroTitle>
          <HeroSubtitle>지금 가장 핫한 트렌드 아이템을 만나보세요</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <FilterSection>
          <FilterTitle>카테고리</FilterTitle>
          <FilterButtons>
            {categories.map((category) => (
              <FilterButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </FilterButtons>
        </FilterSection>

        <SectionHeader>
          <SectionTitle>인기 상품</SectionTitle>
          <ViewAllButton>전체보기</ViewAllButton>
        </SectionHeader>

        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              brand={product.brand}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
          ))}
        </ProductGrid>
      </MainContent>
    </ShoppingPageWrapper>
  );
};

export default Shopping;