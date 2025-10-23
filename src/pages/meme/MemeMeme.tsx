import { useState } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/media';
import Modal from '../../components/Modal';

const MemeWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const Header = styled.header`
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledLogoLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const StyledLogoImage = styled.img`
  border-radius: 6px;
`;

const StyledLogoText = styled.span`
  color: #fff;
  font-weight: 800;
  font-size: 18px;
`;

const BrandTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 700;

  span {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const UpdateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);

  span {
    color: #22c55e;
  }
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  ${media.tablet`
    padding: 2.5rem 2rem;
  `}
`;

const TopicsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  ${media.tablet`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${media.desktop`
    grid-template-columns: repeat(3, 1fr);
  `}
`;

const TopicCard = styled.div`
  background: rgba(18, 18, 18, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
`;

const TopicHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
`;

const TopicTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TopicIcon = styled.span`
  font-size: 1.25rem;
`;

const TimeUnit = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 10px;
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
  border-radius: 12px;
  border: 1px solid rgba(102, 126, 234, 0.2);
`;

const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const RankItem = styled.div<{ rank: number }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const RankBadge = styled.div<{ rank: number }>`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;

  ${props => {
    if (props.rank === 1) return `
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: #000;
    `;
    if (props.rank === 2) return `
      background: linear-gradient(135deg, #cbd5e1, #94a3b8);
      color: #000;
    `;
    if (props.rank === 3) return `
      background: linear-gradient(135deg, #fb923c, #ea580c);
      color: #fff;
    `;
    return `
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 0.6);
    `;
  }}
`;

const RankContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const RankTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RankMeta = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 2px;
`;

const LinkIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    transform: scale(1.1);
  }
`;

interface TopicData {
  icon: string;
  title: string;
  timeUnit: string;
  items: {
    rank: number;
    title: string;
    meta?: string;
    hasLink?: boolean;
  }[];
}

const MemeMeme = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ title: string; meta?: string; icon: string } | null>(null);

  const handleItemClick = (item: { rank: number; title: string; meta?: string }, topicIcon: string) => {
    setSelectedItem({ title: item.title, meta: item.meta, icon: topicIcon });
    setIsModalOpen(true);
  };

  const topics: TopicData[] = [
    {
      icon: '🔥',
      title: '실시간 핫딜 트렌드',
      timeUnit: '실시간',
      items: [
        { rank: 1, title: '무선 이어폰 50% 할인', meta: '쿠팡', hasLink: true },
        { rank: 2, title: '에어프라이어 특가', meta: '11번가', hasLink: true },
        { rank: 3, title: '노트북 파격세일', meta: 'G마켓', hasLink: true },
        { rank: 4, title: '겨울패딩 반값', meta: '무신사', hasLink: true },
        { rank: 5, title: '게이밍마우스 특가', meta: '다나와', hasLink: true },
      ]
    },
    {
      icon: '📈',
      title: '급상승 주식',
      timeUnit: '1시간',
      items: [
        { rank: 1, title: '삼성전자', meta: '+5.2%' },
        { rank: 2, title: 'SK하이닉스', meta: '+4.8%' },
        { rank: 3, title: 'NAVER', meta: '+3.9%' },
        { rank: 4, title: 'LG에너지솔루션', meta: '+3.5%' },
        { rank: 5, title: 'KB금융', meta: '+2.8%' },
      ]
    },
    {
      icon: '₿',
      title: '급상승 코인',
      timeUnit: '1시간',
      items: [
        { rank: 1, title: 'Bitcoin', meta: '+8.2%' },
        { rank: 2, title: 'Ethereum', meta: '+6.5%' },
        { rank: 3, title: 'Ripple', meta: '+12.3%' },
        { rank: 4, title: 'Cardano', meta: '+5.7%' },
        { rank: 5, title: 'Solana', meta: '+4.9%' },
      ]
    },
    {
      icon: '📰',
      title: '오늘의 주요 뉴스',
      timeUnit: '오늘',
      items: [
        { rank: 1, title: 'AI 기술 혁신 발표', meta: 'IT', hasLink: true },
        { rank: 2, title: '경제 지표 호조', meta: '경제', hasLink: true },
        { rank: 3, title: '환경 정책 개편', meta: '사회', hasLink: true },
        { rank: 4, title: '스포츠 대회 개막', meta: '스포츠', hasLink: true },
        { rank: 5, title: '엔터 소식', meta: '연예', hasLink: true },
      ]
    },
    {
      icon: '💬',
      title: '커뮤니티 급상승 이슈',
      timeUnit: '1시간',
      items: [
        { rank: 1, title: '오늘 점심 뭐먹지 논쟁', meta: '클리앙', hasLink: true },
        { rank: 2, title: '신입 개발자 취업 후기', meta: '블라인드', hasLink: true },
        { rank: 3, title: '이번주 코인 시세', meta: '웃긴대학', hasLink: true },
        { rank: 4, title: '최신 스마트폰 리뷰', meta: '뽐뿌', hasLink: true },
        { rank: 5, title: '오늘의 짤방 모음', meta: 'FM코리아', hasLink: true },
      ]
    },
    {
      icon: '🎵',
      title: '음악스트리밍 급상승',
      timeUnit: '일간',
      items: [
        { rank: 1, title: 'APT. - 로제 & Bruno Mars', meta: 'Melon', hasLink: true },
        { rank: 2, title: 'Supernova - aespa', meta: 'Melon', hasLink: true },
        { rank: 3, title: 'Love wins all - 아이유', meta: 'Melon', hasLink: true },
        { rank: 4, title: 'Small girl - 이영지', meta: 'Melon', hasLink: true },
        { rank: 5, title: 'How Sweet - NewJeans', meta: 'Melon', hasLink: true },
      ]
    },
    {
      icon: '📚',
      title: '웹툰/웹소설 인기',
      timeUnit: '주간',
      items: [
        { rank: 1, title: '나 혼자만 레벨업', meta: '네이버', hasLink: true },
        { rank: 2, title: '역대급 영지 설계사', meta: '카카오', hasLink: true },
        { rank: 3, title: '이번 생도 잘 부탁해', meta: '네이버', hasLink: true },
        { rank: 4, title: '나노 마신', meta: '카카오', hasLink: true },
        { rank: 5, title: '재혼 황후', meta: '네이버', hasLink: true },
      ]
    },
    {
      icon: '🎬',
      title: '숏폼 배경음악',
      timeUnit: '일간',
      items: [
        { rank: 1, title: 'APT. (릴스 Ver.)', meta: 'Instagram', hasLink: true },
        { rank: 2, title: 'Cupid - FIFTY FIFTY', meta: 'TikTok', hasLink: true },
        { rank: 3, title: 'OMG - NewJeans', meta: 'YouTube Shorts', hasLink: true },
        { rank: 4, title: 'Ditto - NewJeans', meta: 'TikTok', hasLink: true },
        { rank: 5, title: 'Super Shy - NewJeans', meta: 'Instagram', hasLink: true },
      ]
    },
    {
      icon: '🌍',
      title: '해외 SNS/밈',
      timeUnit: '일간',
      items: [
        { rank: 1, title: 'Skibidi Toilet', meta: 'YouTube', hasLink: true },
        { rank: 2, title: 'Ohio Meme', meta: 'Twitter', hasLink: true },
        { rank: 3, title: 'Giga Chad', meta: 'Instagram', hasLink: true },
        { rank: 4, title: 'Sigma Male', meta: 'TikTok', hasLink: true },
        { rank: 5, title: 'NPC Livestream', meta: 'TikTok', hasLink: true },
      ]
    },
    {
      icon: '🍔',
      title: '주간 신규 맛집/메뉴',
      timeUnit: '주간',
      items: [
        { rank: 1, title: '성수동 신규 브런치 카페', meta: '서울', hasLink: true },
        { rank: 2, title: '강남 오마카세 신메뉴', meta: '서울', hasLink: true },
        { rank: 3, title: '을지로 퓨전 레스토랑', meta: '서울', hasLink: true },
        { rank: 4, title: '홍대 타코 전문점', meta: '서울', hasLink: true },
        { rank: 5, title: '이태원 파스타 맛집', meta: '서울', hasLink: true },
      ]
    },
    {
      icon: '💼',
      title: '핵심 업무/실용 키워드',
      timeUnit: '주간',
      items: [
        { rank: 1, title: 'ChatGPT 프롬프트 작성법', meta: 'IT', hasLink: true },
        { rank: 2, title: '엑셀 피벗 테이블 활용', meta: 'Office', hasLink: true },
        { rank: 3, title: '효율적인 회의 진행법', meta: '업무', hasLink: true },
        { rank: 4, title: 'Notion 템플릿 모음', meta: '생산성', hasLink: true },
        { rank: 5, title: '타입스크립트 입문', meta: '개발', hasLink: true },
      ]
    },
    {
      icon: '☕',
      title: '주간 인기 카페',
      timeUnit: '주간',
      items: [
        { rank: 1, title: 'ChatGPT 프롬프트 작성법', meta: 'IT', hasLink: true },
        { rank: 2, title: '엑셀 피벗 테이블 활용', meta: 'Office', hasLink: true },
        { rank: 3, title: '효율적인 회의 진행법', meta: '업무', hasLink: true },
        { rank: 4, title: 'Notion 템플릿 모음', meta: '생산성', hasLink: true },
        { rank: 5, title: '타입스크립트 입문', meta: '개발', hasLink: true },
      ]
    },
  ];

  return (
    <MemeWrapper>
      <Header>
        <HeaderContent>
          <LogoSection>
            <StyledLogoLink href="/">
              <StyledLogoImage src="/VOIDDOT.svg" alt="VOID." width={32} height={32} />
              <StyledLogoText>VOID.</StyledLogoText>
            </StyledLogoLink>
            <BrandTitle>
              <span>😂 밈밈밈</span>
            </BrandTitle>
          </LogoSection>
          <UpdateInfo>
            마지막 업데이트: <span>방금 전</span>
          </UpdateInfo>
        </HeaderContent>
      </Header>

      <MainContent>
        <TopicsGrid>
          {topics.map((topic, idx) => (
            <TopicCard key={idx}>
              <TopicHeader>
                <TopicTitle>
                  <TopicIcon>{topic.icon}</TopicIcon>
                  {topic.title}
                </TopicTitle>
                <TimeUnit>{topic.timeUnit}</TimeUnit>
              </TopicHeader>
              <RankingList>
                {topic.items.map((item) => (
                  <RankItem
                    key={item.rank}
                    rank={item.rank}
                    onClick={() => handleItemClick(item, topic.icon)}
                  >
                    <RankBadge rank={item.rank}>{item.rank}</RankBadge>
                    <RankContent>
                      <RankTitle>{item.title}</RankTitle>
                      {item.meta && <RankMeta>{item.meta}</RankMeta>}
                    </RankContent>
                    {item.hasLink && (
                      <LinkIcon>
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </LinkIcon>
                    )}
                  </RankItem>
                ))}
              </RankingList>
            </TopicCard>
          ))}
        </TopicsGrid>
      </MainContent>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem ? `${selectedItem.icon} ${selectedItem.title}` : ''}
        theme="dark"
        size="md"
      >
        <div style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: '1.6' }}>
          <p style={{ marginTop: 0, fontSize: '1rem' }}>
            {selectedItem?.meta && (
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(102, 126, 234, 0.1)',
                color: '#667eea',
                borderRadius: '12px',
                border: '1px solid rgba(102, 126, 234, 0.2)',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                {selectedItem.meta}
              </span>
            )}
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            이 항목에 대한 자세한 정보를 여기에 표시할 수 있습니다.
          </p>
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>
              💡 실제 서비스에서는 이 위치에 해당 항목의 상세 정보, 링크, 통계 등을 표시할 수 있습니다.
            </p>
          </div>
        </div>
      </Modal>
    </MemeWrapper>
  );
};

export default MemeMeme;
