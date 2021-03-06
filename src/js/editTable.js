import render from '../templates/content.hbs';
import { data } from './data';

const headerBlock = document.querySelector('header');
const addRowBtn = document.querySelectorAll('.menu__item')[1];
const addColumnBtn = document.querySelectorAll('.menu__item')[0];
const delRow = document.querySelectorAll('.menu__item')[2];
const delCell = document.querySelectorAll('.menu__item')[3];
const newTableBtn = document.querySelectorAll('.menu__item')[4];

/* === создаем новую таблицу === */
function newTables() {
  const newTabel = document.createElement('table');

  newTabel.className = 'table';

  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');

  const td = document.createElement('td');
  td.innerHTML = render({ items: data });
  newTabel.contentEditable = 'true';

  tr.appendChild(td);
  tbody.appendChild(tr);
  newTabel.appendChild(tbody);
  headerBlock.insertAdjacentElement('afterEnd', newTabel);
}

newTableBtn.addEventListener('click', () => {
  if (document.body.children[1].lastElementChild) {
    document.body.children[1].removeChild(document.body.children[1].lastElementChild);
  }
  newTables();
});

/* === добавляем ряд в таблицу === */
function addRows() {
  let table = document.querySelector('.table'),
    row = table.insertRow(table.rows.length);

  for (let i = 0; i < table.rows[0].cells.length; i++) {
    createCell(row.insertCell(i), render({ items: data }));
  }
}

/* === наполняем ячейки содержимым === */
function createCell(cell, text) {
  const txt = document.createTextNode(text);
  cell.appendChild(txt);
  cell.addEventListener('click', () => {
    cell.style.backgroundColor = getRandomColor();
  });
}

/* === добавляем колонки таблицы === */
function addColumn() {
  const table = document.querySelector('.table');
  for (let i = 0; i < table.rows.length; i++) {
    createCell(table.rows[i].insertCell(table.rows[i].cells.length), render({ items: data }));
  }
}

/* === удаляем ряды у таблицы === */
function delRows() {
  const table = document.querySelector('.table');
  table.children[0].removeChild(table.children[0].lastElementChild);
}

/* === удаляем колонки таблицы === */
function delColumns() {
  const tr = document.querySelectorAll('tr');
  for (let i = 0; i < tr.length; i++) {
    tr[i].removeChild(tr[i].lastElementChild);
  }
}

/* === при клике ячейки меняют свой цвет === */
function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

addRowBtn.addEventListener('click', addRows);
addColumnBtn.addEventListener('click', addColumn);
delRow.addEventListener('click', delRows);
delCell.addEventListener('click', delColumns);

export {
  newTables,
  addRows,
  addColumn,
  delRows,
  delColumns,
  getRandomColor,
};
