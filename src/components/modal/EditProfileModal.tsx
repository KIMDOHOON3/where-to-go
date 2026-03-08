"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { useCoupleStore, useStartDate } from "@/store/useCoupleStore";

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

const DateDisplay = styled.div`
  background: #f5f5f5;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 16px;
  color: #666;
`;

interface Props {
  onClose: () => void;
}

export default function EditProfileModal({ onClose }: Props) {
  const coupleTitle = useCoupleStore((state) => state.coupleTitle);
  const setCoupleTitle = useCoupleStore((state) => state.setCoupleTitle);
  const startDate = useStartDate();

  const [title, setTitle] = useState(coupleTitle);

  const handleSubmit = () => {
    if (title.trim()) {
      setCoupleTitle(title.trim());
      onClose();
    }
  };

  const dateStr = startDate
    ? startDate.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "설정되지 않음";

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>프로필 설정</Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <FormGroup>
          <Label>커플 이름</Label>
          <Input
            placeholder="예: 우리의 이야기"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>시작일</Label>
          <DateDisplay>{dateStr}</DateDisplay>
        </FormGroup>

        <Button
          onClick={handleSubmit}
          disabled={!title.trim()}
          variant={title.trim() ? "primary" : "secondary"}
          fullWidth
        >
          저장하기
        </Button>
      </Modal>
    </Overlay>
  );
}
