import { Product } from '../models';


const getProducts = (req, res) => {
  Product.find()
    .then((docs) => {
      res.json(docs);
    })
    .catch((err) => res.status(500).send(err));
};

const createProduct = (req, res) => {
  let { category, quantity, shipDate } = req.body;
  const newProduct = new Product({
    category: category,
    quantity: quantity,
    shipDate: shipDate,
    status: 'created'
  });

  newProduct
    .save()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

const updateProduct = (req, res) => {
  Product.findById(req.params.id, (err, doc) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!doc) {
      res.status(404).send('data is not found');
    } else {
      doc.category = req.body.category;
      doc.quantity = req.body.quantity;
      doc.shipDate = new Date(req.body.shipDate);
      doc.status = req.body.status;

      doc
        .save()
        .then((newDoc) => {
          res.json(newDoc);
        })
        .catch((err) => res.status(500).send(err));
    }
  });
};

const deleteProduct = (req, res) => {
  Product.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

export { getProducts, createProduct, updateProduct, deleteProduct };
