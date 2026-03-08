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

const DateDisplay = styled.div`
  background: #fff5f4;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  margin-bottom: 20px;
`;

const DateText = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #ef4444;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #f0e8e7;
  border-radius: 12px;
  font-size: 16px;
  font-family: "Pretendard", sans-serif;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #ef4444;
  }

  &::placeholder {
    color: #ccc;
  }
`;

const EmojiGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const EmojiBtn = styled.button<{ selected: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid ${({ selected }) => (selected ? "#ef4444" : "#f0e8e7")};
  background: ${({ selected }) => (selected ? "#fff5f4" : "#fff")};
  font-size: 24px;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    border-color: #ef4444;
  }
`;

const ColorGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const ColorBtn = styled.button<{ color: string; selected: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid ${({ selected }) => (selected ? "#1a1a1a" : "transparent")};
  background: ${({ color }) => color};
  cursor: pointer;
  transition: all 0.15s;
`;

const EMOJIS = ["🎂", "💕", "🎉", "💍", "🌹", "✨", "🎁", "💑", "🏠", "🎓"];
const COLORS = [
  "#ef4444", // 빨강
  "#f97316", // 주황
  "#eab308", // 노랑
  "#22c55e", // 초록
  "#3b82f6", // 파랑
  "#8b5cf6", // 보라
  "#ec4899", // 분홍
  "#64748b", // 회색
];

interface Props {
  selectedDate: Date;
  onClose: () => void;
}

export default function AddEventModal({ selectedDate, onClose }: Props) {
  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState("🎂");
  const [color, setColor] = useState("#ef4444");

  const addEvent = useCoupleStore((state) => state.addEvent);

  const handleSubmit = () => {
    if (!label.trim()) return;

    addEvent({
      date: selectedDate.toISOString(),
      label: label.trim(),
      emoji,
      color,
    });

    onClose();
  };

  const isValid = label.trim().length > 0;

  const dateStr = selectedDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>기념일 등록</Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <DateDisplay>
          <DateText>{dateStr}</DateText>
        </DateDisplay>

        <FormGroup>
          <Label>기념일 이름</Label>
          <Input
            placeholder="예: 100일 기념일"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>이모지</Label>
          <EmojiGrid>
            {EMOJIS.map((e) => (
              <EmojiBtn
                key={e}
                selected={emoji === e}
                onClick={() => setEmoji(e)}
              >
                {e}
              </EmojiBtn>
            ))}
          </EmojiGrid>
        </FormGroup>

        <FormGroup>
          <Label>색상</Label>
          <ColorGrid>
            {COLORS.map((c) => (
              <ColorBtn
                key={c}
                color={c}
                selected={color === c}
                onClick={() => setColor(c)}
              />
            ))}
          </ColorGrid>
        </FormGroup>

        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          variant={isValid ? "primary" : "secondary"}
          fullWidth
        >
          등록하기
        </Button>
      </Modal>
    </Overlay>
  );
}
