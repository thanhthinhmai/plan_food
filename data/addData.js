let pgp = require('pg-promise')();
let db = pgp('postgres://postgres:123@localhost:5433/food');
let data = require('./data.json');

for (let item in data) {
    db.any('insert into images(name, id_product) values (${image}, ${id})', data[item])
        .then(() => {
            console.log('import success');
        })
        .catch(error => {
            console.log('error', error);
        })
}
// for (let item in data) {
//     db.any('insert into products(id_type, address, name, octime, rate, id_product,price) values (${id_type}, ${address}, ${name}, ${octime}, ${rate}, ${id}, ${price})', data[item])
//         .then(() => {
//             console.log('import success');
//         })
//         .catch(error => {
//             console.log('error', error);
//         })
// }