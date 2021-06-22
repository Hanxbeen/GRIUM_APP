import styled from 'styled-components';

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between
  width: 100%;
`;
export const Col = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: ${props => props.height || 'auto'};
  padding: 0 ${props => props.pLR || '0'};
`;
export const PlusIcon = styled.Image`
  width: 20px;
  height: 20px;
  background-color: black;
  border-radius: 10px;
`;

export const RelationItem = styled.View`
  width: 100%;
  height: 42px;
  align-items: flex-end;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
