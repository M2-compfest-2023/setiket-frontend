import * as React from 'react';
/**
 *
 * @param targetDate
 * @returns
 * [days, hours, minutes, seconds]
 * days: number
 * hours: number
 * minutes: number
 * seconds: number
 *
 * @example
 * const [days, hours, minutes, seconds] = useCountdown(new Date('2021-10-10'))
 */
export default function useCountdown(targetDate: Date) {
  const targetDateSinceEpoch = targetDate.getTime();

  const [countdown, setCountdown] = React.useState(
    targetDateSinceEpoch - new Date().getTime()
  );

  const time = React.useMemo(() => {
    const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

    return [
      days > 0 ? days : 0,
      hours > 0 ? hours : 0,
      minutes > 0 ? minutes : 0,
      seconds > 0 ? seconds : 0,
    ];
  }, [countdown]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(targetDateSinceEpoch - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateSinceEpoch]);

  if (countdown <= 0) {
    return [0, 0, 0, 0];
  }
  return time;
}
