"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useCoupleStore } from "@/store/useCoupleStore";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.2s ease;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 390px;
  background: #fff;
  border-radius: 24px 24px 0 0;
  padding: 24px 20px 40px;
  animation: ${slideUp} 0.3s ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: -0.5px;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #999;
  cursor: pointer;
  padding: 4px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 12px;
`;

const CodeCard = styled.div`
  background: #fff5f4;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
`;

const CodeDisplay = styled.p`
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 6px;
  color: #ef4444;
  margin-bottom: 12px;
`;

const CodeHint = styled.p`
  font-size: 13px;
  color: #999;
`;

const EmptyCode = styled.p`
  font-size: 15px;
  color: #999;
  margin-bottom: 16px;
`;

const StatusCard = styled.div<{ connected: boolean }>`
  background: ${({ connected }) => (connected ? "#dcfce7" : "#fef3c7")};
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusIcon = styled.span`
  font-size: 24px;
`;

const StatusText = styled.div`
  flex: 1;
`;

const StatusTitle = styled.p<{ connected: boolean }>`
  font-size: 15px;
  font-weight: 700;
  color: ${({ connected }) => (connected ? "#16a34a" : "#d97706")};
`;

const StatusSub = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

interface Props {
  onClose: () => void;
}

export default function InviteCodeModal({ onClose }: Props) {
  const myInviteCode = useCoupleStore((state) => state.myInviteCode);
  const partnerCode = useCoupleStore((state) => state.partnerCode);
  const isConnected = useCoupleStore((state) => state.isConnected);
  const setMyInviteCode = useCoupleStore((state) => state.setMyInviteCode);

  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newCode = generateCode();
    setMyInviteCode(newCode);
  };

  const handleCopy = () => {
    if (myInviteCode) {
      navigator.clipboard.writeText(myInviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>초대 코드</Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <Section>
          <Label>연결 상태</Label>
          <StatusCard connected={isConnected}>
            <StatusIcon>{isConnected ? "💕" : "💔"}</StatusIcon>
            <StatusText>
              <StatusTitle connected={isConnected}>
                {isConnected ? "파트너와 연결됨" : "연결 대기 중"}
              </StatusTitle>
              <StatusSub>
                {isConnected
                  ? `파트너 코드: ${partnerCode}`
                  : "상대방의 코드를 입력하면 연결됩니다"}
              </StatusSub>
            </StatusText>
          </StatusCard>
        </Section>

        <Section>
          <Label>내 초대 코드</Label>
          {myInviteCode ? (
            <CodeCard>
              <CodeDisplay>{myInviteCode}</CodeDisplay>
              <CodeHint>이 코드를 상대방에게 공유하세요</CodeHint>
              <div style={{ marginTop: 16 }}>
                <Button onClick={handleCopy} variant="primary" fullWidth>
                  {copied ? "복사됨!" : "코드 복사하기"}
                </Button>
              </div>
            </CodeCard>
          ) : (
            <CodeCard>
              <EmptyCode>아직 초대 코드가 없습니다</EmptyCode>
              <Button onClick={handleGenerate} variant="primary" fullWidth>
                초대 코드 생성
              </Button>
            </CodeCard>
          )}
        </Section>
      </Modal>
    </Overlay>
  );
}
