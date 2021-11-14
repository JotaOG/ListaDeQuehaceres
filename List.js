import React, { useState } from 'react';

export const List = () => {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  const onSubmitHandle = (e) => {
    e.preventDefault();

    if(value === '') return;

    setList([...list, {
      text: value,
      completed: false
    }]);

    setValue('');
  }

  const deleter = (index) => {
    setList(list.filter((_item, i) => i !== index));
  }

  const checked = (index) => {
    const obj = {
      ...list[index]
    };

    obj.completed = !obj.completed;

    setList([
      ...list.slice(0, index),
      obj
    ].concat(list.slice(index + 1)));
  }

  return (
    <div>
      <br/>
      {list.map((item, i) => (
        <div key={i}>
          <span style={{ textDecoration: item.completed && 'line-through' }}>{item.text}</span>
          <input
            className='checkbox'
            type="checkbox"
            checked={item.completed}
            onClick={() => checked(i)}
            readOnly
          />
          <button className='btn-deleter' onClick={() => deleter(i)}>Delete</button>
        </div>
      ))}
      <br/>
      <form onSubmit={onSubmitHandle}>
        <input
          className='input-text'
          onChange={e => setValue(e.target.value)}
          value={value}
        /><br/>
        <button className='btn-add'>Add</button>
      </form>
    </div>
  );
};
