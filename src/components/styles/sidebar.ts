import styled from "styled-components";

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: linear-gradient(to bottom, #f9edfb, white);
  border-right: 1px solid #f9edfb;
  color: #7b1fa2;
  max-width: ${(props: any) => (props.isOpen ? "20%" : "3%")};
`;

export const AppSidebar = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10px 0px;
`;

export const SidebarTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 7vh;
  border-bottom: ${(props: any) =>
    props.isOpen ? "1px solid #F7DEFC" : "none"};

  > span {
    padding-left: 15px;
    font-weight: bold;
  }
`;

export const BoardsList = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-inline-start: 0;
  margin-block: 0;

  > li {
    border-bottom: 1px solid #F7DEFC;
    width: 100%;
    list-style: none;

    > div {
      padding: 12px;
      margin: 0px 10px;
      cursor: pointer;
    }
  }
`;

export const Button = styled.button`
  color: #3e2723;
  border: 0;
  border-radius: 5px;
  background-image: linear-gradient(#7b1fa2, #e1bee7);
  background-color: #7b1fa2;
  cursor: pointer;
  justify-content: center;
  padding: 5px 7px;
  align-items: center;
  margin-right: 15px;
  margin-left: 0;
  z-index: 5;

  &:hover {
    color: white;
  }
`;
