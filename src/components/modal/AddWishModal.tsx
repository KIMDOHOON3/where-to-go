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

const CategoryGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CategoryBtn = styled.button<{ selected: boolean }>`
  padding: 10px 18px;
  border-radius: 12px;
  border: 2px solid ${({ selected }) => (selected ? "#ef4444" : "#f0e8e7")};
  background: ${({ selected }) => (selected ? "#fff5f4" : "#fff")};
  font-size: 14px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? "#ef4444" : "#666")};
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  transition: all 0.15s;

  &:hover {
    border-color: #ef4444;
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

const CATEGORIES = ["여행", "맛집", "액티비티", "기타"];
const EMOJIS = ["✈️", "🍽️", "🎢", "🎬", "🎵", "⛷️", "🏖️", "🛍️", "🎮", "📚"];

interface Props {
  onClose: () => void;
}

export default function AddWishModal({ onClose }: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("여행");
  const [emoji, setEmoji] = useState("✈️");

  const addWish = useCoupleStore((state) => state.addWish);

  const handleSubmit = () => {
    if (!title.trim()) return;

    addWish({
      title: title.trim(),
      category,
      emoji,
    });

    onClose();
  };

  const isValid = title.trim().length > 0;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>새 위시 추가</Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <FormGroup>
          <Label>하고 싶은 것</Label>
          <Input
            placeholder="예: 제주도 여행 가기"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>카테고리</Label>
          <CategoryGrid>
            {CATEGORIES.map((cat) => (
              <CategoryBtn
                key={cat}
                selected={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </CategoryBtn>
            ))}
          </CategoryGrid>
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

        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          variant={isValid ? "primary" : "secondary"}
          fullWidth
        >
          추가하기
        </Button>
      </Modal>
    </Overlay>
  );
}
