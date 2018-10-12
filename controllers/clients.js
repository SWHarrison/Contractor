//rclients.js

const Client = require('../models/client')
const Donation = require('../models/donation')

module.exports = function (app) {

  app.get('/', (req, res) => {
    Client.find()
      .then(clients => {
        res.render('clients-index', {clients: clients});
      })
      .catch(err => {
        console.log(err);
      });
  });

  // NEW
  app.get('/clients/new', (req, res) => {
    res.render('clients-new', {});
  })

//SHOW
  app.get('/clients/:id', (req, res) => {
    // find client
    Client.findById(req.params.id).then(client => {
      // fetch its donations
      Donation.find({ clientId: req.params.id }).then(donations => {
        // respond with the template with both values
        res.render('clients-show', { client: client, donations: donations })
      }).catch((err) => {
        // catch errors
        console.log(err.message)
      });
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
});

  // CREATE
  app.post('/clients', (req, res) => {
    Client.create(req.body).then((client) => {
      console.log(client)
      res.redirect(`/clients/${client._id}`) // Redirect to clients/:id
    }).catch((err) => {
      console.log(err.message)
    })
  })

  // UPDATE
  app.put('/clients/:id', (req, res) => {
    Client.findByIdAndUpdate(req.params.id, req.body)
      .then(client => {
        res.redirect(`/clients/${client._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // EDIT
  app.get('/clients/:id/edit', function (req, res) {
      console.log('This is the request body' + req.body)
    Client.findById(req.params.id, function(err, client) {
      res.render('clients-edit', {client: client});
    })
  })

  // DELETE
  app.delete('/clients/:id', function (req, res) {
    console.log("DELETE client")
    Client.findByIdAndRemove(req.params.id).then((client) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })

}
