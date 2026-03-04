"use client";

import styled from "@emotion/styled";
import { useState } from "react";
import WelcomeStep from "@/components/section/intro/WelcomeStep";
import ConnectStep from "@/components/variant/ConnectStep";
import DateStep from "@/components/section/intro/DateStep";
import ReadyStep from "@/components/section/intro/ReadyStep";

type Step = "welcome" | "connect" | "date" | "ready";

const Shell = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #ffeae8;
`;

const Phone = styled.div`
  width: 100%;
  max-width: 390px;
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    min-height: 844px;
    max-height: 844px;
    border-radius: 48px;
    margin: 24px 0;
    box-shadow:
      0 32px 80px rgba(0, 0, 0, 0.22),
      0 0 0 1px rgba(0, 0, 0, 0.06);
    overflow: auto;
  }
`;

const StepDots = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 10;
`;

const Dot = styled.div<{ active: boolean }>`
  width: ${({ active }) => (active ? "20px" : "6px")};
  height: 6px;
  border-radius: 3px;
  background: ${({ active }) => (active ? "#ef4444" : "rgba(0,0,0,0.15)")};
  transition: all 0.3s ease;
`;

const STEPS: Step[] = ["welcome", "connect", "date", "ready"];

export default function FirstSection() {
  const [step, setStep] = useState<Step>("welcome");
  const [firstDate, setFirstDate] = useState<Date | null>(null);

  const stepIndex = STEPS.indexOf(step);

  return (
    <Shell>
      <Phone>
        <StepDots>
          {STEPS.map((s, i) => (
            <Dot key={s} active={i === stepIndex} />
          ))}
        </StepDots>

        {step === "welcome" && (
          <WelcomeStep onNext={() => setStep("connect")} />
        )}
        {step === "connect" && <ConnectStep onNext={() => setStep("date")} />}
        {step === "date" && (
          <DateStep
            onNext={(date) => {
              setFirstDate(date);
              setStep("ready");
            }}
          />
        )}
        {step === "ready" && (
          <ReadyStep
            firstDate={firstDate}
            onStart={() => alert("🎉 앱 메인 화면으로 이동!")}
          />
        )}
      </Phone>
    </Shell>
  );
}
