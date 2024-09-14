import styled from "styled-components";

export const AppSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 0px;
`;

export const SidebarTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 7vh;
  width: 100%;
  border-bottom: 1px solid #a1887f;
`;

export const BoardsList = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-inline-start: 0;

  > li {
    border-bottom: 1px solid #a1887f;
    width: 100%;
    list-style: none;

    > div {
      padding: 10px;
      margin: 0px 10px;
    }
  }
`;
