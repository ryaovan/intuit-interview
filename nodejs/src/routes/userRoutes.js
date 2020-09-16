import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    console.log(`'/user: get request ${JSON.stringify(req.query)}`);

    try {
      let results;
      if (req.query.all) results = await userController.getAll();
      else results = await userController.get(req.query);

      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(400).send('bad request');
    }
  })
  .put(async (req, res) => {
    console.log(`/user: post request ${JSON.stringify(req.body)}`);

    try {
      await userController.put(req.body);
      res.end();
    } catch (err) {
      console.error(err);
      res.status(400).send('bad request');
    }
  })
  .post(async (req, res) => {
    console.log(`/user: post request ${JSON.stringify(req.body)}`);

    try {
      const newID = await userController.create(req.body);
      res.json({ id: newID });
    } catch (err) {
      console.error(err);
      res.status(400).send('bad request');
    }
  })
  .delete(async (req, res) => {
    console.info(`/user: delete request ${JSON.stringify(req.body)}`);

    try {
      await userController.delete();
    } catch (err) {
      console.error(err);
      res.status(400).send('bad request');
    }
  });

export default router;
