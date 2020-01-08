import {Schema, model, Document} from 'mongoose';

const schema = new Schema({
    title: String,
    description: String,
    imagePath: String
});

// Hereda entre comillas el formato o estructura
export interface IPhoto extends Document{
    title: string;
    description: string;
    imagePath: string;
}

export default model<IPhoto>('Photo',schema);