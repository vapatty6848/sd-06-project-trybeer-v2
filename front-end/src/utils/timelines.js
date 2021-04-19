import { TimelineMax as Timeline, Power1 } from 'gsap';

const getDefaultTimeline = (node) => {
  const timeline = new Timeline({ paused: true });
  const time = 0.5;

  timeline
    .from(node, time, { opacity: 0, autoAlpha: 0, ease: Power1.easeIn });

  return timeline;
};

export const play = (pathname, node) => {
  const timeline = getDefaultTimeline(node);

  timeline.play();
};

export const exit = (node) => {
  const timeline = new Timeline({ paused: true });
  const time = 0;

  timeline.to(node, time, { opacity: 0, autoAlpha: 0, ease: Power1.easeIn });

  timeline.play();
};
