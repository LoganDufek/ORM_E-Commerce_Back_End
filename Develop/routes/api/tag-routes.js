const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll( {
     include: [
    {
      model: Product,
      attributes: ['id', 'product_name','price', 'stock'],
       through: ProductTag,
        as: 'tagged_product'

   }]
  }).then(result => res.json(result))
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
  include: [
    {
      model: Product,
      attributes: ['id', 'product_name','price', 'stock'],
      through: ProductTag,
        as: 'tagged_product'
    }
  ]
  })
  .then(result => {
      if (!result) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then(newTag => res.json(newTag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
.then(updatedTag => res.json(updatedTag))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

   Tag.destroy({
        where: {
      id: req.params.id
    }
  }).then(destroyedTag => {
      if (!destroyedTag) {
        res.status(404).json({ message: 'No product found with this id' });
        return;
      }
      res.json(destroyedTag);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
