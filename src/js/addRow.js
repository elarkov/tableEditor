/* eslint-disable one-var */

import render from '../templates/content.hbs';
import { data } from './data';

const headerBlock = document.querySelector('header');
const addRowBtn = document.querySelectorAll('.menu__item')[1];
const addColumnBtn = document.querySelectorAll('.menu__item')[0];
const delRow = document.querySelectorAll('.menu__item')[2];
const delCell = document.querySelectorAll('.menu__item')[3];
const newTableBtn = document.querySelectorAll('.menu__item')[5];


function newTables(){

  var newTabel = document.createElement('table');

  newTabel.className = 'table';

  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');

  const td = document.createElement('td');
  td.innerHTML = render({items: data});

  tr.appendChild(td);
  tbody.appendChild(tr);
  newTabel.appendChild(tbody);
  headerBlock.insertAdjacentElement('afterEnd', newTabel);
}


newTableBtn.addEventListener('click', function () {

  newTables();
  if(document.body.children[1].lastElementChild){
    document.body.children[1].removeChild(document.body.children[1].lastElementChild);
  };
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
