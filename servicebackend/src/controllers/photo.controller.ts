import {Request, Response, request} from 'express';
import path from "path";
import fs from "fs-extra";

import Photo from "../models/Photo";

export async function getPhotos(req: Request, res: Response): Promise<Response>{
    const photos = await Photo.find();
    return res.json(photos);

}

export async function getPhoto(req: Request, res: Response): Promise<Response>{
    const photo = await Photo.findById(req.params.id); // con await lo transformo en objeto
    return res.json({photo});
}

export async function createPhoto(req: Request, res: Response): Promise<Response>{

    const {title, description} = req.body;
    //console.log(req.file);
    const newPhoto = {
        title: title,
        description: description,
        imagePath: req.file.path
    };

    //console.log('Saving photo');
    //console.log(req.body);

    const photo = new Photo(newPhoto);
    //console.log(photo);
    await photo.save();
    return res.json({
        message: 'Photo successfully saved',
        photo
    })
};

export async function deletePhoto(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const photo = await Photo.findByIdAndRemove(id);
    if (photo){
        await fs.unlink(path.resolve(photo.imagePath)) // esto toma tiempo
    }
    return res.json({
        message: 'Photo Deleted',
        photo
    })
};

export async function updatePhoto(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {
        title, description
    }, {new: true});
    return res.json({
        message: 'Successfully updated',
        updatedPhoto
    });
}