import styled, { css, keyframes } from 'styled-components';

const fillBeer = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
`;

const showBubbles = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const showVerticalBubbles1 = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 145px;
  }
`;

const showVerticalBubbles2 = keyframes`
  0% {
    height: 0;
  }
  100% {
    height: 105px;
  }
`;

const showAirBubble1 = keyframes`
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: -20%;
  }
`;

const showAirBubble2 = keyframes`
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: -30%;
  }
`;

const innerBubbleUp = keyframes`
  0% {
    bottom: 0;
  }
  100% {
    bottom: 90%;
  }
`;

const ContainerLoading = styled.div`
  ${() => css`
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #397330;

    .inner-bubbles {
      position: absolute;
      bottom: 0;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background: #cf8d2e;
    }

    .inner-bubble-1 {
      left: 50%;
      animation: ${innerBubbleUp} 1.5s linear forwards infinite;
    }
    .inner-bubble-2 {
      left: 45%;
      animation: ${innerBubbleUp} 1.5s linear 0.25s forwards infinite;
    }
    .inner-bubble-3 {
      left: 55%;
      animation: ${innerBubbleUp} 1.5s linear 0.5s forwards infinite;
    }
    .inner-bubble-4 {
      left: 47%;
      animation: ${innerBubbleUp} 1.5s linear 0.6s forwards infinite;
    }
    .inner-bubble-5 {
      left: 53%;
      animation: ${innerBubbleUp} 1.5s linear 0.8s forwards infinite;
    }
  `}
`;

const ContainerBeer = styled.div`
  position: relative;
  height: 200px;
  width: 100px;
  border: 8px solid #fff;
  border-top: transparent;
  border-radius: 0 0 20% 20% / 0 0 15% 15%;

  &::before {
    content: '';
    height: 60%;
    width: 25%;
    border: 8px solid #fff;
    position: absolute;
    left: 100%;
    top: 15%;
    border-radius: 0 50% 50% 0 / 0 12% 12% 0;
  }
`;

const Beer = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #ffd54f;
  border-radius: 0 0 15% 15% / 0 0 10% 10%;
  animation: ${fillBeer} 1s linear forwards; 
`;

const Bubble1 = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  left: -19%;
  top: -10%;
  opacity: 0;
  animation: ${showBubbles} 0.4s linear 0.9s forwards; 
`;

const Bubble2 = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  height: 45px;
  width: 60px;
  left: 0%;
  top: -19%;
  opacity: 0;
  animation: ${showBubbles} 0.4s linear 0.9s forwards; 
`;

const Bubble3 = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  height: 53px;
  width: 40px;
  left: 45%;
  top: -18%;
  opacity: 0;
  animation: ${showBubbles} 0.4s linear 0.9s forwards; 
`;

const Bubble4 = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  height: 31px;
  width: 31px;
  left: 80%;
  top: -10%;
  opacity: 0;
  animation: ${showBubbles} 0.4s linear 0.9s forwards; 
`;

const TopAirBubble1 = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  height: 15px;
  width: 15px;
  left: 90%;
  top: -20%;
  animation: ${showAirBubble1} 1s linear 1s forwards; 
`;

const TopAirBubble2 = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  width: 20px;
  height: 20px;
  left: 60%;
  top: -31%;
  animation: ${showAirBubble2} 1s linear 1s forwards; 
`;

const VerticalGlassBubble1 = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  width: 23px;
  left: -14%;
  top: 0;
  border-radius: 0 0 60% 15% / 0 0 25% 10%;
  animation: ${showVerticalBubbles1} 1.5s linear 1s forwards; 
`;

const VerticalGlassBubble2 = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50%;
  width: 23px;
  left: 11%;
  top: 0;
  border-radius: 0 0 60% 15% / 0 0 25% 10%;
  animation: ${showVerticalBubbles2} 1.5s linear 1s forwards;
`;

export default {
  ContainerLoading,
  ContainerBeer,
  Beer,
  Bubble1,
  Bubble2,
  Bubble3,
  Bubble4,
  TopAirBubble1,
  TopAirBubble2,
  VerticalGlassBubble1,
  VerticalGlassBubble2,
};
