import express from 'express'
import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js';
import cors from "cors"

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

// Código apenas necessário para usuários do windows
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos carregados
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Indica que o arquivo será salvo na pasta 'uploads'
    },
    // Define o nome do arquivo
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Mantém o nome original do arquivo
    }
})

// Configura o middleware Multer para upload de arquivos, usando o storage definido acima
const upload = multer({ dest: "./uploads", storage})

const routes = (app) => {
    // Habilita o parser JSON para lidar com requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions));
    // Define uma rota GET para buscar todos os posts
    app.get("/posts", listarPosts);
    // Define uma rota POST para criar um novo post
    app.post("/posts", postarNovoPost);
    // Define uma rota POST para fazer upload de uma imagem
    app.post("/upload", upload.single("Imagem"), uploadImagem); // Utiliza o middleware 'upload.single("Imagem")' para processar o arquivo

    app.put("/upload/:id", atualizarNovoPost)
};

export default routes;