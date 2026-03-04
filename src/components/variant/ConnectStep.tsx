"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import Button from "@/components/ui/Button";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 56px 28px 48px;
  background: linear-gradient(160deg, #fff5f4 0%, #ffeae8 60%, #ffd6d2 100%);
  animation: ${fadeUp} 0.4s ease;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -1px;
  line-height: 1.25;
  margin-bottom: 36px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 24px;
  padding: 28px 24px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
  margin-bottom: 24px;
`;

const InputLabel = styled.p`
  font-size: 14px;
  color: #9e6b65;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 0.2px;
`;

const CodeInput = styled.input`
  width: 100%;
  padding: 18px 20px;
  border-radius: 16px;
  border: 2px solid #ffe0de;
  background: #fff9f8;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  letter-spacing: 6px;
  font-family: "Pretendard", sans-serif;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: #d1b3b0;
    letter-spacing: 2px;
    font-size: 15px;
    font-weight: 500;
  }

  &:focus {
    border-color: #ef4444;
  }
`;

const HintText = styled.p`
  font-size: 13px;
  color: #b09490;
  text-align: center;
  margin-top: 12px;
  line-height: 1.5;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 8px 0 16px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #f0d8d6;
  }

  span {
    font-size: 13px;
    color: #c4a09c;
    font-weight: 500;
  }
`;

const GenerateBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  color: #ef4444;
  font-family: "Pretendard", sans-serif;
  padding: 4px 0;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:active {
    opacity: 0.7;
  }
`;

const MyCode = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
  background: #fff0ef;
  border-radius: 14px;
  padding: 14px 18px;
  margin-top: 8px;
`;

const CodeDisplay = styled.span`
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 5px;
  color: #ef4444;
`;

const CopyBtn = styled.button`
  background: #ef4444;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
`;

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

interface Props {
  onNext: () => void;
}

export default function ConnectStep({ onNext }: Props) {
  const [code, setCode] = useState("");
  const [myCode, setMyCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setMyCode(generateCode());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(myCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Wrap>
      <Title>초대 코드로{"\n"}연결하세요</Title>

      <Card>
        <InputLabel>상대방 코드 입력</InputLabel>
        <CodeInput
          placeholder="코드 입력"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          maxLength={6}
        />
        <HintText>상대방의 초대 코드를 입력해 주세요.</HintText>
      </Card>

      <Divider>
        <span>또는</span>
      </Divider>

      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <GenerateBtn onClick={handleGenerate}>
          새로운 초대 코드를 생성하기
        </GenerateBtn>
      </div>

      <MyCode visible={!!myCode}>
        <CodeDisplay>{myCode}</CodeDisplay>
        <CopyBtn onClick={handleCopy}>{copied ? "복사됨!" : "복사"}</CopyBtn>
      </MyCode>

      <div style={{ marginTop: "auto", paddingTop: 24 }}>
        <Button
          onClick={onNext}
          disabled={code.length < 4}
          variant={code.length >= 4 ? "primary" : "secondary"}
          fullWidth
        >
          연결하기
        </Button>
      </div>
    </Wrap>
  );
}
