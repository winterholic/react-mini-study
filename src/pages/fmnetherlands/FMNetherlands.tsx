import { useState } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/media';
import Modal from '../../components/Modal';

const FMWrapper = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const Header = styled.header`
  background: #fff;
  border-bottom: 2px solid #e5e7eb;
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
  color: #111827;
  font-weight: 800;
  font-size: 18px;
`;

const BrandTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e40af;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: #6b7280;

  span {
    color: #3b82f6;
    font-weight: 600;
  }
`;

const CategoryNav = styled.nav`
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  overflow-x: auto;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }
`;

const CategoryList = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  padding: 0 1.5rem;
  user-select: none;
`;

const CategoryTab = styled.button<{ $isActive: boolean }>`
  padding: 1rem 1.25rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.$isActive ? '#3b82f6' : 'transparent'};
  color: ${props => props.$isActive ? '#3b82f6' : '#6b7280'};
  font-weight: ${props => props.$isActive ? '700' : '500'};
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;

  &:hover {
    color: #3b82f6;
    background: #f9fafb;
  }
`;

const MainContent = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
`;

const BoardHeader = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const BoardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BoardDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
`;

const BoardStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #6b7280;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const PostListContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PostListHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px 80px 80px 100px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;

  ${media.tablet`
    grid-template-columns: minmax(0, 1fr) 100px 70px 70px 90px;
    font-size: 0.8rem;
  `}

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr) 60px 60px;

    & > div:nth-child(2),
    & > div:nth-child(5) {
      display: none;
    }
  }
`;

const PostItem = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 120px 80px 80px 100px;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background 0.2s;
  align-items: center;

  &:hover {
    background: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }

  ${media.tablet`
    grid-template-columns: minmax(0, 1fr) 100px 70px 70px 90px;
  `}

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr) 60px 60px;
    padding: 0.875rem 1rem;

    & > div:nth-child(2),
    & > div:nth-child(5) {
      display: none;
    }
  }
`;

const PostTitleArea = styled.div`
  min-width: 0;
`;

const PostTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .badge {
    flex-shrink: 0;
    display: inline-block;
    font-size: 0.65rem;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 700;
  }

  .new-badge {
    background: #ef4444;
    color: white;
  }

  .hot-badge {
    background: #f59e0b;
    color: white;
  }

  .comment-count {
    color: #3b82f6;
    font-weight: 600;
    flex-shrink: 0;
  }
`;

const PostMeta = styled.div`
  font-size: 0.8rem;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 8px;

  .author {
    color: #6b7280;
    font-weight: 500;
  }
`;

const PostCell = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
`;

const PostAuthor = styled(PostCell)`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ModalContent = styled.div`
  color: #1f2937;
  line-height: 1.6;
`;

const PostDetailHeader = styled.div`
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 24px;
`;

const PostDetailTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 12px 0;
`;

const PostDetailMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.875rem;
  color: #6b7280;

  .author {
    color: #3b82f6;
    font-weight: 600;
  }

  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const PostDetailBody = styled.div`
  font-size: 1rem;
  color: #374151;
  line-height: 1.8;
  margin-bottom: 24px;
  min-height: 150px;
`;

const PostDetailStats = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border-radius: 12px;
  margin-top: 24px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  views: number;
  comments: number;
  likes: number;
  timestamp: string;
  isNew?: boolean;
  isHot?: boolean;
}

interface Board {
  id: string;
  icon: string;
  title: string;
  description: string;
  totalPosts: number;
  todayPosts: number;
  posts: Post[];
}

