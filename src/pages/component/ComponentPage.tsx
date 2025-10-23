import React, { useState } from "react";
import styled from "styled-components";
import InputField from "../../components/InputField";
import TextArea from "../../components/TextArea";
import LargeButton from "../../components/LargeButton";
import SmallButton from "../../components/SmallButton";
import Card from "../../components/Card";
import SelectBox from "../../components/SelectBox";
import CheckBox from "../../components/CheckBox";
import RadioButton from "../../components/RadioButton";
import ToggleSwitch from "../../components/ToggleSwitch";
import Alert from "../../components/Alert";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import Tooltip from "../../components/Tooltip";
import Badge from "../../components/Badge";
import Progress from "../../components/Progress";
import Accordion, { AccordionItem } from "../../components/Accordion";
import { media } from "../../styles/media";

const PageWrapper = styled.div`
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

const HeroTitle = styled.h1`
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

const ComponentPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [toggleChecked, setToggleChecked] = useState(false);
  const [progressValue, setProgressValue] = useState(65);

  const selectOptions = [
    { value: "option1", label: "옵션 1" },
    { value: "option2", label: "옵션 2" },
    { value: "option3", label: "옵션 3" },
  ];

  return (
    <PageWrapper>
      <Header>
        <HeaderContent>
          <StyledLogoLink href="/">
            <StyledLogoImage src="/VOIDDOT.svg" alt="VOID." width={36} height={36} />
            <StyledLogoText>VOID.</StyledLogoText>
          </StyledLogoLink>
          <NavMenu>
            <NavItem active>컴포넌트</NavItem>
            <NavItem>문서</NavItem>
            <NavItem>예제</NavItem>
            <NavItem>가이드</NavItem>
          </NavMenu>
        </HeaderContent>
      </Header>

      <HeroSection>
        <HeroContent>
          <HeroTitle>🎨 Component Showcase</HeroTitle>
          <HeroSubtitle>재사용 가능한 UI 컴포넌트 라이브러리</HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <MainContent>

      {/* Form Components */}
      <Card variant="elevated" padding="lg" style={{ marginBottom: "32px" }}>
        <h2 style={{ marginTop: 0, color: "#111827", marginBottom: "24px" }}>📝 폼 컴포넌트</h2>
        
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <InputField 
            label="이메일 주소" 
            placeholder="이메일을 입력하세요"
            helperText="회원가입에 사용됩니다"
          />
          
          <InputField 
            label="비밀번호" 
            type="password" 
            placeholder="비밀번호를 입력하세요"
            error="비밀번호는 8자 이상이어야 합니다"
          />
          
          <TextArea 
            label="자기소개" 
            placeholder="자기소개를 작성해주세요"
            helperText="최대 500자까지 작성 가능합니다"
          />
          
          <SelectBox 
            label="선호하는 언어" 
            options={selectOptions}
            placeholder="언어를 선택하세요"
          />
        </div>

        <div style={{ marginTop: "24px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <CheckBox 
            label="이용약관에 동의합니다" 
            checked={checkboxChecked}
            onChange={(e) => setCheckboxChecked(e.target.checked)}
          />
          
          <RadioButton 
            label="옵션 1" 
            value="option1" 
            checked={radioValue === "option1"}
            onChange={(e) => setRadioValue(e.target.value)}
          />
          
          <RadioButton 
            label="옵션 2" 
            value="option2" 
            checked={radioValue === "option2"}
            onChange={(e) => setRadioValue(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "24px" }}>
          <ToggleSwitch 
            label="알림 받기" 
            checked={toggleChecked}
            onChange={setToggleChecked}
            size="lg"
          />
        </div>
      </Card>

      {/* Button Components */}
      <Card variant="elevated" padding="lg" style={{ marginBottom: "32px" }}>
        <h2 style={{ marginTop: 0, color: "#111827", marginBottom: "24px" }}>🔘 버튼 컴포넌트</h2>
        
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
          <LargeButton variant="primary">기본 버튼</LargeButton>
          <LargeButton variant="secondary">보조 버튼</LargeButton>
          <LargeButton variant="outline">아웃라인 버튼</LargeButton>
          <LargeButton variant="ghost">고스트 버튼</LargeButton>
          <LargeButton variant="danger">위험 버튼</LargeButton>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
          <LargeButton size="sm">작은 버튼</LargeButton>
          <LargeButton size="md">중간 버튼</LargeButton>
          <LargeButton size="lg">큰 버튼</LargeButton>
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <SmallButton variant="primary" size="xs">XS</SmallButton>
          <SmallButton variant="primary" size="sm">SM</SmallButton>
          <SmallButton variant="primary" size="md">MD</SmallButton>
        </div>
      </Card>

      {/* Feedback Components */}
      <Card variant="elevated" padding="lg" style={{ marginBottom: "32px" }}>
        <h2 style={{ marginTop: 0, color: "#111827", marginBottom: "24px" }}>💬 피드백 컴포넌트</h2>
        
        <div style={{ marginBottom: "24px" }}>
          <Alert type="info" title="정보" style={{ marginBottom: "12px" }}>
            이것은 정보 알림입니다. 중요한 정보를 전달합니다.
          </Alert>
          
          <Alert type="success" title="성공" style={{ marginBottom: "12px" }}>
            작업이 성공적으로 완료되었습니다!
          </Alert>
          
          <Alert type="warning" title="경고" style={{ marginBottom: "12px" }}>
            주의가 필요한 상황입니다.
          </Alert>
          
          <Alert type="error" title="오류" style={{ marginBottom: "12px" }}>
            오류가 발생했습니다. 다시 시도해주세요.
          </Alert>
        </div>

        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
          <Message type="info" title="메시지">간단한 정보 메시지입니다.</Message>
          <Message type="success" title="성공">성공 메시지입니다.</Message>
          <Message type="warning" title="경고">경고 메시지입니다.</Message>
          <Message type="error" title="오류">오류 메시지입니다.</Message>
        </div>
      </Card>

      {/* Data Display Components */}
      <Card variant="elevated" padding="lg" style={{ marginBottom: "32px" }}>
        <h2 style={{ marginTop: 0, color: "#111827", marginBottom: "24px" }}>📊 데이터 표시 컴포넌트</h2>
        
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "16px", color: "#374151" }}>로딩 애니메이션</h3>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Loader variant="spinner" size={32} />
            <Loader variant="dots" size={32} />
            <Loader variant="pulse" size={32} />
            <Loader variant="bars" size={32} />
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "16px", color: "#374151" }}>진행률 바</h3>
          <Progress 
            value={progressValue} 
            showLabel 
            animated 
            striped 
            style={{ marginBottom: "16px" }}
          />
          <Progress 
            value={45} 
            variant="success" 
            size="sm" 
            style={{ marginBottom: "16px" }}
          />
          <Progress 
            value={80} 
            variant="warning" 
            size="lg" 
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "16px", color: "#374151" }}>배지</h3>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Badge variant="default">기본</Badge>
            <Badge variant="primary">주요</Badge>
            <Badge variant="success">성공</Badge>
            <Badge variant="warning">경고</Badge>
            <Badge variant="error">오류</Badge>
            <Badge variant="info">정보</Badge>
          </div>
          
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "12px" }}>
            <Badge size="sm" dot>작은</Badge>
            <Badge size="md" dot>중간</Badge>
            <Badge size="lg" dot>큰</Badge>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: "16px", color: "#374151" }}>페이지네이션</h3>
          <Pagination 
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            size="md"
          />
        </div>
      </Card>

      {/* Interactive Components */}
      <Card variant="elevated" padding="lg" style={{ marginBottom: "32px" }}>
        <h2 style={{ marginTop: 0, color: "#111827", marginBottom: "24px" }}>🎯 인터랙티브 컴포넌트</h2>
        
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "16px", color: "#374151" }}>툴팁</h3>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Tooltip content="위쪽에 표시되는 툴팁입니다" position="top">
              <SmallButton>위쪽 툴팁</SmallButton>
            </Tooltip>
            
            <Tooltip content="아래쪽에 표시되는 툴팁입니다" position="bottom">
              <SmallButton>아래쪽 툴팁</SmallButton>
            </Tooltip>
            
            <Tooltip content="왼쪽에 표시되는 툴팁입니다" position="left">
              <SmallButton>왼쪽 툴팁</SmallButton>
            </Tooltip>
            
            <Tooltip content="오른쪽에 표시되는 툴팁입니다" position="right">
              <SmallButton>오른쪽 툴팁</SmallButton>
            </Tooltip>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ marginBottom: "16px", color: "#374151" }}>모달</h3>
          <LargeButton onClick={() => setModalOpen(true)}>
            모달 열기
          </LargeButton>
          
          <Modal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)}
            title="샘플 모달"
            size="md"
          >
            <p style={{ marginBottom: "20px" }}>
              이것은 샘플 모달입니다. 다양한 내용을 포함할 수 있습니다.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <SmallButton variant="secondary" onClick={() => setModalOpen(false)}>
                취소
              </SmallButton>
              <SmallButton variant="primary" onClick={() => setModalOpen(false)}>
                확인
              </SmallButton>
            </div>
          </Modal>
        </div>

        <div>
          <h3 style={{ marginBottom: "16px", color: "#374151" }}>아코디언</h3>
          <Accordion>
            <AccordionItem title="첫 번째 섹션">
              <p>첫 번째 섹션의 내용입니다. 여기에 다양한 컴포넌트나 텍스트를 넣을 수 있습니다.</p>
            </AccordionItem>
            <AccordionItem title="두 번째 섹션">
              <p>두 번째 섹션의 내용입니다. 폼 요소나 다른 컴포넌트들을 포함할 수 있습니다.</p>
              <InputField label="이름" placeholder="이름을 입력하세요" />
            </AccordionItem>
            <AccordionItem title="세 번째 섹션">
              <p>세 번째 섹션의 내용입니다. 이미지나 복잡한 레이아웃도 가능합니다.</p>
              <div style={{ display: "flex", gap: "12px" }}>
                <Badge variant="primary">태그 1</Badge>
                <Badge variant="success">태그 2</Badge>
                <Badge variant="warning">태그 3</Badge>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>

      {/* Card Variations - Temporarily commented out for debugging
      <Card variant="elevated" padding="lg" style={{ marginBottom: "32px" }}>
        <h2 style={{ marginTop: 0, color: "#111827", marginBottom: "24px" }}>🃏 카드 변형</h2>

        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          <Card variant="default" padding="md">
            <h4 style={{ marginTop: 0, color: "#111827" }}>기본 카드</h4>
            <p style={{ color: "#6b7280", margin: 0 }}>기본 스타일의 카드입니다.</p>
          </Card>

          <Card variant="elevated" padding="md" hoverable>
            <h4 style={{ marginTop: 0, color: "#111827" }}>들어올린 카드</h4>
            <p style={{ color: "#6b7280", margin: 0 }}>호버 효과가 있는 카드입니다.</p>
          </Card>

          <Card variant="outlined" padding="md">
            <h4 style={{ marginTop: 0, color: "#111827" }}>아웃라인 카드</h4>
            <p style={{ color: "#6b7280", margin: 0 }}>테두리가 강조된 카드입니다.</p>
          </Card>

          <Card variant="filled" padding="md">
            <h4 style={{ marginTop: 0, color: "#111827" }}>채워진 카드</h4>
            <p style={{ color: "#6b7280", margin: 0 }}>배경이 채워진 카드입니다.</p>
          </Card>
        </div>
      </Card>
      */}
      </MainContent>
    </PageWrapper>
  );
};

export default ComponentPage;
