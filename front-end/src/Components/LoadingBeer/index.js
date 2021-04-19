import React from 'react';

import S from './styles';

const LoadingBeer = () => (
  <S.ContainerLoading>
    <S.ContainerBeer>
      <S.Beer />
      <S.Bubble1 />
      <S.Bubble2 />
      <S.Bubble3 />
      <S.Bubble4 />
      <S.TopAirBubble1 />
      <S.TopAirBubble2 />
      <S.VerticalGlassBubble1 />
      <S.VerticalGlassBubble2 />
      <div className="inner-bubbles inner-bubble-1" />
      <div className="inner-bubbles inner-bubble-2" />
      <div className="inner-bubbles inner-bubble-3" />
      <div className="inner-bubbles inner-bubble-4" />
      <div className="inner-bubbles inner-bubble-5" />
    </S.ContainerBeer>
  </S.ContainerLoading>
);

export default LoadingBeer;