const FMNetherlands = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBoard, setActiveBoard] = useState('hot');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 2;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const boards: Board[] = [
    {
      id: 'hot',
      icon: '🔥',
      title: '핫이슈',
      description: '실시간 인기 이슈',
      totalPosts: 38765,
      todayPosts: 267,
      posts: [
        { id: 107, title: '요즘 AI 개발 트렌드', author: '테크러버', content: 'AI 기술 발전이 정말 빠르네요.', views: 5234, comments: 312, likes: 712, timestamp: '6분 전', isNew: true, isHot: true },
        { id: 108, title: '2025년 경제 전망', author: '경제분석가', content: '내년 경제 어떻게 될까요?', views: 4532, comments: 278, likes: 634, timestamp: '22분 전', isHot: true },
        { id: 109, title: '요즘 MZ세대 트렌드', author: 'MZ세대', content: '요즘 유행하는 것들 정리해봤어요.', views: 3876, comments: 234, likes: 567, timestamp: '45분 전', isHot: true },
      ]
    },
    {
      id: 'lol',
      icon: '🎮',
      title: '리그오브레전드',
      description: 'LoL 공략, 팁, 잡담',
      totalPosts: 45678,
      todayPosts: 234,
      posts: [
        { id: 1, title: '시즌15 티어 올리기 꿀팁 공유합니다', author: '챌린저가고싶다', content: '시즌15에서 티어 올리는 데 도움되는 팁들을 정리해봤습니다. 첫 번째로 중요한 것은 CS를 잘 먹는 것입니다.', views: 3421, comments: 87, likes: 234, timestamp: '5분 전', isNew: true, isHot: true },
        { id: 2, title: '이번 패치 AP 캐리 메타 어떤가요?', author: '미드장인', content: '이번 패치에서 AP 캐리들이 많이 강해진 것 같은데 어떤 챔프가 좋을까요?', views: 2341, comments: 156, likes: 432, timestamp: '25분 전', isHot: true },
        { id: 3, title: '정글 초반 갱킹 루트 추천', author: '정글러', content: '정글 초보인데 갱킹 루트 짜는 법 알려주세요.', views: 1523, comments: 123, likes: 189, timestamp: '1시간 전', isNew: true },
        { id: 4, title: '탑 솔로킬 따는 법', author: '탑신', content: '탑에서 솔로킬 잘 따는 법 있나요?', views: 987, comments: 67, likes: 145, timestamp: '2시간 전' },
        { id: 5, title: '서포터 시야 싸움 팁', author: '서폿장인', content: '서포터 시야 관리 꿀팁 공유합니다.', views: 756, comments: 45, likes: 98, timestamp: '3시간 전' },
        { id: 6, title: 'ADC 포지셔닝 강의', author: '원딜고인물', content: 'ADC 포지셔닝에 대해 알려드립니다.', views: 654, comments: 34, likes: 76, timestamp: '4시간 전', isNew: true },
        { id: 7, title: '이번 시즌 OP 챔피언 정리', author: '롤분석가', content: '현재 시즌 OP 챔피언들을 정리해봤어요.', views: 2134, comments: 178, likes: 345, timestamp: '5시간 전', isHot: true },
        { id: 8, title: '브론즈 탈출하는 법', author: '실버됨', content: '브론즈에서 벗어나는 방법 알려드려요.', views: 1876, comments: 145, likes: 267, timestamp: '6시간 전' },
        { id: 9, title: '팀파이트 잘하는 법', author: '한타장인', content: '팀파이트에서 이기는 방법 공유합니다.', views: 1432, comments: 98, likes: 187, timestamp: '7시간 전' },
        { id: 10, title: '라인전 CS 먹는 팁', author: 'CS왕', content: 'CS 효율적으로 먹는 방법입니다.', views: 1234, comments: 87, likes: 156, timestamp: '8시간 전' },
      ]
    },
    {
      id: 'console',
      icon: '🎮',
      title: '콘솔게임',
      description: 'PS, Xbox, Switch 게임',
      totalPosts: 23456,
      todayPosts: 145,
      posts: [
        { id: 11, title: 'PS5 vs Xbox Series X 뭐가 나음?', author: '콘솔러버', content: '콘솔 게임기 구매 고민 중인데 추천 부탁드려요.', views: 2876, comments: 187, likes: 345, timestamp: '10분 전', isHot: true },
        { id: 12, title: '닌텐도 스위치 필수 게임 추천', author: '닌텐도매니아', content: '스위치 샀는데 어떤 게임 사야 할까요?', views: 2134, comments: 156, likes: 289, timestamp: '30분 전' },
        { id: 13, title: '젤다의 전설 왕눈 공략', author: '젤다장인', content: '젤다 왕눈 공략 정리했습니다.', views: 1987, comments: 134, likes: 234, timestamp: '1시간 전', isNew: true },
      ]
    },
    {
      id: 'overwatch',
      icon: '🎯',
      title: '오버워치',
      description: '오버워치 공략, 팁',
      totalPosts: 18765,
      todayPosts: 98,
      posts: [
        { id: 14, title: '시즌10 메타 분석', author: 'OW마스터', content: '새 시즌 메타에 대해 분석해봤습니다.', views: 3214, comments: 198, likes: 456, timestamp: '15분 전', isHot: true },
        { id: 15, title: '탱커 잘하는 법', author: '탱커장인', content: '탱커 플레이 팁 공유합니다.', views: 2456, comments: 167, likes: 334, timestamp: '45분 전' },
        { id: 16, title: '힐러 우선순위', author: '힐러', content: '힐러 힐 우선순위 알려드려요.', views: 1876, comments: 123, likes: 245, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'valorant',
      icon: '🔫',
      title: '발로란트',
      description: 'Valorant 전략, 팁',
      totalPosts: 34567,
      todayPosts: 203,
      posts: [
        { id: 17, title: '신규 요원 성능 분석', author: '발로마스터', content: '신규 요원 능력 분석해봤어요.', views: 4123, comments: 234, likes: 567, timestamp: '8분 전', isNew: true, isHot: true },
        { id: 18, title: '에임 연습 루틴', author: '에임신', content: '에임 늘리는 연습 방법 공유합니다.', views: 3214, comments: 198, likes: 445, timestamp: '35분 전', isHot: true },
        { id: 19, title: '맵별 포지션 가이드', author: '전략가', content: '맵별로 좋은 포지션 정리했습니다.', views: 2456, comments: 156, likes: 334, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'mobile',
      icon: '📱',
      title: '모바일게임',
      description: '모바일 게임 커뮤니티',
      totalPosts: 27654,
      todayPosts: 167,
      posts: [
        { id: 20, title: '요즘 핫한 모바일 게임 추천', author: '모바일러', content: '요즘 재밌는 모바일 게임 뭐가 있나요?', views: 2987, comments: 187, likes: 389, timestamp: '12분 전', isHot: true },
        { id: 21, title: '과금 vs 무과금', author: '무과금왕', content: '무과금으로도 즐길 수 있는 게임 추천해주세요.', views: 2345, comments: 145, likes: 298, timestamp: '40분 전' },
        { id: 22, title: '배터리 덜 닳는 게임', author: '배터리걱정', content: '배터리 소모가 적은 게임 있나요?', views: 1876, comments: 112, likes: 234, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'nikke',
      icon: '💫',
      title: '니케',
      description: 'NIKKE 공략, 정보',
      totalPosts: 19876,
      todayPosts: 134,
      posts: [
        { id: 23, title: '신규 캐릭터 픽업 해야할까요?', author: '니케유저', content: '신규 캐릭터 성능이 어떤가요?', views: 3456, comments: 234, likes: 456, timestamp: '18분 전', isHot: true },
        { id: 24, title: '효율적인 육성 가이드', author: '육성마스터', content: '효율적으로 캐릭터 키우는 법 알려드려요.', views: 2654, comments: 178, likes: 367, timestamp: '50분 전' },
        { id: 25, title: '무과금 덱 추천', author: '무과금', content: '무과금으로 만들 수 있는 덱 추천합니다.', views: 2134, comments: 145, likes: 289, timestamp: '2시간 전', isNew: true },
      ]
    },
    {
      id: 'genshin',
      icon: '⚔️',
      title: '원신',
      description: '원신 공략, 정보',
      totalPosts: 31245,
      todayPosts: 189,
      posts: [
        { id: 26, title: '신규 캐릭터 픽업 추천', author: '원신러버', content: '이번 픽업 캐릭터 뽑아야 할까요?', views: 3987, comments: 245, likes: 523, timestamp: '22분 전', isHot: true },
        { id: 27, title: '나선비경 12층 공략', author: '나선장인', content: '나선비경 12층 클리어 방법입니다.', views: 2876, comments: 198, likes: 412, timestamp: '1시간 전' },
        { id: 28, title: '추천 파티 조합', author: '파티짜는사람', content: '효율적인 파티 조합 공유합니다.', views: 2345, comments: 167, likes: 334, timestamp: '2시간 전', isNew: true },
      ]
    },
    {
      id: 'tft',
      icon: '♟️',
      title: '전략적팀전투',
      description: 'TFT 메타, 덱 추천',
      totalPosts: 16789,
      todayPosts: 112,
      posts: [
        { id: 29, title: '이번 세트 OP 조합', author: 'TFT마스터', content: '현재 시즌 OP 조합 정리했습니다.', views: 3214, comments: 212, likes: 445, timestamp: '16분 전', isHot: true },
        { id: 30, title: '초보자 추천 덱', author: 'TFT입문', content: 'TFT 초보자를 위한 덱 추천합니다.', views: 2456, comments: 178, likes: 356, timestamp: '55분 전' },
        { id: 31, title: '아이템 조합표', author: '아이템왕', content: 'TFT 아이템 조합표 공유해요.', views: 1987, comments: 134, likes: 267, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'maple',
      icon: '🍁',
      title: '메이플스토리',
      description: '메이플 공략, 정보',
      totalPosts: 28765,
      todayPosts: 156,
      posts: [
        { id: 32, title: '뉴비 직업 추천', author: '메린이', content: '처음 시작하는데 어떤 직업이 좋을까요?', views: 3456, comments: 234, likes: 478, timestamp: '14분 전', isHot: true },
        { id: 33, title: '효율적인 메소 파밍', author: '메소부자', content: '메소 효율적으로 버는 방법 알려드려요.', views: 2987, comments: 198, likes: 412, timestamp: '45분 전', isHot: true },
        { id: 34, title: '보스 공략 가이드', author: '보스사냥꾼', content: '각 보스별 공략법 정리했습니다.', views: 2456, comments: 167, likes: 345, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'lostark',
      icon: '⚓',
      title: '로스트아크',
      description: '로스트아크 공략',
      totalPosts: 25643,
      todayPosts: 178,
      posts: [
        { id: 35, title: '복귀 유저 가이드', author: '복귀자', content: '오랜만에 복귀하는데 뭐부터 해야 할까요?', views: 3654, comments: 245, likes: 501, timestamp: '20분 전', isHot: true },
        { id: 36, title: '효율적인 골드 파밍', author: '골드왕', content: '골드 효율적으로 버는 루트 공유합니다.', views: 2876, comments: 189, likes: 423, timestamp: '50분 전' },
        { id: 37, title: '신규 레이드 공략', author: '레이더', content: '신규 레이드 공략법입니다.', views: 2345, comments: 156, likes: 367, timestamp: '2시간 전', isNew: true },
      ]
    },
    {
      id: 'dungeon',
      icon: '⚔️',
      title: '던전앤파이터',
      description: '던파 공략, 정보',
      totalPosts: 22345,
      todayPosts: 142,
      posts: [
        { id: 38, title: '신규 직업 평가', author: '던파고인물', content: '신규 직업 성능 어떤가요?', views: 3123, comments: 212, likes: 445, timestamp: '25분 전', isHot: true },
        { id: 39, title: '효율적인 레벨업', author: '렙업왕', content: '빠르게 레벨업하는 방법 공유합니다.', views: 2654, comments: 178, likes: 389, timestamp: '1시간 전' },
        { id: 40, title: '장비 세팅 가이드', author: '장비장인', content: '각 레벨대별 장비 세팅 추천합니다.', views: 2134, comments: 145, likes: 312, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'starcraft',
      icon: '🚀',
      title: '스타크래프트',
      description: '스타 전략, 리그',
      totalPosts: 19876,
      todayPosts: 98,
      posts: [
        { id: 41, title: 'ASL 시즌 결과 분석', author: '스타매니아', content: 'ASL 시즌 결과에 대해 분석해봤어요.', views: 2876, comments: 198, likes: 423, timestamp: '30분 전', isHot: true },
        { id: 42, title: '종족별 빌드 오더', author: '빌드마스터', content: '각 종족별 추천 빌드 오더입니다.', views: 2345, comments: 167, likes: 356, timestamp: '1시간 전' },
        { id: 43, title: '초보자 멀티 타스킹 연습법', author: '스타선생', content: '멀티 타스킹 연습하는 방법 알려드려요.', views: 1987, comments: 134, likes: 289, timestamp: '2시간 전' },
      ]
    },

    // 재테크 카테고리
    {
      id: 'stock',
      icon: '📈',
      title: '주식',
      description: '주식 투자 정보',
      totalPosts: 34567,
      todayPosts: 234,
      posts: [
        { id: 44, title: '삼성전자 전망 어떻게 보시나요?', author: '주식고수', content: '삼성전자 주가 전망에 대한 의견 나눠요.', views: 4532, comments: 287, likes: 601, timestamp: '8분 전', isNew: true, isHot: true },
        { id: 45, title: '배당주 추천 좀 해주세요', author: '배당러버', content: '장기 보유용 배당주 추천 부탁드립니다.', views: 3456, comments: 234, likes: 512, timestamp: '28분 전', isHot: true },
        { id: 46, title: '미국 주식 vs 한국 주식', author: '글로벌투자자', content: '어디에 투자하는 게 나을까요?', views: 2987, comments: 198, likes: 445, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'crypto',
      icon: '₿',
      title: '가상화폐',
      description: '암호화폐 시세, 정보',
      totalPosts: 28765,
      todayPosts: 203,
      posts: [
        { id: 47, title: '비트코인 지금 사도 될까요?', author: '코인러버', content: '비트코인 매수 타이밍 조언 부탁드려요.', views: 5234, comments: 312, likes: 678, timestamp: '5분 전', isNew: true, isHot: true },
        { id: 48, title: '알트코인 추천', author: '알트왕', content: '유망한 알트코인 추천 부탁합니다.', views: 3876, comments: 245, likes: 534, timestamp: '32분 전', isHot: true },
        { id: 49, title: '코인 세금 정리', author: '세금전문가', content: '코인 세금 관련 정보 정리했습니다.', views: 2987, comments: 187, likes: 423, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'realestate',
      icon: '🏠',
      title: '부동산',
      description: '부동산 투자, 정보',
      totalPosts: 21456,
      todayPosts: 156,
      posts: [
        { id: 50, title: '지금이 집 살 타이밍일까요?', author: '내집마련', content: '부동산 매수 타이밍 조언 부탁드립니다.', views: 4123, comments: 267, likes: 589, timestamp: '15분 전', isHot: true },
        { id: 51, title: '강남 vs 분당 어디가 나음?', author: '지역고민', content: '투자 목적으로 어느 지역이 좋을까요?', views: 3456, comments: 234, likes: 501, timestamp: '45분 전', isHot: true },
        { id: 52, title: '전세 vs 월세 계산법', author: '부동산전문가', content: '전세와 월세 손익 계산하는 법입니다.', views: 2765, comments: 178, likes: 412, timestamp: '2시간 전' },
      ]
    },

    // 스포츠 카테고리
    {
      id: 'football_int',
      icon: '⚽',
      title: '해외축구',
      description: 'EPL, 라리가 등',
      totalPosts: 31245,
      todayPosts: 189,
      posts: [
        { id: 53, title: '손흥민 오늘 경기 미쳤다', author: '토트넘팬', content: '손흥민 플레이 정말 환상적이었어요!', views: 6234, comments: 345, likes: 812, timestamp: '3분 전', isNew: true, isHot: true },
        { id: 54, title: 'EPL 이번 시즌 우승 예상', author: '축구매니아', content: '이번 시즌 우승팀 어디일까요?', views: 4532, comments: 278, likes: 623, timestamp: '25분 전', isHot: true },
        { id: 55, title: '챔스 16강 대진 분석', author: '챔스러버', content: '챔피언스리그 16강 대진 분석해봤어요.', views: 3456, comments: 212, likes: 534, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'football_kr',
      icon: '⚽',
      title: '국내축구',
      description: 'K리그, 국가대표',
      totalPosts: 18765,
      todayPosts: 134,
      posts: [
        { id: 56, title: 'K리그 이번 시즌 전망', author: 'K리그팬', content: 'K리그 이번 시즌 우승팀 예상해봐요.', views: 2876, comments: 178, likes: 389, timestamp: '20분 전', isHot: true },
        { id: 57, title: '국가대표 평가전 결과', author: '태극전사', content: '국가대표 경기 결과 어떻게 보시나요?', views: 2345, comments: 156, likes: 334, timestamp: '50분 전' },
        { id: 58, title: 'K리그 유망주 선수', author: '스카우터', content: 'K리그 떠오르는 선수들 정리했어요.', views: 1987, comments: 123, likes: 278, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'baseball_kr',
      icon: '⚾',
      title: '국내야구',
      description: 'KBO 리그',
      totalPosts: 27654,
      todayPosts: 167,
      posts: [
        { id: 59, title: '한국시리즈 우승 예상', author: '야구팬', content: '올해 한국시리즈 우승팀 어디일까요?', views: 3876, comments: 234, likes: 501, timestamp: '12분 전', isHot: true },
        { id: 60, title: 'FA 시장 전망', author: 'FA분석가', content: 'FA 시장 움직임 분석해봤습니다.', views: 2987, comments: 198, likes: 423, timestamp: '40분 전' },
        { id: 61, title: '올 시즌 MVP 예상', author: '야구광', content: '올 시즌 MVP 누가 받을까요?', views: 2456, comments: 167, likes: 367, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'baseball_int',
      icon: '⚾',
      title: '해외야구',
      description: 'MLB 리그',
      totalPosts: 22345,
      todayPosts: 145,
      posts: [
        { id: 62, title: 'MLB 월드시리즈 결과', author: 'MLB팬', content: '월드시리즈 결과 어떻게 보시나요?', views: 3456, comments: 223, likes: 478, timestamp: '18분 전', isHot: true },
        { id: 63, title: '오타니 내년 행보 예상', author: '오타니팬', content: '오타니 내년에 어떻게 될까요?', views: 2876, comments: 189, likes: 412, timestamp: '55분 전' },
        { id: 64, title: 'MLB 오프시즌 이적 시장', author: '이적분석가', content: 'MLB 이적 시장 분석입니다.', views: 2345, comments: 156, likes: 356, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'basketball_kr',
      icon: '🏀',
      title: '국내농구',
      description: 'KBL 리그',
      totalPosts: 16789,
      todayPosts: 112,
      posts: [
        { id: 65, title: 'KBL 이번 시즌 우승 예상', author: 'KBL팬', content: 'KBL 우승팀 어디일까요?', views: 2654, comments: 178, likes: 367, timestamp: '22분 전', isHot: true },
        { id: 66, title: '신인 드래프트 분석', author: '드래프트분석', content: '드래프트 유망주 정리했습니다.', views: 2134, comments: 145, likes: 312, timestamp: '1시간 전' },
        { id: 67, title: '국내 농구 발전 방향', author: '농구발전', content: 'KBL 발전을 위한 제언입니다.', views: 1876, comments: 123, likes: 267, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'basketball_int',
      icon: '🏀',
      title: '해외농구',
      description: 'NBA 리그',
      totalPosts: 25643,
      todayPosts: 178,
      posts: [
        { id: 68, title: 'NBA 신인왕 예상', author: 'NBA매니아', content: '이번 시즌 신인왕 누가 될까요?', views: 3654, comments: 234, likes: 512, timestamp: '10분 전', isHot: true },
        { id: 69, title: 'Lakers 올 시즌 전망', author: '레이커스팬', content: 'Lakers 우승 가능할까요?', views: 2987, comments: 198, likes: 445, timestamp: '35분 전', isHot: true },
        { id: 70, title: 'NBA 트레이드 루머', author: '트레이드분석', content: 'NBA 트레이드 루머 정리했어요.', views: 2456, comments: 167, likes: 389, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'golf',
      icon: '⛳',
      title: '골프',
      description: '골프 정보, 팁',
      totalPosts: 19876,
      todayPosts: 134,
      posts: [
        { id: 71, title: '골프 입문자 클럽 추천', author: '골프입문', content: '골프 처음 시작하는데 클럽 추천 부탁드려요.', views: 2876, comments: 187, likes: 412, timestamp: '28분 전', isHot: true },
        { id: 72, title: '드라이버 비거리 늘리는 법', author: '비거리왕', content: '드라이버 비거리 늘리는 팁 공유합니다.', views: 2345, comments: 156, likes: 356, timestamp: '1시간 전' },
        { id: 73, title: '수도권 골프장 추천', author: '골프러버', content: '수도권 가성비 좋은 골프장 추천해요.', views: 1987, comments: 134, likes: 298, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'tennis',
      icon: '🎾',
      title: '테니스',
      description: '테니스 정보',
      totalPosts: 14567,
      todayPosts: 98,
      posts: [
        { id: 74, title: '테니스 입문 가이드', author: '테니스입문', content: '테니스 처음 배우는데 팁 알려주세요.', views: 2456, comments: 167, likes: 345, timestamp: '32분 전', isHot: true },
        { id: 75, title: '라켓 추천 부탁드려요', author: '테니스러버', content: '입문자용 라켓 추천 부탁합니다.', views: 1987, comments: 134, likes: 289, timestamp: '1시간 전' },
        { id: 76, title: '서브 잘 넣는 법', author: '서브장인', content: '서브 연습 방법 공유합니다.', views: 1654, comments: 112, likes: 245, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'sports_etc',
      icon: '🏃',
      title: '기타스포츠',
      description: '다양한 스포츠',
      totalPosts: 12345,
      todayPosts: 87,
      posts: [
        { id: 77, title: '배드민턴 초보 가이드', author: '배드민턴', content: '배드민턴 입문 팁 알려드려요.', views: 2234, comments: 145, likes: 312, timestamp: '25분 전', isHot: true },
        { id: 78, title: 'F1 레이싱 보는 사람?', author: 'F1팬', content: 'F1 같이 볼 사람 구합니다.', views: 1876, comments: 123, likes: 267, timestamp: '1시간 전' },
        { id: 79, title: '마라톤 준비 방법', author: '러너', content: '풀마라톤 준비하는 법 공유합니다.', views: 1543, comments: 98, likes: 223, timestamp: '2시간 전' },
      ]
    },

    // 추가 카테고리
    {
      id: 'love',
      icon: '💕',
      title: '연애',
      description: '연애 고민, 상담',
      totalPosts: 23456,
      todayPosts: 178,
      posts: [
        { id: 80, title: '첫 데이트 장소 추천 부탁드려요', author: '연애초보', content: '처음 만나는데 어디가 좋을까요?', views: 3876, comments: 245, likes: 534, timestamp: '8분 전', isNew: true, isHot: true },
        { id: 81, title: '이거 썸 맞나요?', author: '썸고민', content: '요즘 자주 연락하는 이성이 있는데 썸일까요?', views: 3214, comments: 212, likes: 478, timestamp: '30분 전', isHot: true },
        { id: 82, title: '고백 타이밍 언제가 좋을까요?', author: '고백준비중', content: '고백하려는데 타이밍 조언 부탁드려요.', views: 2654, comments: 178, likes: 412, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'fashion',
      icon: '👔',
      title: '패션',
      description: '패션, 뷰티 정보',
      totalPosts: 19876,
      todayPosts: 145,
      posts: [
        { id: 83, title: '겨울 코디 추천', author: '패션피플', content: '겨울 코디 어떻게 하시나요?', views: 3456, comments: 234, likes: 512, timestamp: '15분 전', isHot: true },
        { id: 84, title: '남자 기본 옷장 구성', author: '남자패션', content: '남자 기본 아이템 추천 부탁드려요.', views: 2876, comments: 198, likes: 445, timestamp: '45분 전', isHot: true },
        { id: 85, title: '가성비 좋은 브랜드', author: '가성비러버', content: '가성비 좋은 패션 브랜드 추천해요.', views: 2345, comments: 167, likes: 389, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'free',
      icon: '💬',
      title: '자유게시판',
      description: '자유로운 대화',
      totalPosts: 45678,
      todayPosts: 312,
      posts: [
        { id: 86, title: '오늘 점심 뭐 먹을까요?', author: '점심고민', content: '점심 메뉴 추천 부탁드려요.', views: 2987, comments: 198, likes: 423, timestamp: '5분 전', isNew: true, isHot: true },
        { id: 87, title: '요즘 기분이 안 좋아요', author: '우울이', content: '기분 전환할 방법 없을까요?', views: 2654, comments: 187, likes: 389, timestamp: '28분 전', isHot: true },
        { id: 88, title: '주말에 뭐 하고 지내세요?', author: '주말계획', content: '다들 주말에 뭐 하시나요?', views: 2234, comments: 156, likes: 334, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'study',
      icon: '📚',
      title: '공부',
      description: '학습 정보, 팁',
      totalPosts: 21456,
      todayPosts: 156,
      posts: [
        { id: 89, title: '효율적인 공부 방법', author: '공부왕', content: '공부 효율 높이는 방법 공유합니다.', views: 3456, comments: 234, likes: 523, timestamp: '12분 전', isHot: true },
        { id: 90, title: '집중력 높이는 법', author: '집중맨', content: '집중력 올리는 팁 알려드려요.', views: 2876, comments: 198, likes: 456, timestamp: '40분 전', isHot: true },
        { id: 91, title: '영어 공부 어떻게 하세요?', author: '영어공부', content: '영어 공부 방법 공유해요.', views: 2345, comments: 167, likes: 389, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'soop',
      icon: '🎥',
      title: 'Soop',
      description: 'Soop 스트리머',
      totalPosts: 18765,
      todayPosts: 134,
      posts: [
        { id: 92, title: '요즘 핫한 스트리머 추천', author: 'Soop러버', content: '재밌는 스트리머 추천 부탁드려요.', views: 3214, comments: 212, likes: 478, timestamp: '18분 전', isHot: true },
        { id: 93, title: '오늘 방송 레전드였음', author: '방송봄', content: '오늘 방송 진짜 재밌었어요.', views: 2654, comments: 178, likes: 412, timestamp: '50분 전' },
        { id: 94, title: '스트리머 떡상 예측', author: '떡상예측가', content: '곧 뜰 것 같은 스트리머 있나요?', views: 2134, comments: 145, likes: 356, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'chzzk',
      icon: '📺',
      title: '치지직',
      description: '치지직 스트리머',
      totalPosts: 16789,
      todayPosts: 123,
      posts: [
        { id: 95, title: '치지직 추천 스트리머', author: '치지직팬', content: '치지직 재밌는 스트리머 추천해주세요.', views: 2987, comments: 198, likes: 445, timestamp: '22분 전', isHot: true },
        { id: 96, title: '치지직 vs Soop', author: '플랫폼비교', content: '어느 플랫폼이 더 좋은가요?', views: 2456, comments: 167, likes: 389, timestamp: '55분 전' },
        { id: 97, title: '치지직 기능 개선 바람', author: '사용자', content: '치지직에 이런 기능 있으면 좋겠어요.', views: 1987, comments: 134, likes: 312, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'youtube',
      icon: '▶️',
      title: '유튜브',
      description: '유튜브 크리에이터',
      totalPosts: 27654,
      todayPosts: 189,
      posts: [
        { id: 98, title: '요즘 핫한 유튜버', author: '유튜브러버', content: '요즘 뜨는 유튜버 누구누구 있나요?', views: 4123, comments: 256, likes: 567, timestamp: '10분 전', isHot: true },
        { id: 99, title: '유튜브 영상 편집 팁', author: '편집자', content: '영상 편집 잘하는 법 공유합니다.', views: 3214, comments: 212, likes: 489, timestamp: '35분 전', isHot: true },
        { id: 100, title: '유튜브 수익화 후기', author: '유튜버', content: '유튜브 수익화 달성 후기 공유해요.', views: 2876, comments: 189, likes: 423, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'alba',
      icon: '💼',
      title: '알바',
      description: '알바 정보, 후기',
      totalPosts: 19876,
      todayPosts: 145,
      posts: [
        { id: 101, title: '꿀알바 추천', author: '알바생', content: '시급 좋은 알바 추천 부탁드려요.', views: 3654, comments: 234, likes: 523, timestamp: '16분 전', isHot: true },
        { id: 102, title: '알바 면접 팁', author: '알바고수', content: '알바 면접 잘 보는 법 알려드려요.', views: 2987, comments: 198, likes: 456, timestamp: '48분 전', isHot: true },
        { id: 103, title: '편의점 알바 후기', author: '편의점알바', content: '편의점 알바 경험 공유합니다.', views: 2456, comments: 167, likes: 389, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'tutor',
      icon: '🎓',
      title: '과외',
      description: '과외 정보, 팁',
      totalPosts: 15678,
      todayPosts: 112,
      posts: [
        { id: 104, title: '과외 선생님 구합니다', author: '학부모', content: '수학 과외 선생님 구해요.', views: 2876, comments: 178, likes: 412, timestamp: '24분 전', isHot: true },
        { id: 105, title: '과외 시급 적정선', author: '과외선생', content: '과외 시급 얼마가 적당할까요?', views: 2345, comments: 156, likes: 367, timestamp: '1시간 전' },
        { id: 106, title: '온라인 과외 vs 오프라인 과외', author: '과외고민', content: '어떤 게 더 효과적일까요?', views: 1987, comments: 134, likes: 312, timestamp: '2시간 전' },
      ]
    },
    {
      id: 'dev',
      icon: '💻',
      title: '개발',
      description: '개발자 커뮤니티',
      totalPosts: 29876,
      todayPosts: 203,
      posts: [
        { id: 110, title: 'Next.js 15 써보신 분?', author: '프론트개발자', content: 'Next.js 15 후기 궁금해요.', views: 3654, comments: 245, likes: 534, timestamp: '14분 전', isHot: true },
        { id: 111, title: '신입 개발자 연봉 협상', author: '취준생', content: '연봉 협상 어떻게 해야 할까요?', views: 3214, comments: 212, likes: 489, timestamp: '38분 전', isHot: true },
        { id: 112, title: 'TypeScript 필수인가요?', author: '개발입문', content: '타입스크립트 꼭 배워야 하나요?', views: 2876, comments: 189, likes: 423, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'movie',
      icon: '🎬',
      title: '영화/드라마',
      description: '영화, 드라마 이야기',
      totalPosts: 26543,
      todayPosts: 178,
      posts: [
        { id: 113, title: '오펜하이머 명작이다', author: '영화광', content: '정말 대단한 영화네요.', views: 3876, comments: 234, likes: 567, timestamp: '11분 전', isHot: true },
        { id: 114, title: '넷플릭스 신작 추천', author: '드라마덕후', content: '이번주 볼만한 거 추천해주세요.', views: 3214, comments: 198, likes: 489, timestamp: '42분 전', isHot: true },
        { id: 115, title: '한국 영화 추천', author: '한국영화', content: '꼭 봐야 할 한국 영화 추천해요.', views: 2654, comments: 167, likes: 412, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'food',
      icon: '🍔',
      title: '맛집/요리',
      description: '맛집, 요리 레시피',
      totalPosts: 32145,
      todayPosts: 212,
      posts: [
        { id: 116, title: '성수동 맛집 발견', author: '맛집탐험가', content: '성수동 숨은 맛집 찾았어요!', views: 4123, comments: 256, likes: 589, timestamp: '9분 전', isHot: true },
        { id: 117, title: '집에서 만드는 파스타', author: '요리왕', content: '간단한 파스타 레시피 공유해요.', views: 3456, comments: 223, likes: 512, timestamp: '33분 전', isHot: true },
        { id: 118, title: '강남 오마카세 추천', author: '스시러버', content: '가성비 좋은 오마카세 추천합니다.', views: 2987, comments: 189, likes: 456, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'car',
      icon: '🚗',
      title: '자동차',
      description: '자동차 정보',
      totalPosts: 22456,
      todayPosts: 156,
      posts: [
        { id: 119, title: '테슬라 vs 아이오닉', author: '전기차러버', content: '전기차 구매 고민 중이에요.', views: 3654, comments: 234, likes: 534, timestamp: '17분 전', isHot: true },
        { id: 120, title: '신차 vs 중고차', author: '첫차구매', content: '어떤 게 나을까요?', views: 2987, comments: 198, likes: 467, timestamp: '46분 전', isHot: true },
        { id: 121, title: 'BMW vs 벤츠', author: '수입차', content: '수입차 브랜드 고민됩니다.', views: 2456, comments: 167, likes: 389, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'health',
      icon: '🏋️',
      title: '헬스/운동',
      description: '운동, 건강 정보',
      totalPosts: 24567,
      todayPosts: 167,
      posts: [
        { id: 122, title: '헬스 3개월 변화 후기', author: '헬린이', content: '3개월 운동 결과 공유해요.', views: 3876, comments: 245, likes: 612, timestamp: '13분 전', isHot: true },
        { id: 123, title: '단백질 보충제 추천', author: '벌크업', content: '가성비 좋은 보충제 추천해주세요.', views: 3214, comments: 212, likes: 534, timestamp: '41분 전', isHot: true },
        { id: 124, title: '다이어트 식단 공유', author: '다이어터', content: '-10kg 감량 식단 공유합니다.', views: 2876, comments: 189, likes: 478, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'travel',
      icon: '✈️',
      title: '여행',
      description: '여행 정보, 후기',
      totalPosts: 28765,
      todayPosts: 189,
      posts: [
        { id: 125, title: '오사카 여행 코스 추천', author: '일본러버', content: '오사카 3박4일 코스 추천해주세요.', views: 3987, comments: 256, likes: 589, timestamp: '7분 전', isHot: true },
        { id: 126, title: '유럽 배낭여행 루트', author: '배낭여행', content: '유럽 여행 루트 공유합니다.', views: 3456, comments: 234, likes: 534, timestamp: '31분 전', isHot: true },
        { id: 127, title: '제주도 숨은 명소', author: '제주도민', content: '현지인 추천 명소 알려드려요.', views: 2987, comments: 198, likes: 478, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'it',
      icon: '📱',
      title: 'IT기기',
      description: '스마트폰, IT기기',
      totalPosts: 25643,
      todayPosts: 178,
      posts: [
        { id: 128, title: '아이폰16 vs 갤S24', author: '스마트폰', content: '어떤 걸 살까 고민됩니다.', views: 4234, comments: 267, likes: 612, timestamp: '11분 전', isHot: true },
        { id: 129, title: '무선이어폰 추천', author: '이어폰', content: '가성비 좋은 무선이어폰 찾아요.', views: 3456, comments: 223, likes: 534, timestamp: '39분 전', isHot: true },
        { id: 130, title: '노트북 구매 상담', author: '대학생', content: '학업용 노트북 추천 부탁드려요.', views: 2987, comments: 189, likes: 467, timestamp: '1시간 전' },
      ]
    },
    {
      id: 'hobby',
      icon: '🎨',
      title: '취미/문화',
      description: '다양한 취미 생활',
      totalPosts: 21456,
      todayPosts: 145,
      posts: [
        { id: 131, title: '그림 1년 성장 과정', author: '그림쟁이', content: '그림 독학 1년 결과 공유해요.', views: 3654, comments: 234, likes: 589, timestamp: '19분 전', isHot: true },
        { id: 132, title: '기타 배우기 좋은 강의', author: '기타초보', content: '기타 강의 추천 부탁드려요.', views: 2876, comments: 198, likes: 478, timestamp: '52분 전' },
        { id: 133, title: '독서 습관 만들기', author: '책벌레', content: '독서 습관 만드는 법 공유합니다.', views: 2345, comments: 167, likes: 412, timestamp: '1시간 전' },
      ]
    },
  ];

  // 게시판 순서 정렬: 핫이슈 > 해외축구 > LOL > Soop > 치지직 > 나머지
  const boardOrder = [
    'hot', 'football_int', 'lol', 'soop', 'chzzk',
    'youtube', 'dev', 'stock', 'crypto', 'valorant',
    'baseball_kr', 'basketball_int', 'food', 'love', 'free',
    'health', 'travel', 'it', 'movie', 'car',
    'fashion', 'study', 'alba', 'tutor', 'football_kr',
    'baseball_int', 'basketball_kr', 'golf', 'tennis', 'sports_etc',
    'console', 'overwatch', 'mobile', 'nikke', 'genshin',
    'tft', 'maple', 'lostark', 'dungeon', 'starcraft',
    'realestate', 'hobby'
  ];

  const sortedBoards = boardOrder
    .map(id => boards.find(board => board.id === id))
    .filter((board): board is Board => board !== undefined);

  const currentBoard = sortedBoards.find(board => board.id === activeBoard) || sortedBoards[0];

  return (
    <FMWrapper>
      <Header>
        <HeaderContent>
          <LogoSection>
            <StyledLogoLink href="/">
              <StyledLogoImage src="/VOIDDOT.svg" alt="VOID." width={32} height={32} />
              <StyledLogoText>VOID.</StyledLogoText>
            </StyledLogoLink>
            <BrandTitle>🌷 FM네덜란드</BrandTitle>
          </LogoSection>
          <UserInfo>
            접속자: <span>1,234명</span>
          </UserInfo>
        </HeaderContent>
      </Header>

      <CategoryNav
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <CategoryList>
          {sortedBoards.map((board) => (
            <CategoryTab
              key={board.id}
              $isActive={activeBoard === board.id}
              onClick={() => setActiveBoard(board.id)}
            >
              {board.icon} {board.title}
            </CategoryTab>
          ))}
        </CategoryList>
      </CategoryNav>

      <MainContent>
        <BoardHeader>
          <BoardTitle>
            {currentBoard.icon} {currentBoard.title}
          </BoardTitle>
          <BoardDescription>{currentBoard.description}</BoardDescription>
          <BoardStats>
            <span>📝 전체 {currentBoard.totalPosts.toLocaleString()}개</span>
            <span>🆕 오늘 {currentBoard.todayPosts}개</span>
          </BoardStats>
        </BoardHeader>

        <PostListContainer>
          <PostListHeader>
            <div>제목</div>
            <div>글쓴이</div>
            <div>조회</div>
            <div>추천</div>
            <div>작성시간</div>
          </PostListHeader>
          {currentBoard.posts.map((post) => (
            <PostItem key={post.id} onClick={() => handlePostClick(post)}>
              <PostTitleArea>
                <PostTitle>
                  {post.title}
                  {post.isNew && <span className="badge new-badge">NEW</span>}
                  {post.isHot && <span className="badge hot-badge">HOT</span>}
                  {post.comments > 0 && (
                    <span className="comment-count">[{post.comments}]</span>
                  )}
                </PostTitle>
                <PostMeta>
                  <span className="author">{post.author}</span>
                </PostMeta>
              </PostTitleArea>
              <PostAuthor>{post.author}</PostAuthor>
              <PostCell>{post.views.toLocaleString()}</PostCell>
              <PostCell>{post.likes}</PostCell>
              <PostCell>{post.timestamp}</PostCell>
            </PostItem>
          ))}
        </PostListContainer>
      </MainContent>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPost?.title || ''}
        size="lg"
      >
        <ModalContent>
          {selectedPost && (
            <>
              <PostDetailHeader>
                <PostDetailTitle>{selectedPost.title}</PostDetailTitle>
                <PostDetailMeta>
                  <span className="author">{selectedPost.author}</span>
                  <span>🕐 {selectedPost.timestamp}</span>
                  <span>👁 조회 {selectedPost.views.toLocaleString()}</span>
                </PostDetailMeta>
              </PostDetailHeader>
              <PostDetailBody>{selectedPost.content}</PostDetailBody>
              <PostDetailStats>
                <span>💬 댓글 {selectedPost.comments}</span>
                <span>❤️ 추천 {selectedPost.likes}</span>
                <span>👁 조회수 {selectedPost.views.toLocaleString()}</span>
              </PostDetailStats>
            </>
          )}
        </ModalContent>
      </Modal>
    </FMWrapper>
  );
};

export default FMNetherlands;
