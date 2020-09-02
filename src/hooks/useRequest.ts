import { useState, useEffect } from 'react';
import axios from 'axios';

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';

export interface IRequestConfig {
  url: string;
  method: HttpMethod;
  baseUrl?: string;
  headers?: any;
  data?: any;
  params?: any;
  query?: any;
}

export interface IResponseConfig<T> {
  data: T;
  loading: boolean;
  error: any;
  request: (arg?: IRequestConfig) => void;
}

// 重载
/**
 * 模拟请求
 * @param arg loading
 */
function useRequest(
  arg?: boolean
): [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>];
/**
 * 简易请求
 * @param arg 请求设置
 */
function useRequest<T>(arg: IRequestConfig): [IResponseConfig<T>];
/**
 * 简易请求
 * @param arg 请求设置
 * @param start 是否立即执行
 */
function useRequest<T>(
  arg: IRequestConfig,
  start?: boolean
): [IResponseConfig<T>];

// 实现
function useRequest<T>(
  init: boolean | IRequestConfig = true,
  start: boolean = true
):
  | [boolean, () => void, React.Dispatch<React.SetStateAction<boolean>>]
  | [IResponseConfig<T>] {
  const [data, setData] = useState<T>({} as T);
  const [loading, setLoading] = useState(
    typeof init === 'boolean' ? init : false
  );
  const [error, setError] = useState();

  let fn: (config?: IRequestConfig) => void = () => {};

  if (typeof init !== 'boolean') {
    fn = async (config = init) => {
      setLoading(true);
      try {
        const url = config['baseUrl']
          ? config['baseUrl'] + config['url']
          : config['url'];

        const res = await axios(url, {
          data: config['data'],
          headers: config['headers'],
          method: config['method'],
          params: config['params'],
        });
        setData(res['data']);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
  }

  useEffect(() => {
    if (typeof init === 'boolean') {
      // 模拟请求
      const tik = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => {
        clearTimeout(tik);
      };
    } else {
      // 简易请求
      if (start) {
        fn();
      }
    }
  }, []);

  const startLoading = () => setLoading(true);

  if (typeof init === 'boolean') {
    return [loading, startLoading, setLoading];
  } else
    return [
      {
        data,
        loading,
        error,
        request: fn,
      },
    ];
}

export default useRequest;
