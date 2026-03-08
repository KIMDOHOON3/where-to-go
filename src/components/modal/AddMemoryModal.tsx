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

const EMOJIS = ["🍊", "☕", "🌳", "🌊", "🥐", "🌸", "🎂", "✈️", "🎬", "🎵"];
const COLORS = [
  "#fca5a5", // 빨강
  "#f4c997", // 주황
  "#fde68a", // 노랑
  "#a3d9a5", // 초록
  "#93c5fd", // 파랑
  "#d8b4fe", // 보라
  "#f9a8d4", // 분홍
  "#a5b4c4", // 회색
];

interface Props {
  onClose: () => void;
}

export default function AddMemoryModal({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [emoji, setEmoji] = useState("🍊");
  const [color, setColor] = useState("#fca5a5");

  const addMemory = useCoupleStore((state) => state.addMemory);

  const handleSubmit = () => {
    if (!title.trim() || !location.trim()) return;

    addMemory({
      title: title.trim(),
      location: location.trim(),
      date: new Date().toISOString(),
      emoji,
      color,
    });

    onClose();
  };

  const isValid = title.trim() && location.trim();

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>새 추억 등록</Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <FormGroup>
          <Label>제목</Label>
          <Input
            placeholder="예: 제주 여행"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>장소</Label>
          <Input
            placeholder="예: 제주"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
