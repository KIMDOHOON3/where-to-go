"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { useCoupleStore, useStartDate } from "@/store/useCoupleStore";
import EditProfileModal from "@/components/modal/EditProfileModal";
import InviteCodeModal from "@/components/modal/InviteCodeModal";

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

const ProfileCard = styled.div`
  margin: 16px;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fca5a5, #ef4444);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;
`;

const ProfileSub = styled.p`
  font-size: 13px;
  color: #999;
  margin-top: 4px;
`;

const ConnectionBadge = styled.span<{ connected: boolean }>`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  background: ${({ connected }) => (connected ? "#dcfce7" : "#fef3c7")};
  color: ${({ connected }) => (connected ? "#16a34a" : "#d97706")};
`;

const MenuList = styled.div`
  padding: 0 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled.div<{ danger?: boolean }>`
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

  ${({ danger }) => danger && `
    background: #fef2f2;
  `}
`;

const MenuIcon = styled.span`
  font-size: 22px;
`;

const MenuText = styled.div`
  flex: 1;
`;

const MenuTitle = styled.p<{ danger?: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${({ danger }) => (danger ? "#ef4444" : "#1a1a1a")};
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

const SectionTitle = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: #999;
  padding: 16px 16px 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default function MoreTab() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const coupleTitle = useCoupleStore((state) => state.coupleTitle);
  const isConnected = useCoupleStore((state) => state.isConnected);
  const startDate = useStartDate();
  const reset = useCoupleStore((state) => state.reset);

  const handleReset = () => {
    if (window.confirm("모든 데이터가 삭제됩니다. 정말 초기화하시겠습니까?")) {
      reset();
      window.location.reload();
    }
  };

  const daysCount = startDate
    ? Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  return (
    <Wrap>
      <Header>
        <Title>더보기</Title>
      </Header>

      <ProfileCard onClick={() => setShowProfileModal(true)}>
        <Avatar>💑</Avatar>
        <ProfileInfo>
          <ProfileName>{coupleTitle}</ProfileName>
          <ProfileSub>
            {startDate ? `D+${daysCount}일 함께` : "시작일을 설정해주세요"}
          </ProfileSub>
        </ProfileInfo>
        <ConnectionBadge connected={isConnected}>
          {isConnected ? "연결됨" : "미연결"}
        </ConnectionBadge>
      </ProfileCard>

      <SectionTitle>설정</SectionTitle>
      <MenuList>
        <MenuItem onClick={() => setShowProfileModal(true)}>
          <MenuIcon>👤</MenuIcon>
          <MenuText>
            <MenuTitle>프로필 설정</MenuTitle>
            <MenuSub>커플 이름, 시작일 변경</MenuSub>
          </MenuText>
          <Arrow>›</Arrow>
        </MenuItem>

        <MenuItem onClick={() => setShowInviteModal(true)}>
          <MenuIcon>💌</MenuIcon>
          <MenuText>
            <MenuTitle>초대 코드</MenuTitle>
            <MenuSub>파트너 연결 코드 확인</MenuSub>
          </MenuText>
          <Arrow>›</Arrow>
        </MenuItem>

        <MenuItem>
          <MenuIcon>🔔</MenuIcon>
          <MenuText>
            <MenuTitle>알림 설정</MenuTitle>
            <MenuSub>기념일 알림 (준비 중)</MenuSub>
          </MenuText>
          <Arrow>›</Arrow>
        </MenuItem>
      </MenuList>

      <SectionTitle>기타</SectionTitle>
      <MenuList>
        <MenuItem>
          <MenuIcon>❓</MenuIcon>
          <MenuText>
            <MenuTitle>도움말</MenuTitle>
            <MenuSub>자주 묻는 질문</MenuSub>
          </MenuText>
          <Arrow>›</Arrow>
        </MenuItem>

        <MenuItem danger onClick={handleReset}>
          <MenuIcon>🗑️</MenuIcon>
          <MenuText>
            <MenuTitle danger>데이터 초기화</MenuTitle>
            <MenuSub>모든 데이터 삭제</MenuSub>
          </MenuText>
        </MenuItem>
      </MenuList>

      {showProfileModal && (
        <EditProfileModal onClose={() => setShowProfileModal(false)} />
      )}
      {showInviteModal && (
        <InviteCodeModal onClose={() => setShowInviteModal(false)} />
      )}
    </Wrap>
  );
}
