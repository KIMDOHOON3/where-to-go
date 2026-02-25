import { useRef, useState, useEffect } from 'react';
import IconAlert from '@/app/components/Common/IconAlert';
import IconClose from '@/app/components/Common/IconClose';
import useClose from '@/app/hooks/useClose';

interface ModalProps {
  onClose: () => void;
}

function Modal({ onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useClose(modalRef, handleClose);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10); // 약간의 지연 후 애니메이션 시작
  }, []);

  function handleClose() {
    setIsVisible(false);
    setTimeout(onClose, 300); // 애니메이션 후 onClose 실행
  }

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[#21212187] transition-opacity duration-300">
      {/* 모달 컨테이너 */}
      <div
        ref={modalRef}
        className={`relative w-[90%] transform rounded-lg bg-white py-4 transition-all duration-300 md:max-w-96 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* 닫기 버튼 */}
        <button
          className="text-gray-500 absolute right-2 top-2 transform transition-transform duration-200 hover:scale-110"
          onClick={handleClose}
        >
          <IconClose />
        </button>

        {/* 모달 내용 */}
        <div className="flex flex-col items-center">
          <IconAlert />
          <p className="mt-4 text-lg font-semibold">더 나은 서비스를 위해 열심히 준비 중입니다!</p>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            className="hover-button bg-background-inverse text-text-default border-text-secondary h-12 w-[8.5rem] items-center justify-center rounded-xl border-[1px] text-lg font-semibold"
            onClick={handleClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
