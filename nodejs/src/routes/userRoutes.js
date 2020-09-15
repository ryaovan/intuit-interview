import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    console.log(`'/user: get request ${JSON.stringify(req.query)}`);

    try {
      const results = await userController.getUser(req.query);
      res.json(results);
    } catch (err) {
      res.status(400).send('bad request');
    }
  })
  .put(async (req, res) => {
    console.log(`/user: post request ${JSON.stringify(req.body)}`);

    try {
      await userController.put(req.body);
      res.end();
    } catch (err) {
      res.status(400).send('bad request');
    }
  })
  .post(async (req, res) => {
    console.log(`/user: post request ${JSON.stringify(req.body)}`);

    try {
      await userController.create(req.body);
      res.end();
    } catch (err) {
      res.status(400).send('bad request');
    }
  })
  .delete(async (req, res) => {
    console.info(`/user: delete request ${JSON.stringify(req.body)}`);

    try {
      await userController.delete();
    } catch (err) {
      res.status(400).send('bad request');
    }

    res.end();
  });
