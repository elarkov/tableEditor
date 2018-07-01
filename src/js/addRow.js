/* eslint-disable one-var */

import render from '../templates/content.hbs';
import { data } from './data';

const headerBlock = document.querySelector('header');
const addRowBtn = document.querySelectorAll('.menu__item')[1];
const addColumnBtn = document.querySelectorAll('.menu__item')[0];
const delRow = document.querySelectorAll('.menu__item')[2];
const delCell = document.querySelectorAll('.menu__item')[3];
const newTableBtn = document.querySelectorAll('.menu__item')[5];

function newTables() {
  const newTabel = document.createElement('table');
  newTabel.className = 'table';
  headerBlock.insertAdjacentElement('afterEnd', newTabel);
}

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
  // let div = document.createElement('div');
  const txt = document.createTextNode(text);
  // div.appendChild(txt);
  // div.setAttribute('class', style);
  // div.setAttribute('className', style);
  cell.appendChild(txt);
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
  const table = document.querySelector('.table'),
    lastRow = table.rows.length - 1;

  for (let i = lastRow; i > 0; i--) {
    table.deleteRow(i);
  }
}

/* === удаляем колонки таблицы === */
function delColumns() {
  const table = document.querySelector('.table'),
    lastCol = table.rows[0].cells.length - 1;

  for (let i = 0; i < table.rows.length; i++) {
    for (let j = lastCol; j > 0; j--) {
      table.rows[i].deleteCell(j);
    }
  }
}

newTableBtn.addEventListener('click', newTables);
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
};
