const responsableModel = require("./models/responsable");
const tascaModel = require("./models/tasques");
const { response } = require('express');

module.exports = (app) => {

    app.get('/api/responsable', async (req, res) => {

        const responsable = await responsableModel.find({});

        try {
            res.status(200).send(responsable);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    app.get('/api/idmax', async (req, res) => {

        const responsable = await responsableModel.find().select("id").sort({ id: -1 }).limit(1);

        try {
            res.status(200).send(responsable);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.post('/api/responsable', async (req, res) => {
        const responsable = new responsableModel(req.body);

        try {
            await responsable.save();
            const respon = await responsableModel.find({});
            res.status(200).send(respon);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.delete('/api/responsable/:id', async (req, res) => {

        const responsable = await responsableModel.deleteOne({ id: req.params.id });
        try {
            const resp = await responsableModel.find({});   // Demano la colecció actualitzada per retornar-la.
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    //Rutes de les tasques:


    app.get('/api/tasca', async (req, res) => {

        const tasca = await tascaModel.find({});

        try {
            res.status(200).send(tasca);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    app.get('/api/idmaxtasca', async (req, res) => {

        const tasca = await tascaModel.find().select("_codi").sort({ _codi: -1 }).limit(1);

        try {
            res.status(200).send(tasca);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    app.post('/api/tasca', async (req, res) => {
        const tasca = new tascaModel(req.body);

        try {
            await tasca.save();
            const respon = await tascaModel.find({});
            res.status(200).send(respon);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    app.delete('/api/tasca/:_codi', async (req, res) => {

        const tasca = await tascaModel.deleteOne({ _codi: req.params._codi });
        try {
            const tasc = await tascaModel.find({});   // Demano la colecció actualitzada per retornar-la.
            res.status(200).send(tasc);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    app.put('/api/tasca/:_codi', async (req, res) => {
        try {
            const {_codi} = req.params;
            await tascaModel.updateOne({ _codi },req.body)
            const tasc = await tascaModel.find({});   
            res.status(200).send(tasc);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    
    app.get('/api/tascar/:codi', async (req, res) => {
        const {codi} =parseInt(req.params) ;
        const tasca = await tascaModel.findOne({_codi: codi})

        try {
            res.status(200).send(tasca);
        } catch (error) {
            res.status(500).send(error);
        }
    });
    
}










