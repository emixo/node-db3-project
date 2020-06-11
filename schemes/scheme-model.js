const db = require('../data/db-config')

module.exports = {
    find,
    findByID,
    add,
    update,
    remove,
    findSteps,
}

function find() {
    return db('schemes')
}

function findByID(id) {
    return db('schemes').where({id})
}

function add(scheme) {
    return db('schemes')
    .insert(scheme, 'id')
    .then(e => ({id: e[0]}))
}

function update(changes, id) {
    return db('schemes')
    .where('id', Number(id))
    .update(changes)
}

function remove(id) {
    return db('schemes')
    .where('id', Number(id))
    .del()
}

function findSteps(id) {
    return db('steps')
    .join('schemes', 'schemes.id', 'steps.scheme_id')
    .where('steps.scheme_id', id)
    .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
    .orderBy('steps.step_number')
}