import { ready } from 'https://lsong.org/scripts/dom.js';
import { h, render, useState, useEffect } from 'https://lsong.org/scripts/react/index.js';

import "https://lsong.org/js/application.js";

const loadData = async () => {
  const response = await fetch(`https://amiiboapi.com/api/amiibo/`);
  const data = await response.json();
  return data.amiibo;
};

const App = () => {
  const [amiibos, setAmiibos] = useState([]);
  useEffect(() => {
    console.log('App is ready');
    loadData().then(setAmiibos);
  }, []);
  return [
    h('h2', null, "Amiibo"),
    h('ul', { className: `list` }, [
      amiibos.map(amiibo => h('li', { className: `list-item amiibo` }, [
        h('img', { className: 'amiibo-image', src: amiibo.image }),
        h('span', { className: `amiibo-name` }, amiibo.name),
      ]))
    ])
  ]
}

ready(() => {
  const app = document.getElementById('app');
  render(h(App), app);
});