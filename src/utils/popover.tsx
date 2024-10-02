import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

const Popover = ({
  title,
  children,
  anchorEl,
  onClose,
  data,
}: {
  title: string;
  children: { title: string; handleClick: (_: any) => void }[];
  anchorEl: HTMLElement | null;
  onClose: () => void;
  data: any;
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

  return (
    <div className='popover' style={popoverStyle} ref={popoverRef}>
      <div className='popover-header'>
        <span className='popover-title'>{title}</span>
        <div className='icon'>
          <FaTimes onClick={onClose} />
        </div>
      </div>

      <div className='popover-content'>
        {children.map((child) => (
          <span className='action-list' onClick={() => child.handleClick(data)}>
            {child.title}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Popover;
