import { useRegisterSW } from 'virtual:pwa-register/react';

export default function PWAUpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ', r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#272727] border-t border-[#404040] p-4">
      <div className="max-w-[540px] mx-auto flex items-center justify-between gap-4">
        <div className="flex-1">
          {offlineReady && (
            <p className="text-sm text-[#f6f6f6]">
              앱이 오프라인에서도 작동할 준비가 되었습니다.
            </p>
          )}
          {needRefresh && (
            <p className="text-sm text-[#f6f6f6]">
              새로운 버전이 사용 가능합니다. 업데이트하시겠습니까?
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {needRefresh && (
            <button
              onClick={() => updateServiceWorker(true)}
              className="px-4 py-2 bg-[#72D9FF] text-[#171717] rounded-lg text-sm font-medium"
            >
              업데이트
            </button>
          )}
          <button
            onClick={close}
            className="px-4 py-2 bg-[#404040] text-[#f6f6f6] rounded-lg text-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

