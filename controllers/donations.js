// clients.js

const Donation = require('../models/donation')
const Client = require('../models/client')

module.exports = function (app) {

  // CREATE Donation
  app.post('/clients/donations', (req, res) => {
    Donation.create(req.body).then(donation => {
      res.redirect(`/clients/${donation.clientId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  // DELETE
  app.delete('/clients/donations/:id', function (req, res) {
    console.log("DELETE donation")
    Donation.findByIdAndRemove(req.params.id).then((donation) => {
      res.redirect(`/clients/${donation.clientId}`);
    }).catch((err) => {
      console.log(err.message);
    })
  })
}
