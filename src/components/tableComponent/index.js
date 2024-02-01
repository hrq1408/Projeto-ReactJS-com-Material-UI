// TableComponent.js

import React, { useState } from 'react';
import './tableComponent.css';

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newValue, setNewValue] = useState('');

  const currentDate = new Date().toISOString().split('T')[0];

  const handleCreate = () => {
    if (new Date(newDate) < new Date('2024-01-01')) {
      setNotification('Erro: Data inferior a 01/01/2024.');
      setLoading(false);
      return;
    }

    if (!newCategory || !newValue) {
      setNotification('Erro: Categoria e Valor são obrigatórios.');
      setLoading(false);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newData = {
        id: data.length + 1,
        date: newDate,
        category: newCategory,
        value: newValue,
      };

      setData([...data, newData]);
      setNotification('Registro criado com sucesso!');
      setLoading(false);
      setNewDate('');
      setNewCategory('');
      setNewValue('');
    }, 2000);
  };

  const handleDelete = () => {
    setLoading(true);

    setTimeout(() => {
      const updatedData = data.filter((item, index) => index !== selectedRow);
      setData(updatedData);
      setNotification('Registro excluído com sucesso!');
      setLoading(false);
      setSelectedRow(null);
    }, 2000);
  };

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  const handleValueChange = (event) => {
    setNewValue(event.target.value);
  };

  return (
    <div className="table-container">
      <h2>Dashboard</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit
        amet mauris volutpat, vehicula magna a, pulvinar diam. Sed id interdum
        nulla. Integer tempus commodo ligula quis faucibus. In risus quam,
        ullamcorper id ornare vitae, efficitur eget lorem. In blandit lacinia
        orci eu porta. Phasellus efficitur massa sed elit accumsan aliquam.
        Morbi sed risus suscipit, consequat purus eget, sodales ex. Vestibulum
        euismod dignissim leo quis luctus. Fusce pellentesque dapibus sapien,
        sit amet interdum dolor ultrices ac. Curabitur accumsan odio quis
        vulputate porta. Integer pellentesque a purus a vestibulum. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Fusce lobortis felis quam, in ultrices mi rhoncus id. Nunc
        maximus condimentum aliquet. Duis nibh ipsum, tincidunt et eros ut,
        tincidunt interdum nunc.
      </p>
      <p>
        In sodales sem at pretium congue. Ut ante dolor, hendrerit quis porta
        at, dapibus scelerisque lacus. Nulla vulputate eget nibh a vehicula.
        Praesent nisl felis, efficitur eu facilisis et, faucibus nec lorem.
        Integer vel dapibus nunc. Pellentesque gravida auctor viverra. Praesent
        aliquam metus eget ornare vulputate. Mauris elementum porta enim sit
        amet lobortis.
      </p>
      <h2>Table</h2>
      <input
        className="input-field"
        type="text"
        placeholder="Categoria"
        value={newCategory}
        onChange={handleCategoryChange}
      />

      <input
        className="input-field"
        type="number"
        placeholder="Valor"
        value={newValue}
        onChange={handleValueChange}
      />
      <input
        className="input-field"
        type="date"
        value={newDate}
        onChange={handleDateChange}
        min="2024-01-01"
        max={currentDate}
      />

      <button
        className="action-button"
        onClick={handleCreate}
        disabled={loading}
      >
        Adicionar
      </button>

      {loading && <p>Carregando...</p>}

      {notification && (
        <div className="notification">
          <p>{notification}</p>
          <button
            className="close-button"
            onClick={() => setNotification(null)}
          >
            Fechar
          </button>
        </div>
      )}

      <table className="data-table">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.value}</td>
              <td>{item.date}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => setSelectedRow(index)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedRow !== null && (
        <div className="confirmation">
          <p>Tem certeza que deseja excluir?</p>
          <button
            className="confirm-button"
            onClick={handleDelete}
            disabled={loading}
          >
            Sim
          </button>
          <button
            className="cancel-button"
            onClick={() => setSelectedRow(null)}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
