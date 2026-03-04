"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Button from "@/components/ui/Button";

const floatAnim = keyframes`
  0%, 100% { transform: translateY(0px) rotate(-5deg); }
  50% { transform: translateY(-12px) rotate(-5deg); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1); }
`;

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
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
  gap: 4px;
`;

const AppName = styled.h1`
  font-size: 42px;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -1.5px;
  line-height: 1.1;
  margin-top: 20px;

  span {
    color: #ef4444;
  }
`;

const SubTitle = styled.p`
  font-size: 15px;
  color: #9e6b65;
  margin-top: 6px;
  font-weight: 500;
`;

const IllustWrap = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${floatAnim} 3.5s ease-in-out infinite;
`;

const RingEmoji = styled.div`
  font-size: 100px;
  filter: drop-shadow(0 12px 32px rgba(239, 68, 68, 0.25));
  user-select: none;
`;

const Sparkle = styled.div<{ x: number; y: number; delay: number }>`
  position: absolute;
  left: ${({ x }) => x}%;
  top: ${({ y }) => y}%;
  font-size: 18px;
  animation: ${sparkle} 2s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const Bottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const WelcomeText = styled.p`
  font-size: 17px;
  color: #555;
  font-weight: 500;
  line-height: 1.6;

  strong {
    color: #1a1a1a;
    font-weight: 700;
  }
`;

interface Props {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: Props) {
  return (
    <Wrap>
      <Top>
        <AppName>
          Between
          <br />
          <span>Urg?</span>
        </AppName>
        <SubTitle>비트윈 알지?</SubTitle>
      </Top>

      <IllustWrap>
        <RingEmoji>💍</RingEmoji>
        <Sparkle x={10} y={15} delay={0}>
          ✨
        </Sparkle>
        <Sparkle x={75} y={10} delay={0.7}>
          ✦
        </Sparkle>
        <Sparkle x={80} y={70} delay={1.2}>
          ✨
        </Sparkle>
        <Sparkle x={5} y={72} delay={0.4}>
          ✦
        </Sparkle>
      </IllustWrap>

      <Bottom>
        <WelcomeText>
          환영합니다!
          <br />
          <strong>우리 둘만의 공간,</strong>
        </WelcomeText>
        <Button onClick={onNext} fullWidth>
          계속하기
        </Button>
      </Bottom>
    </Wrap>
  );
}
