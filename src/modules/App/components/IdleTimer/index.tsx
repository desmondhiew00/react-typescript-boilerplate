import React, { useRef } from 'react';
import ReactIdleTimer from 'react-idle-timer';
import { requestRevoke, requestLogout } from '@actions/auth.actions';

const idleTimeout = 30 * 1000;
const sessionTimeout = 2700000;
export const IdleTimer = () => {
  const idleTimer = useRef<IdleTimerRefProps | any>(null);

  const onActive = () => {
    if (idleTimer.current && idleTimer.current.getElapsedTime() < sessionTimeout) {
      requestRevoke()();
      idleTimer.current.reset();
    } else {
      requestLogout()();
    }
  };

  const onIdle = () => {
    // User is idle
    // if (!idleTimer.current) return;
    // const lastActive = idleTimer.current.getLastActiveTime();
  };

  const onAction = () => {
    // User did something
  };

  return (
    <ReactIdleTimer
      ref={idleTimer}
      element={document}
      onActive={onActive}
      onIdle={onIdle}
      onAction={onAction}
      debounce={250}
      timeout={idleTimeout}
    />
  );
};

interface IdleTimerRefProps {
  reset(): void;
  pause(): void;
  resume(): void;
  getRemainingTime(): number;
  getElapsedTime(): number;
  getLastActiveTime(): number;
  isIdle(): boolean;
}

export default IdleTimer;
