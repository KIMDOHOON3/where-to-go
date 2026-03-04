"use client";

import styled from "@emotion/styled";

export type TabType = "home" | "calendar" | "gallery" | "more";

interface NavItem {
  id: TabType;
  label: string;
  icon: string;
  activeIcon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "홈", icon: "🏠", activeIcon: "🏠" },
  { id: "calendar", label: "캘린더", icon: "📅", activeIcon: "📅" },
  { id: "gallery", label: "사진첩", icon: "🖼️", activeIcon: "🖼️" },
  { id: "more", label: "더보기", icon: "···", activeIcon: "···" },
];

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  background: #ffffff;
  border-top: 1px solid #f0e8e7;
  display: flex;
  padding: 10px 0 24px;
  z-index: 100;
`;

const NavBtn = styled.button<{ active: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 0;
  transition: all 0.15s ease;

  span.icon {
    font-size: ${({ active }) => (active ? "22px" : "20px")};
    line-height: 1;
    filter: ${({ active }) => (active ? "none" : "grayscale(1) opacity(0.4)")};
  }

  span.label {
    font-size: 11px;
    font-weight: ${({ active }) => (active ? "700" : "500")};
    color: ${({ active }) => (active ? "#ef4444" : "#b0a09e")};
    font-family: "Pretendard", sans-serif;
    letter-spacing: -0.2px;
  }
`;

interface Props {
  activeTab: TabType;
  onChange: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, onChange }: Props) {
  return (
    <Nav>
      {NAV_ITEMS.map((item) => (
        <NavBtn
          key={item.id}
          active={activeTab === item.id}
          onClick={() => onChange(item.id)}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </NavBtn>
      ))}
    </Nav>
  );
}
