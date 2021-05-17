import './sass/main.scss'

import { fetchCountries } from './js/fetchCountries';
import moviesHelpListTpl from './templates/countries-list.hbs';
import moviesCountyListTpl from './templates/country-markup.hbs';

import { info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import * as Confirm from '@pnotify/confirm';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

const refs = {
  input: document.querySelector('#input'),
  createMarcup: document.querySelector('.country_container'),
  countriesList: document.querySelector('.countries'),
};
const debounce = require('lodash/debounce');

refs.input.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  fetchCountries(e.target.value)
    .then(markupContent)
    .catch(error => console.log(error));
}

function markupContent(countries) {
  if (countries.length > 10) {
    click();
  }
  markupHelpList(countries);
  markupCountryTpl(countries);
}

function markupHelpList(countries) {
  refs.countriesList.textContent = '';

  const markupHelpItems = moviesHelpListTpl(countries);
  if (countries.length > 10 || countries.length < 2) {
    return;
  }
  refs.countriesList.insertAdjacentHTML('beforeend', markupHelpItems);
}

function markupCountryTpl(countries) {
  refs.createMarcup.textContent = '';
  const markupCountryItem = moviesCountyListTpl(countries);
  if (countries.length !== 1) {
    return;
  }
  refs.createMarcup.insertAdjacentHTML('beforeend', markupCountryItem);
}

function click() {
  info({
    text: 'Too many matches found. Please enter a more specific query!',
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: 'Ok',
              primary: true,
              click: notice => {
                notice.close();
              },
            },
          ],
        },
      ],
    ]),
  });
}