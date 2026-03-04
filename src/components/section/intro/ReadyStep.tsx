"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Button from "@/components/ui/Button";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-16px) scale(1.05); }
  60% { transform: translateY(-8px) scale(1.02); }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100%;
  padding: 60px 28px 48px;
  background: linear-gradient(160deg, #fff5f4 0%, #ffeae8 60%, #ffd6d2 100%);
  text-align: center;
  animation: ${fadeUp} 0.5s ease;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 34px;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -1px;
  margin-bottom: 8px;
`;

const IllustWrap = styled.div`
  font-size: 90px;
  margin: 16px 0 8px;
  animation: ${bounce} 2.5s ease-in-out infinite;
  filter: drop-shadow(0 10px 24px rgba(239, 68, 68, 0.2));
  user-select: none;
`;

const Description = styled.p`
  font-size: 16px;
  color: #5a3d3a;
  font-weight: 500;
  line-height: 1.7;
  margin-top: 12px;
`;

const ProfileRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-end;
  justify-content: center;
  margin-top: 28px;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Avatar = styled.div<{ isMe: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: ${({ isMe }) =>
    isMe
      ? "linear-gradient(135deg, #fca5a5, #ef4444)"
      : "linear-gradient(135deg, #fdba74, #f97316)"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
`;

const ProfileLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #9e6b65;
`;

const HeartDivider = styled.div`
  font-size: 28px;
  margin-bottom: 12px;
  animation: ${bounce} 2.5s ease-in-out infinite 0.4s;
`;

const Notice = styled.p`
  font-size: 12px;
  color: #c4a09c;
  margin-top: 12px;
  line-height: 1.6;
`;

const Bottom = styled.div`
  width: 100%;
`;

interface Props {
  onStart: () => void;
  firstDate?: Date | null;
}

export default function ReadyStep({ onStart, firstDate }: Props) {
  const dayCount = firstDate
    ? Math.floor(
        (Date.now() - firstDate.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
    : null;

  return (
    <Wrap>
      <Top>
        <Title>준비 완료!</Title>

        <IllustWrap>💍</IllustWrap>

        <Description>
          모든 준비가 끝났어요.<br />
          우리만의 이야기를 시작해보세요!
        </Description>

        {dayCount !== null && (
          <Description style={{ marginTop: 6, color: "#ef4444", fontWeight: 700 }}>
            우리 함께한 지 {dayCount}일 째 💕
          </Description>
        )}

        <ProfileRow>
          <ProfileCard>
            <Avatar isMe={true}>🙋</Avatar>
            <ProfileLabel>나 (Me)</ProfileLabel>
          </ProfileCard>
          <HeartDivider>💗</HeartDivider>
          <ProfileCard>
            <Avatar isMe={false}>🙋‍♀️</Avatar>
            <ProfileLabel>나 (You)</ProfileLabel>
          </ProfileCard>
        </ProfileRow>

        <Notice>프로필은 나중에 바꿀 수 있어요.</Notice>
      </Top>

      <Bottom>
        <Button onClick={onStart} fullWidth>시작하기</Button>
      </Bottom>
    </Wrap>
  );
}
