"use client";

import styled from "@emotion/styled";

const Wrap = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 90px;
  background: #faf5f4;
`;

const Header = styled.div`
  padding: 20px 16px 16px;
  background: linear-gradient(160deg, #fff5f4 0%, #ffeae8 100%);
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -0.8px;
`;

const MenuList = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  box-shadow: 0 1px 8px rgba(0,0,0,0.04);
  transition: all 0.15s ease;

  &:active { transform: scale(0.98); }
`;

const MenuIcon = styled.span`
  font-size: 22px;
`;

const MenuText = styled.div`
  flex: 1;
`;

const MenuTitle = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.3px;
`;

const MenuSub = styled.p`
  font-size: 12px;
  color: #b0a09e;
  margin-top: 2px;
`;

const Arrow = styled.span`
  font-size: 16px;
  color: #d1b3b0;
`;

const MENUS = [
  { icon: "👤", title: "프로필 설정", sub: "사진, 이름 변경" },
  { icon: "🔔", title: "알림 설정", sub: "기념일, 데이트 알림" },
  { icon: "🎨", title: "테마 변경", sub: "앱 색상, 배경 커스텀" },
  { icon: "💌", title: "초대 코드", sub: "파트너 연결 코드 공유" },
  { icon: "❓", title: "도움말", sub: "자주 묻는 질문" },
];

export default function MoreTab() {
  return (
    <Wrap>
      <Header>
        <Title>더보기</Title>
      </Header>
      <MenuList>
        {MENUS.map((m) => (
          <MenuItem key={m.title}>
            <MenuIcon>{m.icon}</MenuIcon>
            <MenuText>
              <MenuTitle>{m.title}</MenuTitle>
              <MenuSub>{m.sub}</MenuSub>
            </MenuText>
            <Arrow>›</Arrow>
          </MenuItem>
        ))}
      </MenuList>
    </Wrap>
  );
}
