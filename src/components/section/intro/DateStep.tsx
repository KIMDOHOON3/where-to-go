"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import Calendar from "@/components/variant/Calendar";

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
  margin-bottom: 28px;
`;

const HintText = styled.p`
  font-size: 14px;
  color: #9e6b65;
  margin-top: 14px;
  text-align: center;
  font-weight: 500;
`;

interface Props {
  onNext: (date: Date) => void;
}

export default function DateStep({ onNext }: Props) {
  const [selected, setSelected] = useState<Date | null>(null);

  return (
    <Wrap>
      <Title>처음 만난 날을{"\n"}알려주세요</Title>

      <Calendar selectedDate={selected} onSelect={setSelected} />

      {selected && <HintText>이 날부터 다테이가 자동합니다.</HintText>}

      <div style={{ marginTop: "auto", paddingTop: 28 }}>
        <Button
          onClick={() => selected && onNext(selected)}
          disabled={!selected}
          variant={selected ? "primary" : "secondary"}
          fullWidth
        >
          다음
        </Button>
      </div>
    </Wrap>
  );
}
