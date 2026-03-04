"use client";

import styled from "@emotion/styled";

const Page = styled.main`
  min-height: 100dvh;
  padding: 16px;
  background: #fdfcfb;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

const Card = styled.section`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #efefef;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

const Desc = styled.p`
  margin-top: 8px;
  color: #757575;
  line-height: 1.5;
`;

const Hint = styled.small`
  display: block;
  margin-top: 12px;
  color: #bdbdbd;
`;

export default function Home() {
  return (
    <Page>
      <Card>
        <Title>CSS + Emotion 시작</Title>
        <Desc>
          공통 리셋은 CSS로 두고, 컴포넌트 스타일은 Emotion으로 작성합니다.
        </Desc>
        <Hint>모바일 기본 → min-width로 확장</Hint>
      </Card>
    </Page>
  );
}
