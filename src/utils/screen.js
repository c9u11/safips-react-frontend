export const wakeLockScreen = async () => {
  if (!('wakeLock' in navigator)) return false;
  try {
    await navigator.wakeLock.request('screen')
    return true;
  } catch (error) {
    console.error('Wake lock request failed:', error);
    return false;
  }
};

export const releaseWakeLockScreen = async () => {
  if (!('wakeLock' in navigator)) return false;
  try {
    const wakeLockSentinel = await navigator.wakeLock.request('screen');
    wakeLockSentinel.release();
    return true;
  } catch (error) {
    console.error('Wake lock release failed:', error);
    return false;
  }
};