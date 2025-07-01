// Cuida do usuario

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

// Define in Schema pro usuario
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// --- Cuida da segurança da senha ---
// Salva a senha como hash
userSchema.pre('save', async function(next) {
    // Só converte a senha para hash se ela é nova ou é modificada
    if (!this.isModified('password')) return next();

    try {
        // Gera o salt e o hash da senha
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// --- Metodo de comparação das senhas ---
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Cria e exporta o schema do usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
