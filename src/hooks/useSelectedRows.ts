import { useState, useCallback } from 'react';

/**
 * 获取表格选择项
 * @param initState 初始化数据
 */
function useSelectedRows(
  initState: []
): [[], [], (selectedRowKeys: any, selectedRows: any) => void] {
  const [keys, setKeys] = useState(initState);
  const [values, setValues] = useState(initState);

  const getSelectedRows = useCallback((selectedRowKeys, selectedRows) => {
    setKeys(selectedRowKeys);
    setValues(selectedRows);
  }, []);

  return [keys, values, getSelectedRows];
}

export default useSelectedRows;
