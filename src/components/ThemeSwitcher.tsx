/** @jsx jsx */
import React, { useMemo, useState } from "react";
import { animated, useSpring } from "react-spring";
import { Box, Button, jsx, Styled, Text, useThemeUI } from "theme-ui";

const bounding = 24;
const defaultSize = bounding;
const center = bounding / 2;

const radius = 4;
const lineLength = 2;

const degToRad = (deg: number): number => deg * (Math.PI / 180);

const useTextColor = () => {
  const {
    theme: {
      colors: { text },
    },
  } = useThemeUI();

  return text;
};

const Line: React.FC<{
  r: number;
  angle: number;
  index: number;
  isHovered: boolean;
}> = ({ r, angle, index, isHovered }) => {
  const style = useSpring({
    from: {
      transform: "scale(0)",
      opacity: 0,
    },
    to: {
      transform: `scale(${isHovered ? 1.1 : 1})`,
      opacity: 1,
    },
    delay: 50 * index,
  });

  const rads = useMemo(() => degToRad(angle), [angle]);
  const x1 = useMemo(() => r * Math.cos(rads) + center, [r, rads]);
  const x2 = useMemo(() => (r + lineLength) * Math.cos(rads) + center, [
    r,
    rads,
  ]);

  const y1 = useMemo(() => r * Math.sin(rads) + center, [r, rads]);
  const y2 = useMemo(() => (r + lineLength) * Math.sin(rads) + center, [
    r,
    rads,
  ]);

  const textColor = useTextColor();

  return (
    <animated.line
      style={{
        ...style,
        transformOrigin: "center center",
      }}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      stroke={textColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

const Sun: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const numLines = 7;
  const lines = useMemo(
    () => Array.from({ length: numLines }, (_, i) => (360 / numLines) * i),
    [numLines],
  );

  const textColor = useTextColor();

  return (
    <g>
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill={textColor}
        strokeWidth={2}
      />

      {lines.map((angle, i) => (
        <Line
          angle={angle}
          r={radius + 3}
          index={i}
          key={angle}
          isHovered={isHovered}
        />
      ))}
    </g>
  );
};

const Moon: React.FC<{ isHovered: boolean }> = ({ isHovered }) => {
  const textColor = useTextColor();

  const style = useSpring({
    from: {
      transform: "translate(2px, 2px) scale(0) rotate(-100deg)",
      opacity: 0,
    },
    to: {
      transform: `translate(2px, 2px) scale(${
        isHovered ? 1.1 : 1
      }) rotate(0deg)`,
      opacity: 1,
    },
  });

  return (
    <animated.path
      style={{
        ...style,
        transformOrigin: "center",
      }}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 11.5C18.5623 16.2358 14.5155 19.1036 9.76175 18.9576C5.008 18.8115 1.18847 14.992 1.0424 10.2382C0.896336 5.48448 4.47416 1.43765 9.20997 1C7.15033 3.78645 7.43923 7.66045 9.88937 10.1106C12.3395 12.5607 16.2135 12.8496 19 10.79V11.5Z"
      fill={textColor}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

export const ThemeSwitcher: React.FC<{
  size?: number;
}> = props => {
  const size = props.size || defaultSize;

  const [isHovered, setIsHovered] = useState(false);
  const [isNight, setIsNight] = useState(false);

  return (
    <Button
      aria-label="theme switcher"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsNight(!isNight)}
      sx={{
        width: size + 2,
        height: size + 2,
        border: "solid 1px violet",
        bg: "transparent",
        padding: 0,

        "&:hover,&:focus,&:active": {
          bg: "transparent",
          boxShadow: "none",
          outline: "none",
        },
      }}
    >
      <animated.svg
        width={size}
        height={size}
        viewBox={`0 0 ${bounding} ${bounding}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isNight ? (
          <Moon isHovered={isHovered} />
        ) : (
          <Sun isHovered={isHovered} />
        )}
      </animated.svg>
    </Button>
  );
};
