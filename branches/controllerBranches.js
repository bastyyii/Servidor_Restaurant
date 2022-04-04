const ModelRestaurant = require('../restaurant/modelRestaurant');
const ModelBranch = require('./modelBranches');

exports.createBranch = async (req, res) => {
    const { restaurant } = req.body;
    try {
        if(!restaurant){
            return res.status(422).json({msg: 'Debe elegir un restaurant'});
        }
        let checkRestaurant = await ModelRestaurant.findOne({_id: restaurant});

        if(!checkRestaurant){
            return res.status(400).json({msg: 'El restaurant no existe'});
        }

        if(checkRestaurant.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No esta autorizado para agregar sucursales a este restaurante'});
        }
        const branch = new ModelBranch(req.body);
        await branch.save();

        const countAllBranch = await ModelBranch.count({restaurant : checkRestaurant._id});

        checkRestaurant.branch = countAllBranch;
        await checkRestaurant.save();

        return res.status(200).json({branch});
        
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor createBranch'});
    }
}

exports.getBranches = async (req, res) => {
    const { restaurant } = req.params;
    try {
        const checkRestaurant = await ModelRestaurant.findById(restaurant);
        if(!checkRestaurant){
            return res.status(404).json({msg: 'Restaurante no encontrado'});
        }
        if(checkRestaurant.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No esta autorizado para ver estas sucursales'});
        }
        const branch = await ModelBranch.find({restaurant});

        return res.status(200).json({branch});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor getBranch'});
    }
}

exports.deleteBranch = async (req, res) => {
    try {
        let checkBranch = await ModelBranch.findById(req.params.id);
        if(!checkBranch){
            return res.status(404).json({msg: 'Sucursal no encontrada'});
        }
        const checkRestaurant = await ModelRestaurant.findById(req.params.restaurant);
        if(!checkRestaurant){
            return res.status(404).json({msg: 'Restaurante no encontrado'});
        }
        if(checkRestaurant.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No esta autorizado para eliminar esta sucursal'});
        }
        await ModelBranch.findByIdAndRemove({_id: req.params.id});
        
        let countAllBranch = checkRestaurant.branch;
        countAllBranch = countAllBranch - 1;
        checkRestaurant.branch = countAllBranch;
        
        await checkRestaurant.save();
        return res.status(200).json({msg: 'Sucursal eliminada'});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor deleteBranch'});
    }
}

exports.updateBranc = async (req, res) => {
    const { restaurant, nameBranch, numberPhone, direction} = req.body;
    const updateBranch = {};
    if(nameBranch){
        updateBranch.nameBranch = nameBranch;
    }
    if(numberPhone){
        updateBranch.numberPhone = numberPhone;
    }
    if(direction){
        updateBranch.direction = direction;
    }
    try {
        
        let branch = await ModelBranch.findById(req.params.id);
        
        if(!branch){
            return res.status(404).json({msg: 'Sucursal no encontrada'});
        }
        const checkRestaurant = await ModelRestaurant.findById(restaurant);
        if(checkRestaurant.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No esta autorizado para actualizar esta sucursal'});
        } 
        if(branch.restaurant.toString() !== restaurant){
            return res.status(401).json({msg: 'La sucursal no pertenece a este restaurante'});
        }
        branch = await ModelBranch.findByIdAndUpdate({_id: req.params.id}, {$set: updateBranch}, {new: true}); 
        
        return res.status(200).json({branch});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor updateBranch'});
    }
}