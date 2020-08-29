import { useState } from 'react';

export interface IInfoWrapperOptions<T> {
  visible: boolean;
  info: T | null;
}

export interface IRes<T> {
  show: boolean;
  open: (_: T) => void;
  close: () => void;
  change: () => void;
  wrapperInfo: T | null;
  modifyInfoItem: (arg0: any, arg1: string) => void;
  setWrapperInfo: React.Dispatch<React.SetStateAction<T | null>>;
}

/**
 * 控制容器(Modal/Drawer/..)开关，并传入数据
 * @param initState 初始化数据
 */
function useInfoWrapper<T>(initState: IInfoWrapperOptions<T>): IRes<T> {
  const { visible, info } = initState;

  const [show, setShow] = useState(visible);
  const [wrapperInfo, setWrapperInfo] = useState(info);
  
  /**
   * 打开容器并传入数据
   * @param newInfo 传入数据
   */
  const open = (newInfo: T) => {
    setWrapperInfo(newInfo);
    setShow(true);
  };
  /**
   * 关闭容器
   */
  const close = () => setShow(false);
  /**
   * 改变容器状态
   */
  const change = () => setShow((visible) => !visible);

  /**
   * 修改传入的数据中的某个属性
   * @param val 修改后的值
   * @param label 要修改属性名称
   */
  const modifyInfoItem = (val: any, label: string) => {
    setWrapperInfo((wrapperInfo) => ({ ...wrapperInfo, [label]: val } as T));
  };

  return {
    show,
    open,
    close,
    change,
    wrapperInfo,
    modifyInfoItem,
    setWrapperInfo,
  };
}

export default useInfoWrapper;
