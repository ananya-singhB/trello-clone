import React, { ReactNode, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const Popover = ({
  title,
  children,
  anchorEl,
  onClose,
}: {
  title: string;
  children: ReactNode;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (
      popoverRef.current &&
      !popoverRef.current?.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    if (anchorEl) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchorEl]);

  if (!anchorEl) {
    return null;
  }

    // Calculate position based on the anchor element
    const { left, top, height } = anchorEl.getBoundingClientRect();
    const popoverStyle: React.CSSProperties = {
        position: 'absolute',
        top: top - height + window.scrollY, // Place below the icon
        left: left + window.scrollX, // Align with the icon
        zIndex: 1000,
    };
    console.log(left, top, height, popoverStyle)

  return (
    <div className='popover' style={popoverStyle} ref={popoverRef}>
      <div  className='popover-header'>
        <span className='popover-title'>{title}</span>
        <div className='icon'>
          <FaTimes onClick={onClose} />
        </div>
      </div>

      <span className='action-list'>children A</span>
      <span className='action-list'>children__ B</span>
    </div>
  );
};

export default Popover;
