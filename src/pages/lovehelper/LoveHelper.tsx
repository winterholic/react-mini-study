import { useState } from 'react';
import styled from 'styled-components';
import { media } from '../../styles/media';
import { getCurrentUser } from '../../utils/auth';

const LoveHelperWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0a;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
  display: flex;
  flex-direction: column;
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
  max-width: 1200px;
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
  color: #fff;

  span {
    background: linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const IconButton = styled.button<{ variant?: 'admin' | 'sim' }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${props => {
    if (props.variant === 'admin') return 'linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(245, 158, 11, 0.1))';
    if (props.variant === 'sim') return 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))';
    return 'rgba(255, 255, 255, 0.05)';
  }};
  border: 1px solid ${props => {
    if (props.variant === 'admin') return 'rgba(251, 191, 36, 0.3)';
    if (props.variant === 'sim') return 'rgba(139, 92, 246, 0.3)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  color: ${props => {
    if (props.variant === 'admin') return 'rgba(251, 191, 36, 0.9)';
    if (props.variant === 'sim') return 'rgba(167, 139, 250, 0.9)';
    return 'rgba(255, 255, 255, 0.7)';
  }};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: ${props => {
      if (props.variant === 'admin') return 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.2))';
      if (props.variant === 'sim') return 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(124, 58, 237, 0.2))';
      return 'rgba(255, 255, 255, 0.1)';
    }};
    color: ${props => {
      if (props.variant === 'admin') return '#fbbf24';
      if (props.variant === 'sim') return '#a78bfa';
      return '#fff';
    }};
    border-color: ${props => {
      if (props.variant === 'admin') return 'rgba(251, 191, 36, 0.5)';
      if (props.variant === 'sim') return 'rgba(139, 92, 246, 0.5)';
      return 'rgba(255, 255, 255, 0.2)';
    }};
    transform: translateY(-2px);
    box-shadow: ${props => {
      if (props.variant === 'admin') return '0 8px 16px rgba(251, 191, 36, 0.2)';
      if (props.variant === 'sim') return '0 8px 16px rgba(139, 92, 246, 0.2)';
      return '0 8px 16px rgba(255, 255, 255, 0.1)';
    }};
  }

  &:active {
    transform: translateY(0);
  }
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  gap: 0;

  ${media.tablet`
    gap: 1px;
  `}
`;

const Sidebar = styled.div`
  width: 280px;
  background: rgba(18, 18, 18, 0.8);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: none;
  flex-direction: column;

  ${media.tablet`
    display: flex;
  `}
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

const ModeTab = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${props => props.active ? 'rgba(255, 107, 157, 0.1)' : 'transparent'};
  border: none;
  border-left: 3px solid ${props => props.active ? '#ff6b9d' : 'transparent'};
  color: ${props => props.active ? '#ff6b9d' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 0.95rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #ff6b9d;
  }
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0a0a0a;
`;

const ChatHeader = styled.div`
  padding: 1.25rem 1.5rem;
  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusBadge = styled.span`
  padding: 4px 12px;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Message = styled.div<{ isUser?: boolean }>`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
`;

const Avatar = styled.div<{ isUser?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.isUser
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    : 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%)'
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
`;

const MessageBubble = styled.div<{ isUser?: boolean }>`
  max-width: 70%;
  padding: 1rem 1.25rem;
  border-radius: 18px;
  background: ${props => props.isUser
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 107, 157, 0.1)'
  };
  border: 1px solid ${props => props.isUser
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 107, 157, 0.2)'
  };
  color: rgba(255, 255, 255, 0.95);
  font-size: 0.95rem;
  line-height: 1.6;
`;

