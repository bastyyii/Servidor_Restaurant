const RestaurantModel = require('./modelRestaurant');
const BranchModel = require('../branches/modelBranches');

exports.createRestaurant = async (req, res) => {
    const {email} = req.body;
    try {
        let restaurant = await RestaurantModel.findOne({email});

        if(restaurant){
            return res.status(400).json({msg: 'El email de restaurant ya esta en uso, cada restaurante debe tener su propio email'});
        }
        restaurant = new RestaurantModel(req.body);
        restaurant.creator = req.user.id;

        await restaurant.save();
        return res.status(200).json({restaurant});
    } catch (error) {
        return res.status(500).json({error,
                                    msg: 'Error en el servidor create restaurant'});
    }
}

exports.getRestaurant = async (req, res) => {

    try {
        const restaurants = await RestaurantModel.find({creator: req.user.id});
        return res.status(200).json({restaurants});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor getrestaurant'});
    }
}

exports.deleteRestaurant = async (req, res) => {
    try {
        let restaurant = await RestaurantModel.findById(req.params.id);
        if(!restaurant){
            return res.status(404).json({msg: 'No se ha encontrado el restaurante'});
        }
        if(restaurant.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No esta autorizado para realizar esta accion'});
        }

        await BranchModel.deleteMany({restaurant: req.params.id});
        await RestaurantModel.findByIdAndRemove({_id: req.params.id});
        
        return res.status(200).json({msg: 'Restaurante eliminado, sucursales eliminadas'});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor, deleteRestaurant'});
    }
}

exports.updateRestaurants = async (req, res) => {
    const { nameRestaurant, numberPhone, city, country} = req.body;
    const updateRestaurant = {};
    if(nameRestaurant){
        updateRestaurant.nameRestaurant = nameRestaurant;
    }
    if(numberPhone){
        updateRestaurant.numberPhone = numberPhone;
    }
    if(city){
        updateRestaurant.city = city;
    }
    if(country){
        updateRestaurant.country = country;
    }

    try {
        let restaurant = await RestaurantModel.findById(req.params.id);
        if(!restaurant){
            return res.status(404).json({msg: 'Restaurante no encontrado'});
        }

        if(restaurant.creator.toString() !== req.user.id){
            return res.status(401).json({msg: 'No esta autorizado para modificar este restaurante'});
        }
        restaurant = await RestaurantModel.findByIdAndUpdate({_id: req.params.id}, {$set: updateRestaurant}, {new: true});
        return res.status(200).json({restaurant});
    } catch (error) {
        return res.status(500).json({error,
                                     msg: 'Error en el servidor updateRestaurant'});
    }
}