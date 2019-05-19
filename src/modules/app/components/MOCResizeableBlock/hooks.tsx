import { useState, useCallback } from "react";

export const useResizeDimentions = () => {
    const [height, setHeight] = useState();
    const [weight, setWidth] = useState();
    const onResizeHandler = useCallback((height: number, width: number) => {
        setHeight(height);
        setWidth(width);
    }, []);

    return {weight, height, onResizeHandler}
}