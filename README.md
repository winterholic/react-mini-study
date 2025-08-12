# 🎨 React Component Library

현대적이고 세련된 디자인의 React 컴포넌트 라이브러리입니다. TypeScript로 작성되었으며, 접근성과 사용성을 중시하여 개발되었습니다.

## ✨ 특징

- **🎨 현대적인 디자인**: 최신 UI/UX 트렌드를 반영한 세련된 디자인
- **♿ 접근성**: ARIA 속성, 키보드 네비게이션, 스크린 리더 지원
- **📱 반응형**: 모바일부터 데스크톱까지 모든 화면 크기 지원
- **🔧 TypeScript**: 완전한 타입 안전성과 개발자 경험 향상
- **🎭 다양한 Variant**: 각 컴포넌트마다 여러 스타일 옵션 제공
- **⚡ 가벼움**: 불필요한 의존성 없이 순수 React로 구현

## 🚀 설치

```bash
# 저장소 클론
git clone https://github.com/winterholic/react-mini-study.git

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 📦 포함된 컴포넌트

### 📝 폼 컴포넌트
- **InputField**: 라벨, 에러 메시지, 도움말 텍스트 지원
- **TextArea**: 다중 줄 텍스트 입력
- **SelectBox**: 드롭다운 선택 박스
- **CheckBox**: 체크박스 (커스텀 디자인)
- **RadioButton**: 라디오 버튼 (커스텀 디자인)
- **ToggleSwitch**: 토글 스위치 (3가지 크기)

### 🔘 버튼 컴포넌트
- **LargeButton**: 5가지 variant (primary, secondary, outline, ghost, danger)
- **SmallButton**: 3가지 크기 (xs, sm, md)

### 🎴 UI 컴포넌트
- **Card**: 4가지 variant (default, elevated, outlined, filled)
- **Badge**: 6가지 색상과 3가지 크기
- **Progress**: 애니메이션과 스트라이프 효과 지원

### 💬 피드백 컴포넌트
- **Alert**: 4가지 타입 (info, success, warning, error)
- **Message**: 간단한 메시지 표시
- **Loader**: 4가지 애니메이션 (spinner, dots, pulse, bars)

### 🎯 인터랙티브 컴포넌트
- **Modal**: 4가지 크기의 모달 다이얼로그
- **Tooltip**: 4방향 툴팁 (위, 아래, 왼쪽, 오른쪽)
- **Accordion**: 접을 수 있는 아코디언
- **Pagination**: 스마트한 페이지 번호 표시

## 🎨 사용 예시

### 기본 사용법

```tsx
import { InputField, LargeButton, Card } from './components';

function App() {
  return (
    <Card variant="elevated" padding="lg">
      <InputField 
        label="이메일" 
        placeholder="이메일을 입력하세요"
        helperText="회원가입에 사용됩니다"
      />
      <LargeButton variant="primary" size="lg">
        제출하기
      </LargeButton>
    </Card>
  );
}
```

### 컴포넌트 쇼케이스

모든 컴포넌트의 다양한 variant와 기능을 확인할 수 있는 쇼케이스 페이지가 포함되어 있습니다.

## 🛠️ 개발 환경

- **React**: 19.1.0
- **TypeScript**: 5.8.3
- **Vite**: 7.0.0
- **Node.js**: 18.0.0 이상

## 📚 학습 포인트

이 프로젝트는 React와 TypeScript를 학습하기에 좋은 예제입니다:

1. **TypeScript 인터페이스**: 각 컴포넌트의 props 타입 정의
2. **React Hooks**: useState, useEffect, useRef 활용
3. **CSS-in-JS**: 인라인 스타일과 동적 스타일링
4. **컴포넌트 합성**: children prop과 컴포넌트 조합
5. **접근성**: ARIA 속성과 키보드 이벤트 처리

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 새로운 기능 브랜치를 만드세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성하세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🙏 감사의 말

React와 TypeScript를 처음 시작하는 분들을 위해 만들어졌습니다. 이 컴포넌트들을 활용하여 멋진 웹 애플리케이션을 만들어보세요!

---

⭐ 이 저장소가 도움이 되었다면 스타를 눌러주세요!
