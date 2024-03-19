import React, { useState } from 'react';
import { DataGrid, useGridApiRef, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
interface Product {
  id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  note?: string;
}

const initialInventory: Product[] = [
  { id: 1, product_name: 'Item 1', quantity: 10, unit_price: 5000, note: '' },
  { id: 2, product_name: 'Item 2', quantity: 20, unit_price: 10000, note: 'Sale' },
];

const Inventory: React.FC = () => {
  const disableVirtualization = process.env.REACT_APP_DISABLE_VIRTUALIZATION === 'true';

  const [inventory, setInventory] = useState<Product[]>(initialInventory);
  const gridApiRef = useGridApiRef()

  const processRowUpdate = (newRow: Product) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) => (item.id === newRow.id ? newRow : item))
    );

    return newRow;
  };

  const handleAddRow = () => {
    const id = inventory.length > 0 ? Math.max(...inventory.map((item) => item.id)) + 1 : 0;
    const newRow: Product = { id, product_name: '', quantity: 0, unit_price: 0, note: '' };
    setInventory((prevInventory) => [...prevInventory, newRow]);

    // 포커스를 새 행에 맞추기 위해 다음 이벤트 루프까지 기다린 다음 실행
    setTimeout(() => {
      gridApiRef.current?.setCellFocus(id, 'product_name');
    });
  };

  const deleteProduct = React.useCallback(
    (id: number) => () => {
      setInventory((prevInventory) => prevInventory.filter((item) => item.id !== id));
    },
    []
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'product_name', headerName: '상품명', width: 150,editable: true,type: 'string' },
    { field: 'quantity', headerName: '수량', width: 150 ,editable: true,type: 'number'},
    { field: 'unit_price', headerName: '개당 가격', width: 150 ,editable: true,type: 'number'},
    { field: 'note', headerName: '메모', width: 150 ,editable: true},
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      width: 80,
      getActions: (params: { id: number; }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={deleteProduct(params.id)}
        />,
      ],
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }} data-testid="inventory">
      <Button onClick={handleAddRow} color="primary" variant="contained" style={{ marginBottom: 16 }}>
        레코드 추가
      </Button>
      <DataGrid
        rows={inventory}
        columns={columns}
        apiRef={gridApiRef}
        processRowUpdate={processRowUpdate}
        disableVirtualization={disableVirtualization}
      />
    </div>
  );
};

export default Inventory;