const InputArea = styled.div`
  padding: 1.5rem;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  color: #fff;
  font-size: 0.95rem;
  font-family: inherit;
  resize: none;
  min-height: 52px;
  max-height: 120px;
  outline: none;
  transition: all 0.2s;

  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 107, 157, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const SendButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Modal = styled.div<{ show?: boolean }>`
  display: ${props => props.show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: #1a1a1a;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;

  &:focus {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 107, 157, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

const ModalButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
  }
`;

const LoveHelper = () => {
  const [mode, setMode] = useState<'consult' | 'simulation'>('consult');
  const [showSettings, setShowSettings] = useState(false);
  const [showSimSettings, setShowSimSettings] = useState(false);
  const currentUser = getCurrentUser();
  const isAdmin = currentUser?.username === 'admin';

  const demoMessages = [
    { isUser: false, text: '안녕하세요! 러브헬퍼입니다 💕 무엇을 도와드릴까요?' },
    { isUser: true, text: '안녕하세요! 연애 고민이 있어서요...' },
  ];

  return (
    <LoveHelperWrapper>
      <Header>
        <HeaderContent>
          <LogoSection>
            <StyledLogoLink href="/">
              <StyledLogoImage src="/VOIDDOT.svg" alt="VOID." width={32} height={32} />
              <StyledLogoText>VOID.</StyledLogoText>
            </StyledLogoLink>
            <BrandTitle>
              <span>💕 러브헬퍼</span>
            </BrandTitle>
          </LogoSection>
          <HeaderActions>
            {isAdmin && (
              <IconButton variant="admin" onClick={() => setShowSettings(true)} title="관리자 설정">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </IconButton>
            )}
          </HeaderActions>
        </HeaderContent>
      </Header>

      <MainContainer>
        <Sidebar>
          <SidebarHeader>
            <h3 style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.875rem', fontWeight: 600, margin: 0 }}>모드 선택</h3>
          </SidebarHeader>
          <div>
            <ModeTab active={mode === 'consult'} onClick={() => setMode('consult')}>
              <span>💬</span>
              상담 모드
            </ModeTab>
            <ModeTab active={mode === 'simulation'} onClick={() => setMode('simulation')}>
              <span>🎭</span>
              시뮬레이션 모드
            </ModeTab>
          </div>
        </Sidebar>

        <ChatArea>
          <ChatHeader>
            <ChatTitle>
              {mode === 'consult' ? '💬 상담 모드' : '🎭 시뮬레이션 모드'}
              <StatusBadge>Online</StatusBadge>
            </ChatTitle>
            {mode === 'simulation' && (
              <IconButton variant="sim" onClick={() => setShowSimSettings(true)} title="시뮬레이션 설정">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </IconButton>
            )}
          </ChatHeader>

          <MessagesContainer>
            {demoMessages.map((msg, idx) => (
              <Message key={idx} isUser={msg.isUser}>
                <Avatar isUser={msg.isUser}>
                  {msg.isUser ? '👤' : '💕'}
                </Avatar>
                <MessageBubble isUser={msg.isUser}>
                  {msg.text}
                </MessageBubble>
              </Message>
            ))}
          </MessagesContainer>

          <InputArea>
            <InputWrapper>
              <Input placeholder="메시지를 입력하세요..." rows={1} />
              <SendButton>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </SendButton>
            </InputWrapper>
          </InputArea>
        </ChatArea>
      </MainContainer>

      {/* 관리자 설정 모달 */}
      <Modal show={showSettings}>
        <ModalContent>
          <ModalHeader>
            <h3>⚙️ 프롬프트 설정</h3>
            <CloseButton onClick={() => setShowSettings(false)}>✕</CloseButton>
          </ModalHeader>
          <FormGroup>
            <Label>시스템 프롬프트</Label>
            <ModalInput as="textarea" rows={8} placeholder="GPT에게 전달할 시스템 프롬프트를 입력하세요..." style={{ resize: 'vertical' }} />
          </FormGroup>
          <ModalButton>저장하기</ModalButton>
        </ModalContent>
      </Modal>

      {/* 시뮬레이션 설정 모달 */}
      <Modal show={showSimSettings}>
        <ModalContent>
          <ModalHeader>
            <h3>🎭 시뮬레이션 설정</h3>
            <CloseButton onClick={() => setShowSimSettings(false)}>✕</CloseButton>
          </ModalHeader>
          <FormGroup>
            <Label>성별</Label>
            <ModalInput placeholder="예: 남성, 여성" />
          </FormGroup>
          <FormGroup>
            <Label>나이</Label>
            <ModalInput placeholder="예: 25살" />
          </FormGroup>
          <FormGroup>
            <Label>직업</Label>
            <ModalInput placeholder="예: 개발자" />
          </FormGroup>
          <FormGroup>
            <Label>MBTI</Label>
            <ModalInput placeholder="예: ENFP" />
          </FormGroup>
          <FormGroup>
            <Label>성격</Label>
            <ModalInput placeholder="예: 활발하고 긍정적인" />
          </FormGroup>
          <FormGroup>
            <Label>기타 특징</Label>
            <ModalInput as="textarea" rows={3} placeholder="추가 특징을 입력하세요..." style={{ resize: 'vertical' }} />
          </FormGroup>
          <ModalButton>시뮬레이션 시작</ModalButton>
        </ModalContent>
      </Modal>
    </LoveHelperWrapper>
  );
};

export default LoveHelper;
