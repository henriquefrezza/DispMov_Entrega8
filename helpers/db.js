import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("contatos.db");

export const init = () => {

  const promise = new Promise ((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tb_contato (id INTEGER PRIMARY KEY, nome TEXT NOT NULL, numero TEXT NOT NULL, imagemURI TEXT NOT NULL, latitude TEXT NOT NULL, longitude TEXT NOT NULL, horario NUMBER NOT NULL)',
        [],
        () => {resolve()},
        (_, err ) => {reject(err)}
      );
    });
  });
  return promise;
}

export const inserirContato = (nome, numero, imagemURI, latitude, longitude, horario) => {
  const promise = new Promise ((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tb_contato (nome, numero, imagemURI, latitude, longitude, horario) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, numero, imagemURI, latitude, longitude, horario],
        (_, resultado) => {resolve(resultado)},
        (_, err) => {reject (err)}
      );
    })
  });
  return promise;
}

export const buscarContatos = () => {
  const promise = new Promise ((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM tb_contato',
        [],
        (_, resultado) => {resolve(resultado)},
        (_, err) => {reject (err)}
      );
    })
  });
  return promise;
}

init().then(() => {}).catch(() => {})
 