const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const serveStatic = require('serve-static');
const path = require('path');
const userData = require('./data/users.json');
const orgData = require('./data/oraganization.json');
const tickets = require('./data/tickets.json');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

app.use(allowCrossDomain);

process.env.TZ = 'UTC';

router.get('/fetchUsers', (req, res) => {
  const getData = async () => {
    try {
      const json = await userData;

      res.status(200).send({ json });
    } catch (error) {
      // console.dir(error);
      res.status(500).send('Error on the server.');
    }
  };

  getData();
});

router.post('/fetchOrg', (req, res) => {
  const getData = async () => {
    try {
      const orgId = req.body?.orgId;
      const json = await orgData;

      // eslint-disable-next-line no-underscore-dangle
      const organization = json.filter((val) => orgId === val._id);

      const OrgDetails = organization[0];

      res.status(200).send({ OrgDetails });
    } catch (error) {
      // console.dir(error);
      res.status(500).send('Error on the server.');
    }
  };

  getData();
});

router.post('/fetchTickets', (req, res) => {
  const getData = async () => {
    try {
      const userId = req.body?.userId;
      const json = await tickets;

      const createdTickets = json.filter((val) => userId === val.submitter_id);
      const assignedTickets = json.filter((val) => userId === val.assignee_id);

      res.status(200).send({ createdTickets, assignedTickets });
    } catch (error) {
      // console.dir(error);
      res.status(500).send('Error on the server.');
    }
  };

  getData();
});

app.use(router);
app.use(serveStatic(path.join(__dirname, '../../dist')));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  // console.log('Express server listening on port ', port);
});
