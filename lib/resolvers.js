// Comenzamos traendo el modelo de datos
const Products = require("../models/products")
const Users = require("../models/users")
const Sales = require("../models/sales")
const jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// Exportamos las funciones que resolverá las peticiones
module.exports = {
    // Esta función es para los querys
    products: async() => {
        try {
            // creamos una constante que mediante find me trae todo el arreglo de registros
            const productsFetched = await Products.find()
    
                // Hacemos un map al arreglo y creamos otro arreglo pero con los datos que queremos mostrar
            return productsFetched.map(product => {
                console.log(product);
                return {
                    title:product.title,
                    description: product.description,
                    price: product.price,
                    image: product.image,
                    _id: product.id,
                    createdAt: new Date(product._doc.createdAt).toISOString(),
                }

            })
        } catch (error) {
            throw error
        }
    },
    searchCliente: async() => {
        try {
            
            const usersFetched = await Users.find();
            return usersFetched.map(user => {
                const  token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        username: user.username
                    },
                    "UNSAFE_STRING",
                    {
                        expiresIn:"2h"
                    }
                );
                    return {
                        _id: user._id,
                        email: user.email,
                        token,
                        username:user.username,
                        cuenta:user.cuenta
                    }
            }) 
        } catch (error) {
            throw error
        }

    }
    ,

    // Esta otra función es para el mutation
    createProduct: async args => {
        try {
            // Creamos un objeto a partir de los args que son los que mandamos
            console.log(args.product);
            const { title, description, price, image } = args.product
                // Creamos el objeto article con el objeto anterior
            const product = new Products({
                    title,
                    description,
                    price,
                    image
                })
                // Hacemos un await guardando el articulo creado con save
            const newProduct = await product.save()
                // Retornamos un objeto con el resultado del await y el id
            return {...newProduct._doc, _id: newProduct.id }
        } catch (error) {
            throw error
        }
    },

    deleteProduct: async (id) => {
        try {
          const deletedPrduct = await Products.findByIdAndDelete(id);
          return  `Product deleted Successfully!!!`
        } catch (error) {
          throw error
        }
      },

    updateProduct: async args =>{
        try{
            const {_id, price} = args
            const updatedProduct = await Products.findByIdAndUpdate(_id, {price: price});
            return `Product ${updatedProduct.title} updated Successfully!!!`
        } catch (error){
            throw error
        }
    },
    
    users: async() => {
        try {
            // creamos una constante que mediante find me trae todo el arreglo de registros
            const usersFetched = await Users.find()
    
                // Hacemos un map al arreglo y creamos otro arreglo pero con los datos que queremos mostrar
            return usersFetched.map(user => {
                console.log(user);
                const  token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        username: user.username
                    },
                    "UNSAFE_STRING",
                    {
                        expiresIn:"2h"
                    }
                );
                return {
                    _id: user.id,
                    email: user.email,
                    token,
                    username: user.username,
                    cuenta: user.cuenta
                }

            })
        } catch (error) {
            throw error
        }
    },
    login: async args => {
        try {
            const { email, password} = args
            console.log(args);
            const user = await Users.findOne({email});

            if(user&&(await bcrypt.compare(password,user.password))){
                //create a new token 
                const  token = jwt.sign(
                    {
                        id: user._id,
                        email: user.email,
                        username: user.username
                    },
                    "UNSAFE_STRING",
                    {
                        expiresIn:"2h"
                    }
                );
                    return {              
                        _id: user.id,
                        email: user.email,
                        token,
                        username: user.username,
                        createdAt: new Date(user._doc.createdAt).toISOString(),
                        cuenta: user.cuenta
                    }
            }
        } catch (error) {
            throw error
        }

      },

      createUser: async args => {
        const { username,email, password,confirmPassword,cuenta } = args.user

        try {
            // Creamos un objeto a partir de los args que son los que mandamos
            console.log(args.user);
            //validando campos ingresados
            const oldUser = await Users.findOne({email});
            if(oldUser){
                throw ("El correo electronico ya existe")  
            }
            if(password != confirmPassword){
                throw ("Las contraseñas no coinciden")
            }
            //revisar usuario y correo existentes
                // Creamos el objeto article con el objeto anterior
                var encryptedPassword = await bcrypt.hash(password,10);


                const user = new Users({
                    username,
                    email,
                    password:encryptedPassword,
                })
                if(cuenta == null){
                    const cuentaTemp = "cliente";
                    user.cuenta = cuentaTemp;
                }else{
                    user.cuenta = cuenta;
                }
                // Hacemos un await guardando el articulo creado con save
                const newUser = await user.save()
                // Retornamos un objeto con el resultado del await y el id
                const  token = jwt.sign(
                    {
                        id: newUser._id,
                        email: newUser.email,
                        username: newUser.username
                    },
                    "UNSAFE_STRING",
                    {
                        expiresIn:"2h"
                    }
                );
                console.log(token);  
            return {...newUser._doc, _id: newUser.id,token }
        } catch (error) {
            throw error 
        }
    },


      sales: async() => {
        try {
            // creamos una constante que mediante find me trae todo el arreglo de registros
            const salesFetched = await Sales.find()
    
                // Hacemos un map al arreglo y creamos otro arreglo pero con los datos que queremos mostrar
            return salesFetched.map(sale => {
                console.log(sale);
                return {
                    numSale: sale.numSale,
                    description: sale.description,
                    note: sale.note,
                    total: sale.total,
                    state: sale.state,
                    _id: sale.id,
                    createdAt: new Date(sale._doc.createdAt).toISOString(),
                }

            })
        } catch (error) {
            throw error
        }
    },

    createSale: async args => {
        try {
            // Creamos un objeto a partir de los args que son los que mandamos
            console.log(args.sale);
            const { numSale, description, note, total, state} = args.sale
                // Creamos el objeto article con el objeto anterior
            const sale = new Sales({
                    numSale,
                    description,
                    note,
                    total,
                    state
                })
                // Hacemos un await guardando el articulo creado con save
            const newSale = await sale.save()
                // Retornamos un objeto con el resultado del await y el id
            return {...newSale._doc, _id: newSale.id }
        } catch (error) {
            throw error
        }
    },

    deleteSale: async (id) => {
        try {
          const deletedSale = await Sales.findByIdAndDelete(id);
          return  `Sale deleted Successfully!!!`
        } catch (error) {
          throw error
        }
      },

      updateSale: async args =>{
        try{
            const {_id, state} = args
            const updatedSale = await Sales.findByIdAndUpdate(_id, {state: state});
            return `Sale ${updatedSale._id} updated Successfully!!!`
        } catch (error){
            throw error
        }
    }
    
}




