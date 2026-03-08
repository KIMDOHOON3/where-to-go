"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import { useCoupleStore } from "@/store/useCoupleStore";
import AddWishModal from "@/components/modal/AddWishModal";

const Wrap = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-bottom: 90px;
  background: #faf5f4;
`;

const Header = styled.div`
  padding: 20px 16px 16px;
  background: linear-gradient(160deg, #fff5f4 0%, #ffeae8 100%);
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 900;
  color: #1a1a1a;
  letter-spacing: -0.8px;
  margin-bottom: 4px;
`;

const Sub = styled.p`
  font-size: 14px;
  color: #9e6b65;
  font-weight: 500;
`;

const FilterRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 16px 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterChip = styled.button<{ active: boolean }>`
  flex-shrink: 0;
  padding: 8px 16px;
  border-radius: 20px;
  border: ${({ active }) => (active ? "none" : "1.5px solid #e8d8d6")};
  background: ${({ active }) =>
    active ? "linear-gradient(135deg, #f87171, #ef4444)" : "#fff"};
  color: ${({ active }) => (active ? "#fff" : "#888")};
  font-size: 14px;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  transition: all 0.15s ease;
`;

const WishList = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const WishCard = styled.div<{ completed: boolean }>`
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  opacity: ${({ completed }) => (completed ? 0.6 : 1)};
  transition: all 0.15s;
`;

const CheckBtn = styled.button<{ checked: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid ${({ checked }) => (checked ? "#22c55e" : "#ddd")};
  background: ${({ checked }) => (checked ? "#22c55e" : "#fff")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;

  &::after {
    content: "✓";
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
  }
`;

const WishEmoji = styled.span`
  font-size: 28px;
`;

const WishInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const WishTitle = styled.p<{ completed: boolean }>`
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.3px;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WishCategory = styled.span`
  font-size: 13px;
  color: #888;
  margin-top: 2px;
  display: block;
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
  padding: 4px;
  transition: color 0.15s;

  &:hover {
    color: #ef4444;
  }
`;

const AddBtn = styled.button`
  margin: 8px 16px 0;
  width: calc(100% - 32px);
  padding: 18px;
  border-radius: 50px;
  border: none;
  background: linear-gradient(135deg, #f87171, #ef4444);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  font-family: "Pretendard", sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(239, 68, 68, 0.35);
  letter-spacing: -0.3px;
  transition: all 0.15s ease;

  &:active {
    transform: scale(0.98);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
`;

const EmptyEmoji = styled.span`
  font-size: 56px;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #999;
  font-weight: 500;
  line-height: 1.5;
`;

const CATEGORIES = ["전체", "여행", "맛집", "액티비티", "기타"];

export default function WishTab() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [showModal, setShowModal] = useState(false);

  const wishes = useCoupleStore((state) => state.wishes);
  const toggleWish = useCoupleStore((state) => state.toggleWish);
  const removeWish = useCoupleStore((state) => state.removeWish);

  const filtered =
    activeFilter === "전체"
      ? wishes
      : wishes.filter((w) => w.category === activeFilter);

  // 완료되지 않은 것 먼저, 그 다음 완료된 것
  const sorted = [...filtered].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  const completedCount = wishes.filter((w) => w.completed).length;

  return (
    <Wrap>
      <Header>
        <Title>위시리스트</Title>
        <Sub>
          함께 하고 싶은 것들 {wishes.length > 0 && `(${completedCount}/${wishes.length} 완료)`}
        </Sub>
      </Header>

      <FilterRow>
        {CATEGORIES.map((cat) => (
          <FilterChip
            key={cat}
            active={activeFilter === cat}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </FilterChip>
        ))}
      </FilterRow>

      {sorted.length > 0 ? (
        <WishList>
          {sorted.map((wish) => (
            <WishCard key={wish.id} completed={wish.completed}>
              <CheckBtn
                checked={wish.completed}
                onClick={() => toggleWish(wish.id)}
              />
              <WishEmoji>{wish.emoji}</WishEmoji>
              <WishInfo>
                <WishTitle completed={wish.completed}>{wish.title}</WishTitle>
                <WishCategory>{wish.category}</WishCategory>
              </WishInfo>
              <DeleteBtn onClick={() => removeWish(wish.id)}>×</DeleteBtn>
            </WishCard>
          ))}
        </WishList>
      ) : (
        <EmptyState>
          <EmptyEmoji>💝</EmptyEmoji>
          <EmptyText>
            아직 위시리스트가 비어있어요
            <br />
            함께 하고 싶은 것을 추가해보세요!
          </EmptyText>
        </EmptyState>
      )}

      <AddBtn onClick={() => setShowModal(true)}>+ 새 위시 추가</AddBtn>

      {showModal && <AddWishModal onClose={() => setShowModal(false)} />}
    </Wrap>
  );
}
