import { useEffect, useRef } from "react";

type DelayFunction = (callback: Function, ms?: number) => void;

const useDelay = (): DelayFunction => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const delay: DelayFunction = (callback, ms = 0) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(function () {
      callback(null, arguments);
    }, ms);
  };

  return delay;
};

export default useDelay;
