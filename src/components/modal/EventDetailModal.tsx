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

const PreviewCard = styled.div<{ color: string }>`
  background: ${({ color }) => color}20;
  border: 2px solid ${({ color }) => color}40;
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  margin-bottom: 24px;
`;

const PreviewEmoji = styled.span`
  font-size: 48px;
  display: block;
  margin-bottom: 12px;
`;

const PreviewLabel = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const PreviewDate = styled.p`
  font-size: 14px;
  color: #666;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const DeleteBtn = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 14px;
  border: 2px solid #fecaca;
  background: #fff;
  color: #ef4444;
  font-size: 16px;
  font-weight: 700;
  font-family: "Pretendard", sans-serif;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: #fef2f2;
  }
`;

const EMOJIS = ["🎂", "💕", "🎉", "💍", "🌹", "✨", "🎁", "💑", "🏠", "🎓"];
const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
];

interface DateEvent {
  id: string;
  date: string;
  label: string;
  emoji: string;
  color: string;
}

interface Props {
  event: DateEvent;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(event.label);
  const [emoji, setEmoji] = useState(event.emoji);
  const [color, setColor] = useState(event.color);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const removeEvent = useCoupleStore((state) => state.removeEvent);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSave = () => {
    if (!label.trim()) return;

    const addEvent = useCoupleStore.getState().addEvent;
    removeEvent(event.id);
    addEvent({
      date: event.date,
      label: label.trim(),
      emoji,
      color,
    });

    onClose();
  };

  const handleDelete = () => {
    removeEvent(event.id);
    onClose();
  };

  if (showDeleteConfirm) {
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <Header>
            <Title>기념일 삭제</Title>
            <CloseBtn onClick={onClose}>×</CloseBtn>
          </Header>

          <PreviewCard color={event.color}>
            <PreviewEmoji>{event.emoji}</PreviewEmoji>
            <PreviewLabel>{event.label}</PreviewLabel>
            <PreviewDate>{formatDate(event.date)}</PreviewDate>
          </PreviewCard>

          <p style={{ textAlign: "center", color: "#666", marginBottom: 24 }}>
            이 기념일을 정말 삭제하시겠어요?<br />
            삭제된 기념일은 복구할 수 없습니다.
          </p>

          <ButtonGroup>
            <DeleteBtn onClick={() => setShowDeleteConfirm(false)}>
              취소
            </DeleteBtn>
            <Button onClick={handleDelete} variant="primary" fullWidth>
              삭제하기
            </Button>
          </ButtonGroup>
        </Modal>
      </Overlay>
    );
  }

  if (isEditing) {
    return (
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <Header>
            <Title>기념일 수정</Title>
            <CloseBtn onClick={onClose}>×</CloseBtn>
          </Header>

          <FormGroup>
            <Label>기념일 이름</Label>
            <Input
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

          <ButtonGroup>
            <DeleteBtn onClick={() => setIsEditing(false)}>
              취소
            </DeleteBtn>
            <Button
              onClick={handleSave}
              variant="primary"
              fullWidth
              disabled={!label.trim()}
            >
              저장하기
            </Button>
          </ButtonGroup>
        </Modal>
      </Overlay>
    );
  }

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>기념일 상세</Title>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <PreviewCard color={event.color}>
          <PreviewEmoji>{event.emoji}</PreviewEmoji>
          <PreviewLabel>{event.label}</PreviewLabel>
          <PreviewDate>{formatDate(event.date)}</PreviewDate>
        </PreviewCard>

        <ButtonGroup>
          <DeleteBtn onClick={() => setShowDeleteConfirm(true)}>
            삭제
          </DeleteBtn>
          <Button onClick={() => setIsEditing(true)} variant="primary" fullWidth>
            수정하기
          </Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
}
