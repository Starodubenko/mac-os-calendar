import { useState, useCallback } from "react";

export const useResizeDimentions = () => {
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const onResizeHandler = useCallback((height: number, width: number) => {
        setHeight(height);
        setWidth(width);
    }, []);

    return {width, height, onResizeHandler}
}