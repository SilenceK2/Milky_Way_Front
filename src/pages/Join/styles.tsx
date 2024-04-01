import styled from "styled-components";

export const Box = styled.section`
  /* width: 100%; */
  height: 100vh;
  display: flex;
  padding: 0 20px;
  justify-content: center;
  flex-direction: column;
`;

export const TopSection = styled.section`
  /* width: 100%; */
  flex: 1;
  display: flex;
  padding-top: 20%;
  flex-basis: 20px;
  align-items: center;
  flex-direction: column;

  & > div:nth-child(3) {
    width: 100%;
    display: block;
  }
  /* & > div > input {
    padding: 15px;
    width: 300px;
    border: none;
    height: 20px;
    border-radius: 10px;
    background-color: #f8f8f8;
    font-weight: lighter;
    margin-top: 20px;
    outline: none;
  }  */
  /* & > div > input:focus {
    border: 1px solid #717171;
    background-color: #fff;
    
  } */
  & > div > p {
    font-weight: bold;
    line-height: 20px;
    font-size: 18px;
  }
  & > div:nth-child(2) {
    font-weight: bold;
    width: 100%;
    justify-content: flex-start;
    display: flex;
    /* margin-left: 40px; */
  }
  & > div:nth-child(3) {
    margin-top: 0;
    justify-content: center;
    flex-direction: column;
    display: flex;
  }
`;

export const ProgressContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  & > progress {
    color: #ff9f89;
    background-color: #f3f3f3;
    width: 100%;
    height: 3px;
  }
`;

export const ProgressBar = styled.div<{ value: number; max: number }>`
  background-color: #ff9f89;
  width: ${({ value, max }) => (value / max) * 100}%;
  height: 3px;
`;
export const ProgressText = styled.p`
  position: absolute;
  left: 0;
  top: -50px;
  justify-content: start;
  font-weight: bold;
  color: #ff9f89;
`;

export const BottomSection = styled.section`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  & > Button:nth-child(1) {
    outline: none;
  }
`;
