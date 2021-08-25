import React from "react";

const Boop = ({
    x = 0,
    y = 0,
    rotation = 0,
    scale = 1,
    timing = 150,
    children,
}) => {
    const [isBooped, setIsBooped] = React.useState(false);
    const style = {
        display: "inline-block",
        backfaceVisibility: "hidden",
        transform: isBooped
            ? `translate(${x}px, ${y}px)
         rotate(${rotation}deg)
         scale(${scale})`
            : `translate(0px, 0px)
         rotate(0deg)
         scale(1)`,

        transition: `transform ${timing}ms`,
        config: {
            tension: 300,
            friction: 10,
        },
    };
    React.useEffect(() => {
        if (!isBooped) {
            return;
        }
        const timeoutId = window.setTimeout(() => {
            setIsBooped(false);
        }, timing);
        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [isBooped, timing]);
    const trigger = () => {
        setIsBooped(true);
    };
    return (
        <span onMouseEnter={trigger} style={style}>
            {children}
        </span>
    );
};

export default Boop;
