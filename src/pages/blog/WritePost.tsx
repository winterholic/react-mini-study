import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { getCurrentUser } from '../../utils/auth';
import { media } from '../../styles/media';

const WritePageWrapper = styled.div`
  min-height: 100vh;
  background: #fafafa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
`;

const Header = styled.header`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.tablet`
    padding: 1.5rem 2rem;
  `}
`;

const StyledLogoLink = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0.9;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const StyledLogoImage = styled.img`
  border-radius: 8px;
`;

const StyledLogoText = styled.span`
  color: #000;
  font-weight: 800;
  font-size: 20px;
  letter-spacing: -0.5px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.65rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  letter-spacing: -0.2px;

  ${props => props.variant === 'primary' ? `
    background: #000;
    color: #fff;

    &:hover {
      background: #222;
      transform: translateY(-1px);
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.2);
    }

    &:active {
      transform: translateY(0);
    }
  ` : `
    background: transparent;
    color: #666;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
      background: rgba(0, 0, 0, 0.04);
      border-color: rgba(0, 0, 0, 0.15);
    }
  `}
`;

const MainContent = styled.main`
  max-width: 780px;
  margin: 0 auto;
  padding: 3rem 1.5rem;

  ${media.tablet`
    padding: 4rem 2rem;
  `}
`;

const WriteContainer = styled.div`
  background: #fff;
  border-radius: 0;
  box-shadow: none;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0;
  font-size: 2.5rem;
  font-weight: 800;
  border: none;
  outline: none;
  color: #000;
  letter-spacing: -1px;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;

  &::placeholder {
    color: #d0d0d0;
  }

  ${media.tablet`
    font-size: 3rem;
    margin-bottom: 2rem;
  `}
`;

const MetaRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #f0f0f0;
`;

const CategorySelect = styled.select`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background: #fafafa;
  color: #666;
  cursor: pointer;
  outline: none;
  transition: all 0.2s;

  &:hover {
    background: #f0f0f0;
    border-color: rgba(0, 0, 0, 0.15);
  }

  &:focus {
    background: #fff;
    border-color: #000;
  }
`;

const ExcerptInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background: #fafafa;
  color: #666;
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: #999;
  }

  &:hover {
    background: #f0f0f0;
    border-color: rgba(0, 0, 0, 0.15);
  }

  &:focus {
    background: #fff;
    border-color: #000;
  }
`;

const CharCount = styled.span`
  font-size: 0.75rem;
  color: #999;
  padding: 0.5rem 0.75rem;
`;

const EditorWrapper = styled.div`
  .quill {
    background: transparent;
    border: none;
  }

  .ql-toolbar {
    border: none;
    border-bottom: 1px solid #f0f0f0;
    background: transparent;
    padding: 1rem 0;
    margin-bottom: 1.5rem;
    position: sticky;
    top: 73px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 10;
  }

  .ql-toolbar .ql-stroke {
    stroke: #666;
  }

  .ql-toolbar .ql-fill {
    fill: #666;
  }

  .ql-toolbar .ql-picker-label {
    color: #666;
  }

  .ql-toolbar button:hover,
  .ql-toolbar button:focus {
    .ql-stroke {
      stroke: #000;
    }
    .ql-fill {
      fill: #000;
    }
  }

  .ql-toolbar button.ql-active {
    .ql-stroke {
      stroke: #000;
    }
    .ql-fill {
      fill: #000;
    }
  }

  .ql-container {
    border: none;
    font-size: 1.125rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif;
  }

  .ql-editor {
    min-height: 500px;
    padding: 0;
    line-height: 1.8;
    color: #333;

    ${media.tablet`
      min-height: 600px;
      font-size: 1.125rem;
    `}

    h1, h2, h3 {
      font-weight: 800;
      color: #000;
      letter-spacing: -0.5px;
      margin-top: 2em;
      margin-bottom: 0.5em;
    }

    p {
      margin-bottom: 1.2em;
    }

    strong {
      font-weight: 700;
      color: #000;
    }

    blockquote {
      border-left: 3px solid #000;
      padding-left: 1.5rem;
      margin-left: 0;
      color: #666;
      font-style: italic;
    }

    code {
      background: #f5f5f5;
      padding: 0.2em 0.4em;
      border-radius: 4px;
      font-size: 0.9em;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
    }

    a {
      color: #000;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  .ql-editor.ql-blank::before {
    color: #d0d0d0;
    font-style: normal;
    font-size: 1.125rem;
  }
`;

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('패션');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const currentUser = getCurrentUser();

  const categories = ['패션', '라이프스타일', '스타일링', '여행', '음식', '부동산', 'IT'];

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image'
  ];

  const handleSubmit = () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!excerpt.trim()) {
      alert('요약을 입력해주세요.');
      return;
    }

    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    const newPost = {
      title,
      category,
      excerpt,
      content,
      author: currentUser?.name || currentUser?.username || '익명',
      date: new Date().toLocaleDateString('ko-KR'),
      readTime: `${Math.ceil(content.length / 500)}분`
    };

    console.log('새 글 작성:', newPost);
    alert('글이 작성되었습니다! 🎉\n(실제로는 서버에 저장되어야 합니다)');
    window.location.href = '/blog';
  };

  const handleCancel = () => {
    if (title || excerpt || content) {
      if (confirm('작성 중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        window.location.href = '/blog';
      }
    } else {
      window.location.href = '/blog';
    }
  };

  return (
    <WritePageWrapper>
      <Header>
        <HeaderContent>
          <StyledLogoLink href="/">
            <StyledLogoImage src="/VOIDDOT.svg" alt="VOID." width={36} height={36} />
            <StyledLogoText>VOID.</StyledLogoText>
          </StyledLogoLink>
          <HeaderActions>
            <Button variant="secondary" onClick={handleCancel}>
              취소
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              발행
            </Button>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <MainContent>
        <WriteContainer>
          <TitleInput
            type="text"
            placeholder="제목 없음"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <MetaRow>
            <CategorySelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </CategorySelect>

            <ExcerptInput
              type="text"
              placeholder="글 요약을 입력하세요..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              maxLength={100}
            />

            <CharCount>{excerpt.length}/100</CharCount>
          </MetaRow>

          <EditorWrapper>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="이야기를 시작하세요..."
            />
          </EditorWrapper>
        </WriteContainer>
      </MainContent>
    </WritePageWrapper>
  );
};

export default WritePost;
