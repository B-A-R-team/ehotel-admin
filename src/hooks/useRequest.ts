import { useState, useEffect } from 'react';

/**
 * 暂未封装请求的request hook，只有loading功能
 */
function useRequest(
  initLoading: boolean = true
): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>] {
  const [loading, setLoading] = useState(initLoading);

  useEffect(() => {
    const tik = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(tik);
    };
  }, [loading]);

  const startLoading = () => setLoading(true);

  return [loading, startLoading, setLoading];
}

export default useRequest;
