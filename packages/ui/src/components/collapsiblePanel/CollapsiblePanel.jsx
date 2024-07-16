import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowDown from '../../icons/ArrowDown';

const PanelContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  font-size: 12px;
  box-shadow: ${(props) =>
    props.type === 'notBorder' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  border: ${(props) =>
    props.type === 'notBorder' ? 'none' : '1px solid #ccc'};
`;

const PanelHeader = styled.div`
  background-color: #f1f1f1;
  padding: 0 5px;
  padding-left: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PanelContent = styled.div`
  overflow: hidden;
  transition: max-height 0.1s ease-in-out;
  max-height: ${(props) => (props.open ? '500px' : '0')};
  padding: ${(props) => (props.open ? '10px' : '0 10px')};
`;

const Arrow = styled.span`
  transform: ${(props) => (props.open ? 'rotate(0)' : 'rotate(90deg)')};
  transition: transform 0.3s ease;
`;

const CollapsiblePanel = ({
  type = 'border',
  title,
  children,
  open = true,
  style = {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <PanelContainer type={type} style={style}>
      <PanelHeader onClick={togglePanel}>
        {title}
        <Arrow open={isOpen}>
          <ArrowDown style={{ height: '100%', margin: 0 }} hoverable={false}></ArrowDown>
        </Arrow>
      </PanelHeader>
      <PanelContent open={isOpen}>{children}</PanelContent>
    </PanelContainer>
  );
};

export default CollapsiblePanel;
