const router = require('express').Router();
const Gasto = require('../models/gasto.model');

router.route('/').get((req, res) => {
  Gasto.find()
    .then(gastos => res.json(gastos))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = Number(req.body.username);
  const date = Date.parse(req.body.date);

  const newGasto = new Gasto({
    username,
    date,
  });

  newGasto.save()
  .then(() => res.json('Gasto adicionado!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Gasto.findById(req.params.id)
    .then(gasto => res.json(gasto))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Gasto.findByIdAndDelete(req.params.id)
    .then(() => res.json('Gasto deletado.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
  Gasto.findById(req.params.id)
   .then(gasto => {
    gasto.username = Number(req.body.username)
    gasto.date = Date.parse(req.body.date)

    gasto.save()
     .then(() => res.json('Exercise updated!'))
     .catch(err => res.status(400).json('Error: ' + err))
   })
   .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = router;