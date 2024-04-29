import styled from "styled-components";

export const Section = styled.div`
  margin: 0 30px;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
  letter-spacing: -1px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TopSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-beween;
  min-height: 500px;
`;

export const InfoTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-basis: 10px;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 20px;
  align-items: center;

  & > p {
    color: gray;
    font-weight: normal;
    font-size: 17px;
    border-bottom: 0.1px solid gray;
  }
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 10px;
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 20px;
  outline: none;
  width: 100%;
  align-items: center;
  & > div:nth-child(1) {
    display: flex;
    flex: 1;
    color: #73819c;
    font-weight: bold;
    align-items: center;
  }
  & > div:nth-child(2) {
    align-items: center;
    flex: 1;
    display: flex;
    text-align: center;
    & > input {
      min-height: 14vw;
      border: none;
    }
    & > input:focus {
      outline: none;
    }
  }
`;
export const BottomSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: space-beween;
`;

export const InfoNav = styled.nav`
  width: 100%;
  margin: 0px;
  margin-bottom: 20px;
  & > ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  & > ul > li {
    padding: 5px 0;
    list-style: none;
    flex: 1;
    text-align: center;
    font-size: 0.75rem;
    border-bottom: 1px solid #d9d9d9;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  & > ul > li.activeTab {
    font-weight: bold;
    color: #ff9078;
    border-bottom: 2px solid #ff9078;
  }
`;

export const InfoProjectList = styled.section`
  display: column;
  & > div:nth-child(1) {
    font-weight: bold;
    padding: 20px 0 20px 0;
  }
  & > div:nth-child(2) {
    background-color: #f8f8f8;
    padding: 3px 20px 3px 20px;
    border-radius: 20px;
    & > p:nth-child(1) {
      font-weight: bold;
    }
  }
`;

export const ArticleInfoCardWrap = styled.section`
  width: 100%;
  height: 50vh;
  overflow-y: none;
  z-index: 999;
  > section {
    margin-bottom: 20px;
  }
`;

export const LogoutText = styled.p`
  text-align: right;
  width: 100%;
  color: gray;
`;
