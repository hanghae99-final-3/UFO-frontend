import React from "react";
import styled, { keyframes } from "styled-components";

//----스파클 컴포넌트-------
const DEFAULT_COLOR = "#FFC700";
// star effect generator hook
const generateSparkle = color => {
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    const sparkle = {
        id: String(random(10000, 99999)),
        createdAt: Date.now(),
        color,
        size: random(20, 40),
        style: {
            top: random(0, 100) + "%",
            left: random(-10, 70) + "%",
        },
    };
    return sparkle;
};
// start effect
const Sparkles = ({ color = DEFAULT_COLOR, children, ...delegated }) => {
    const range = (start, end, step = 1) => {
        let output = [];
        if (typeof end === "undefined") {
            end = start;
            start = 0;
        }
        for (let i = start; i < end; i += step) {
            output.push(i);
        }
        return output;
    };

    const [sparkles, setSparkles] = React.useState(() => {
        return range(3).map(() => generateSparkle(color));
    });

    const QUERY = "(prefers-reduced-motion: no-preference)";
    const isRenderingOnServer = typeof window === "undefined";
    const getInitialState = () => {
        // For our initial server render, we won't know if the user
        // prefers reduced motion, but it doesn't matter. This value
        // will be overwritten on the client, before any animations
        // occur.
        return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
    };
    function usePrefersReducedMotion() {
        const [prefersReducedMotion, setPrefersReducedMotion] =
            React.useState(getInitialState);
        React.useEffect(() => {
            const mediaQueryList = window.matchMedia(QUERY);
            const listener = event => {
                setPrefersReducedMotion(!event.matches);
            };
            mediaQueryList.addListener(listener);
            return () => {
                mediaQueryList.removeListener(listener);
            };
        }, []);
        return prefersReducedMotion;
    }

    const prefersReducedMotion = usePrefersReducedMotion();
    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const useRandomInterval = (callback, minDelay, maxDelay) => {
        const timeoutId = React.useRef(null);
        const savedCallback = React.useRef(callback);
        React.useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        React.useEffect(() => {
            let isEnabled =
                typeof minDelay === "number" && typeof maxDelay === "number";
            if (isEnabled) {
                const handleTick = () => {
                    const nextTickAt = random(minDelay, maxDelay);
                    timeoutId.current = window.setTimeout(() => {
                        savedCallback.current();
                        handleTick();
                    }, nextTickAt);
                };
                handleTick();
            }
            return () => window.clearTimeout(timeoutId.current);
        }, [minDelay, maxDelay]);
        const cancel = React.useCallback(function () {
            window.clearTimeout(timeoutId.current);
        }, []);
        return cancel;
    };

    useRandomInterval(
        () => {
            const sparkle = generateSparkle(color);
            const now = Date.now();
            const nextSparkles = sparkles.filter(sp => {
                const delta = now - sp.createdAt;
                return delta < 750;
            });
            nextSparkles.push(sparkle);
            setSparkles(nextSparkles);
        },
        prefersReducedMotion ? null : 50,
        prefersReducedMotion ? null : 450,
    );
    return (
        <Wrapper {...delegated}>
            {sparkles.map((sparkle, idx) => (
                <Sparkle
                    key={sparkle.id}
                    color={sparkle.color}
                    size={sparkle.size}
                    style={sparkle.style}
                />
            ))}
            <ChildWrapper>{children}</ChildWrapper>
        </Wrapper>
    );
};
// sparkle component
const Sparkle = ({ size, color, style }) => {
    const path =
        "M 21.85 17.84 l 6.37 -2.11 a 0.77 0.77 0 0 0 0 -1.46 l -6.37 -2.11 l 3 -6 a 0.77 0.77 0 0 0 -1 -1 l -6 3 L 15.73 1.78 a 0.77 0.77 0 0 0 -1.46 0 L 12.16 8.14 l -6 -3 a 0.77 0.77 0 0 0 -1 1 l 3 6 L 1.78 14.27 a 0.77 0.77 0 0 0 0 1.46 l 6.37 2.11 l -3 6 a 0.77 0.77 0 0 0 1 1 l 6 -3 l 2.11 6.36 a 0.77 0.77 0 0 0 1.46 0 l 2.11 -6.36 l 6 3 a 0.77 0.77 0 0 0 1 -1 Z";
    return (
        <SparkleWrapper style={style}>
            <SparkleSvg
                width={size}
                height={size}
                viewBox="0 0 68 68"
                fill="none"
            >
                <path d={path} fill={color} />
            </SparkleSvg>
        </SparkleWrapper>
    );
};
//-----
//------스타일 컴포넌트-----------
const comeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
`;
const Wrapper = styled.span`
    display: inline-block;
    position: relative;
`;
const SparkleWrapper = styled.span`
    position: absolute;
    display: block;
    @media (prefers-reduced-motion: no-preference) {
        animation: ${comeInOut} 700ms forwards;
    }
`;
const SparkleSvg = styled.svg`
    display: block;
    @media (prefers-reduced-motion: no-preference) {
        animation: ${spin} 1000ms linear;
    }
`;
const ChildWrapper = styled.strong`
    position: relative;
    z-index: 1;
    font-weight: bold;
`;
export default Sparkles;
//-----
